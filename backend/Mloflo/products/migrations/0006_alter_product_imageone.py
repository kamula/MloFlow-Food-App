# Generated by Django 4.2.4 on 2023-09-09 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_alter_product_category_alter_product_weight'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='imageOne',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/images/'),
        ),
    ]