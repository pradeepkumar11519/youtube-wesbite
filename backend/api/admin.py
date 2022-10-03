from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id','title','desc','price','desc']
@admin.register(KartElement)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id','product','user','quantity','total_price']
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id','tracking_no','user','total_ordered_price']
@admin.register(OrderedItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id','order','product','price_of_product','quantity']