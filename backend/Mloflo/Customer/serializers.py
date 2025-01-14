from rest_framework import serializers
from . models import Customer, ChefBooking


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('customer', 'id','country', 'county', 'city', 'office_address')

class ChefBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChefBooking
        fields = '__all__'