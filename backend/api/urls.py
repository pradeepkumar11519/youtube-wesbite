from django.contrib import admin
from django.urls import path,include
from .views import *
urlpatterns = [
    path('Login/',Login.as_view()),
    path('Signup/',Signup.as_view()),
    path('ListAddProduct/',ListAddProduct.as_view()),
    path('RetrieveUpdateDestroyProduct/<int:pk>/',RetrieveUpdateDestroyProduct.as_view()),
    path('filter',CustomFilter.as_view()),
    path('GetAllElementsFromKart/',GetAllElementsFromKart.as_view()),
    path('AddElementToKart/',AddElementToKart.as_view()),
    path('DeleteElementFromKart/',DeleteKartElement.as_view()),
    path('PlaceOrderThruCart/',PlaceOrderThroughCart.as_view()),
    path('handlerequest/',handelrequest.as_view()),
    path('handleEachOrderRequest/',handleEachOrderRequest.as_view()),
    path('GetUsersOrderItems/',GetUsersOrderItems.as_view()),
    path('GetUsersOrder/<int:pk>/',GetUsersOrder.as_view()),
    
]