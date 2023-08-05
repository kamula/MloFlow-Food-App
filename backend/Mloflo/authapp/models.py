from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,BaseUserManager



# Create your models here.
class UserAccountManager(BaseUserManager):
    """ Manager for user account"""
    def create_user(self,email,name,phone,password=None):
        if not email:
            raise ValueError('Users must have an Email address registered!!!')
        email= self.normalize_email(email)
        user=  self.model(email=email, name=name,phone=phone)
        
        user.set_password(password)
        user.save()
        
        return user
    
   

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    phone=models.PhoneNumberField((""))
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    
    objects= UserAccountManager()
    
    USERAME_FIELD = 'email'
    REQUIRED_FIELDS=['name', 'phone']
    
    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email
    
    def __int__(self):
        return self.phone
        
    
    
    
    
    

    
    
    
