# Generated by Django 4.2.4 on 2023-09-03 13:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=250)),
                ('description', models.CharField(max_length=250)),
                ('price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('stock', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(10)])),
                ('weight', models.DecimalField(decimal_places=2, max_digits=3)),
                ('is_available', models.BooleanField(blank=True, default=True)),
                ('is_sold', models.BooleanField(blank=True, default=False)),
                ('image', models.ImageField(upload_to='images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
