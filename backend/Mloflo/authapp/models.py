import uuid
from django.utils import timezone
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


from django.conf import settings

from rest_framework_simplejwt.tokens import RefreshToken
# Create your models here.

class UserAccountManager(BaseUserManager):
    def _create_user(self, email, first_name, surname, phone, home_address,category, password=None, **extra_fields):
        if not email:
            raise ValueError("Email must be provided")
        if not password:
            raise ValueError('Password is not provided')
        
        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email = email,
            first_name = first_name,
            surname = surname,
            phone = phone,
            home_address = home_address,
            category =category,
            **extra_fields
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user

        
        
    def create_user(self, email, first_name, surname, phone, home_address,category,password, **extra_fields):
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_active',False)
        extra_fields.setdefault('is_superuser',False)
        return self._create_user(email, first_name, surname, phone, home_address,category, password, **extra_fields)
    
    
    def create_superuser(self, email, first_name, surname, phone, home_address,category, password, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_admin',True)
        return self._create_user(email, first_name, surname, phone, home_address,category, password, **extra_fields)
       


class User(AbstractBaseUser, PermissionsMixin):
    CATEGORY_CHOICES = [
        ('admin','admin'),       
        ('customer','customer'),
        #('admin', 'admin'),
        ('chef','chef'),
        ('vendor','vendor'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)    
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    home_address = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)    
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

# added fields
    date_joined = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)    
    if_first_time_login = models.BooleanField(default=True)
    is_profile_complete = models.BooleanField(default=False)
    #Terms_and_condition = models.BooleanField(default=True)
    is_profile_complete = models.BooleanField(default=False)
    
    otp = models.CharField(max_length=6)
    otp_expiry = models.DateTimeField(blank=True, null=True)
    max_otp_try = models.CharField(max_length=2, default=settings.MAX_OTP_TRY)
    otp_max_out = models.DateTimeField(blank=True, null=True)
    
    reset_password_otp = models.CharField(max_length=6)   
    
   
    
    objects = UserAccountManager()
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name","surname", "phone","category","home_address"]
    
    
    
    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
