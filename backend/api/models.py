
from django.db import models
from django.contrib.auth.models import User

from .helpers import *
# Create your models here.
def upload_photo(instance,filename):
    return 'image/{0}'.format(filename)

class OrderDetails(models.Model):
    pass

class Product(models.Model):
    title = models.CharField(max_length=225,null=True,blank=True,default=None)
    desc = models.TextField(null=True,blank=True,default=None)
    image_url = models.URLField(null=True,blank=True,default=None)
    image_white_front = models.ImageField(null=True,blank=True,default=None,upload_to=upload_photo)
    image_black_front = models.ImageField(null=True,blank=True,default=None,upload_to=upload_photo)
    image_blue_front = models.ImageField(null=True,blank=True,default=None,upload_to=upload_photo)
    image_red_front = models.ImageField(null=True,blank=True,default=None,upload_to=upload_photo)
    image_maroon_front = models.ImageField(null=True,blank=True,default=None,upload_to=upload_photo)
    image_yellow_front = models.ImageField(null=True,blank=True,default=None,upload_to=upload_photo)
    image_gray_front = models.ImageField(null=True,blank=True,default=None,upload_to=upload_photo)
    image_dark_blue_front = models.ImageField(null=True,blank=True,default=None,upload_to=upload_photo)
    image_light_blue_front = models.ImageField(null=True,blank=True,default=None,upload_to=upload_photo)
    image_green_front = models.ImageField(null=True,blank=True,default=None,upload_to=upload_photo)
    image_white_url = models.URLField(null=True,blank=True,default=None)
    image_black_url = models.URLField(null=True,blank=True,default=None)
    image_blue_url = models.URLField(null=True,blank=True,default=None)
    image_red_url = models.URLField(null=True,blank=True,default=None)
    image_maroon_url = models.URLField(null=True,blank=True,default=None)
    image_yellow_url = models.URLField(null=True,blank=True,default=None)
    image_gray_url = models.URLField(null=True,blank=True,default=None)
    image_dark_blue_url = models.URLField(null=True,blank=True,default=None)
    image_light_blue_url = models.URLField(null=True,blank=True,default=None)
    image_green_url = models.URLField(null=True,blank=True,default=None)
    category = models.CharField(max_length=225,null=True,blank=True,default=None)
    price = models.IntegerField(null=True,blank=True,default=None)
    
class KartElement(models.Model):
    product = models.ForeignKey(Product,null=True,blank=True,default=None,on_delete=models.CASCADE)
    product_title = models.CharField(max_length=225,null=True,blank=True,default=None)
    product_image = models.URLField(null=True,blank=True,default=None)
    product_price = models.IntegerField(null=True,blank=True,default=None)
    user = models.ForeignKey(User,to_field="username",null=True,default=None,blank=True,on_delete=models.CASCADE)
    quantity = models.IntegerField(null=True,blank=True,default=None)
    total_price = models.IntegerField(null=True,blank=True,default=None)
    color = models.CharField(max_length=225,null=True,blank=True,default=None)
    size = models.CharField(max_length=225,null=True,blank=True,default=None)

class Order(models.Model):
    user = models.ForeignKey(User,to_field="username",on_delete=models.CASCADE)
    username = models.CharField(max_length=225,null=True,blank=True,default=None) 
    email = models.EmailField(null=True,blank=True,default=None)
    Phone_Number = models.CharField(max_length=11,null=True,blank=True,default=None)
    address = models.TextField(null=True,blank=True,default=None)
    city = models.CharField(max_length=225,null=True,blank=True,default=None)
    state = models.CharField(max_length=225,null=True,blank=True,default=None)
    pincode = models.CharField(max_length=225,null=True,blank=True,default=None)
    total_ordered_price = models.CharField(max_length=225,null=True,blank=True,default=None)
    final_amount_with_gst = models.CharField(max_length=225,null=True,blank=True,default=None)
    payment_method = models.CharField(max_length=225,null=True,blank=True,default=None)
    payment_id = models.CharField(max_length=225,null=True,blank=True,default=None)
    DeliveryStatuses = (
        (1,'Pending'),
        (2,'Out For Shipping'),
        (3,'Delivered'),
    )
    PaymentStatuses = (
        (1,'PENDING'),
        (2,'FAILURE'),
        (3,'SUCCESS'),
    )
    delivery_status = models.IntegerField(choices=DeliveryStatuses,null=True,blank=True,default=1)
    payment_status = models.IntegerField(choices=PaymentStatuses,null=True,blank=True,default=1)
    message = models.TextField(max_length=225,null=True,blank=True,default=None)
    tracking_no = models.CharField(max_length=225,null=True,blank=True,default=None)
    created_at_time = models.CharField(max_length=225,null=True,blank=True)
    updated_at_time = models.CharField(max_length=225,null=True,blank=True)
    created_at_date= models.CharField(max_length=225,null=True,blank=True)
    updated_at_date= models.CharField(max_length=225,null=True,blank=True)
    razorpay_order_id = models.CharField(max_length=225,null=True,blank=True,default=None)
    razorpay_payment_id = models.CharField(max_length=225,blank=True,null=True,default=None)
    razorpay_payment_signature = models.CharField(max_length=225,null=True,blank=True,default=None)

    def __str__(self):
        return '{0} - {1}'.format(self.id,self.tracking_no)

class OrderedItem(models.Model):
    user = models.ForeignKey(User,to_field="username",on_delete=models.CASCADE) 
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    title_of_product = models.CharField(max_length=225,null=True,blank=True,default=None)
    price_of_product = models.IntegerField(null=True,blank=True,default=None)
    quantity = models.IntegerField(null=True,blank=True,default=None)
    total_ordered_price = models.IntegerField(null=True,blank=True,default=None)
    final_amount_with_gst = models.CharField(max_length=225,null=True,blank=True,default=None)
    size = models.CharField(max_length=225,null=True,blank=True,default=None)
    color = models.CharField(max_length = 225,null=True,blank=True,default=None)
    ordered_image_url = models.URLField(null=True,blank=True,default=None)
    def __str__(self):
        return '{0} - {1}'.format(self.order.id,self.order.tracking_no)

