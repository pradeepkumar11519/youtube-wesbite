# Generated by Django 4.1.1 on 2022-09-27 23:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_alter_order_created_at_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image_black_url',
            field=models.URLField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image_blue_url',
            field=models.URLField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image_dark_blue_url',
            field=models.URLField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image_gray_url',
            field=models.URLField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image_green_url',
            field=models.URLField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image_light_blue_url',
            field=models.URLField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image_maroon_url',
            field=models.URLField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image_red_url',
            field=models.URLField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image_white_url',
            field=models.URLField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image_yellow_url',
            field=models.URLField(blank=True, default=None, null=True),
        ),
    ]