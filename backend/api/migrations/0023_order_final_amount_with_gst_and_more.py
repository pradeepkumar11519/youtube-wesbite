# Generated by Django 4.1.1 on 2022-09-27 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_alter_order_created_at_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='final_amount_with_gst',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='created_at_time',
            field=models.CharField(blank=True, default='9:58:43 pm', max_length=225, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='updated_at_time',
            field=models.CharField(blank=True, default='9:58:43 pm', max_length=225, null=True),
        ),
    ]