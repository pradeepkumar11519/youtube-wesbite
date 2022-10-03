import random
from re import M
from xml.etree.ElementTree import Comment
from django.shortcuts import render
from rest_framework.generics import *
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
import datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .helpers import *
from .models import *
from rest_framework.filters import SearchFilter,OrderingFilter
from django.http import JsonResponse
# Create your views here.
import razorpay
from backend import settings
razorpay_client = razorpay.Client(auth =(settings.API_KEY,settings.API_SECRET))
class Signup(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Login(APIView):
    def post(self,request):
        username = request.data['username']
        password = request.data['password']
        email = request.data['email']

        # checking for errors
        user = User.objects.filter(username=username).first()
        
        print(user)
        if user is None:
                    return Response({'error': 'invalid username or password'}, status=status.HTTP_404_NOT_FOUND)
        if not user.check_password(password):
                    return Response({'error': 'invalid username or password'},status=status.HTTP_404_NOT_FOUND)
        else:
            if email == user.email:
                    refresh = RefreshToken.for_user(user)
                    user.last_login = datetime.datetime.now()
                    user.save()
                    choice1 = ['orange','pink','yellow','red','black','rose']
                    color = random.choice(choice1)
                    print(color)
                    return Response({
                        'message': 'login successfull',
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                        'username':user.username,
                        'last_login_date':getdate(),
                        'last_login_time':gettime(),
                        'email':user.email,'color':color},
                        status=status.HTTP_200_OK)
                    
                    
            else:
                return Response({'errors':'email not matched'},status=status.HTTP_404_NOT_FOUND)

class ListAddProduct(ListCreateAPIView):
    filter_backends = [SearchFilter,OrderingFilter]
    ordering_fields = ['price']
    search_fields = ['title']
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class RetrieveUpdateDestroyProduct(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    
    serializer_class = ProductSerializer

class CustomFilter(APIView):
    def get(self,request):
        queryset = Product.objects.all()
        params = self.request.query_params.get('category',None)
        if Product.objects.filter(category=params).exists():
            if params !='ALL':
                queryset = queryset.filter(category=params)
        serializer = ProductSerializer(queryset,many=True)
        
        print(params)
        return Response(serializer.data)

class GetAllElementsFromKart(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user = request.user
        queryset = KartElement.objects.filter(user = user).values('total_price')
        Total_User_Price = 0
        for i in queryset:
            Total_User_Price = Total_User_Price + i['total_price']
        
        serializer = KartSerializer(KartElement.objects.filter(user = user),many=True)
        return Response({'Users_Cart':serializer.data,'Users_Total_Amount':Total_User_Price})


    
class AddElementToKart(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        quantity=request.data.get('quantity')
        product = request.data.get('product')
        
        
        serializer = KartSerializer(data = request.data)
        if(serializer.is_valid()):
            if user.username == request.data.get('user'):
                preset_product = KartElement.objects.filter(user = user).filter(product=request.data.get('product'))
                
                if preset_product.exists() and preset_product.filter(color = request.data.get('color')).exists() and preset_product.filter(size = request.data.get('size')).exists() and preset_product.filter(color = request.data.get('color')).filter(size = request.data.get('size')).exists() : 
                        user_product = KartElement.objects.filter(user = user).filter(product = request.data.get('product')).filter(color = request.data.get('color')).get(size = request.data.get('size'))
                        product_price = Product.objects.get(id = product).price
                        New_Quantity = user_product.quantity + request.data.get('quantity')
                        New_Total_Price = (product_price) * (New_Quantity)
                        user_product.__dict__.update(quantity = New_Quantity,total_price = New_Total_Price)
                        user_product.save()
                        
                        return Response('old cart element quantity increased')
                        
                else:
                    
                    serializer.save()
                    
                    return Response('new product added to kart')
            else:
                return Response('UnAuthorized',status = status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)
        
class DeleteKartElement(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        quantity=request.data.get('quantity')
        product = request.data.get('product')
        
        
        serializer = KartSerializer(data = request.data)
        if(serializer.is_valid()):
            if user.username == request.data.get('user'):
                user_product = KartElement.objects.filter(user = user).filter(product = request.data.get('product')).filter(color = request.data.get('color')).get(size = request.data.get('size'))
                quantity = quantity - 1
                product_price = Product.objects.get(id = product).price
                New_Quantity = user_product.quantity - 1
                if New_Quantity<1:
                    KartElement.objects.filter(user = user).filter(product = request.data.get('product')).filter(color = request.data.get('color')).filter(size = request.data.get('size')).delete()
                else: 
                    New_Total_Price = (product_price) * (New_Quantity)
                    user_product.__dict__.update(quantity = New_Quantity,total_price = New_Total_Price)
                    user_product.save()
                        
                return Response('old element quantity decreased')
            else:
                return Response('UnAuthorized',status = status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)

class PlaceOrderThroughCart(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        data = request.data
        user = request.user
        order_currency = "INR"
        notes = {'order-type':'BASIC ORDER FROMW EBSIOTE'}
        total_users_amount = int(request.data.get('total_ordered_price')) * 100
        amount_with_gst = total_users_amount + total_users_amount*0.0236 + 150*100
        razorpay_order = razorpay_client.order.create(dict(
                amount = amount_with_gst,
                currency = order_currency,
                notes=notes,
                receipt = (str(user) + str(user.email)),
                payment_capture="0"
        ))
        
        
        return Response({
            'final_amount_with_gst' : str(amount_with_gst),
            'order_id':razorpay_order['id'],
            
            'razorpay_merchant_id' : settings.API_KEY,
        })
        


class handelrequest(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        data = request.data
        payment_id = request.data.get('razorpay_payment_id')
        order_id = request.data.get('razorpay_order_id')
        razorpay_signature = request.data.get('razorpay_payment_signature')
        amount = float(request.data.get('final_amount_with_gst'))
        print(data)
        params_dict = {
            'razorpay_order_id':order_id,
            'razorpay_payment_id':payment_id,
            'razorpay_signature':razorpay_signature
        }
        serializer = OrderSerializer(data = data)
        result = razorpay_client.utility.verify_payment_signature(params_dict)
        if result == True:
            try:
                if user.username == request.data.get('user'):
                        cart = KartElement.objects.filter(user =  user)
                        razorpay_client.payment.capture(request.data.get('razorpay_payment_id'),amount)
                        if(serializer.is_valid()):
                            serializer.save()
                            for i in cart:
                                OrderedItem.objects.create(
                                user = user,
                                order = Order.objects.get(id = serializer.data['id']),
                                product = i.product,
                                price_of_product = i.product_price,
                                quantity = i.quantity,
                                size = i.size,
                                title_of_product = i.product_title,
                                color = i.color,
                                final_amount_with_gst = Order.objects.get(id = serializer.data['id']).final_amount_with_gst,
                                total_ordered_price = i.total_price,
                                ordered_image_url = i.product_image,
                                )
                            return Response('order succesfull',status=status.HTTP_200_OK)
                        else:
                            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                
                
                else:
                    return Response('unAuthorized',status=status.HTTP_401_UNAUTHORIZED)
            except Exception as e:
                    print(e)
                    return Response('payment unsuccesfull',status=status.HTTP_400_BAD_REQUEST)
        else:
            
            return Response('payment unsuccesfull',status=status.HTTP_400_BAD_REQUEST)



class handleEachOrderRequest(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        user = request.user
        print('user',user)
        data = request.data
        print(data)
        payment_id = request.data.get('razorpay_payment_id')
        order_id = request.data.get('razorpay_order_id')
        razorpay_signature = request.data.get('razorpay_payment_signature')
        amount = float(request.data.get('final_amount_with_gst'))
        print(data)
        params_dict = {
            'razorpay_order_id':order_id,
            'razorpay_payment_id':payment_id,
            'razorpay_signature':razorpay_signature
        }
        serializer = OrderSerializer(data = data)
        result = razorpay_client.utility.verify_payment_signature(params_dict)
        if result == True:
            try:
                if user.username == request.data.get('user'):
                        razorpay_client.payment.capture(request.data.get('razorpay_payment_id'),amount)
                        if(serializer.is_valid()):
                            serializer.save()
                            OrderedItem.objects.create(
                                user = user,
                                order = Order.objects.get(id = serializer.data['id']),
                                product = Product.objects.get(id = data.get('product')),
                                price_of_product = data.get('price_of_product'),
                                title_of_product = Product.objects.get(id = data.get('product')).title,
                                quantity = data.get('quantity'),
                                final_amount_with_gst = Order.objects.get(id = serializer.data['id']).final_amount_with_gst,
                                size = data.get('size'),
                                color = data.get('color'),
                                total_ordered_price = data.get('total_ordered_price'),
                                ordered_image_url = data.get('ordered_image_url'),
                                )
                            return Response('order succesfull',status=status.HTTP_200_OK)
                        else:
                            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                
                
                else:
                    return Response('unAuthorized',status=status.HTTP_401_UNAUTHORIZED)
            except Exception as e:
                    print(e)
                    return Response('payment unsuccesfull',status=status.HTTP_400_BAD_REQUEST)
        else:
            
            return Response('payment unsuccesfull',status=status.HTTP_400_BAD_REQUEST)

class GetUsersOrderItems(ListAPIView):
    serializer_class = OrderedItemSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
         return OrderedItem.objects.filter(user = self.request.user)

class GetUsersOrder(RetrieveAPIView):
    serializer_class = OrderSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
         return Order.objects.filter(user = self.request.user)

