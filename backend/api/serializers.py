from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from .helpers import getdate,gettime
import random
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email','username','password')
    def create(self, data):
        user = User.objects.create(
            email=data.get('email'),
            password = data.get('password'),
            username=data.get('username'),
            )
        user.set_password(data.get('password'))
        user.save()
        return user
    def validate(seld,data):
        user_email = User.objects.filter(email=data.get('email')).exists()
        if user_email:
            raise serializers.ValidationError({'error':'Email Already Exists Try With Another'})
        else:
            return data 


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class KartSerializer(serializers.ModelSerializer):
    class Meta:
        model = KartElement
        fields = "__all__"
    def create(self,data):
        cart_object = KartElement.objects.create(
            product = data.get('product'),
            product_title = data.get('product').title,
            product_image = data.get('product_image'),
            product_price = data.get('product').price,
            user = data.get('user'),
            total_price = int(data.get('quantity')) * int(data.get('product').price),
            quantity = data.get('quantity'),
            color = data.get('color'),
            size = data.get('size')
        )
        cart_object.save()
        return cart_object

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
    def create(self,data):
        order = Order.objects.create(
            user = data.get('user'),
            username =  data.get('user').username,          
            email =  data.get('user').email,        
            Phone_Number = data.get('Phone_Number'),            
            address = data.get('address'),          
            city =  data.get('city'),           
            state = data.get('state'),
            pincode = data.get('pincode'),
            total_ordered_price = data.get('total_ordered_price'),
            final_amount_with_gst = str(float(data.get('final_amount_with_gst'))/100) + ' Rupees',
            payment_method = data.get('payment_method'),
            tracking_no = data.get('user').username + str(random.randint(11111111,999999999)),
            payment_id = data.get('payment_id'),
            razorpay_order_id = data.get('razorpay_order_id'),
            razorpay_payment_id = data.get('razorpay_payment_id'),
            razorpay_payment_signature = data.get('razorpay_payment_signature'),
            created_at_time = gettime(),
            created_at_date = getdate(),
        )
        order.save()
        return order

class OrderedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderedItem
        fields = "__all__"
    
        