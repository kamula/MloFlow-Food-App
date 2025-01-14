from django.db import models
import uuid
from authapp.models import User
from django.conf import settings

class Certification(models.Model):
    file = models.FileField(upload_to='certificates/', blank=True, null=True)
    description = models.CharField(max_length=255, null=True, blank=True)

class Chef(models.Model):
    id = models.UUIDField(primary_key=True, unique=True,
                          editable=False, default=uuid.uuid4)
    chef = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    country = models.CharField(max_length=100, null=True, blank=False)
    state = models.CharField(max_length=100, null=True, blank=False)
    city = models.CharField(max_length=100, null=True, blank=False)
    profile_picture = models.ImageField(
        upload_to='profile_images/', null=True, blank=False)
    speciality = models.CharField(max_length=200, null=True, blank=False)
    avg_star_rating = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)
    is_available = models.BooleanField(default=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Chefs"
        ordering = ["chef_id"]

    def update_avg_star_rating(self):
        reviews = Review.objects.filter(chef=self)
        if reviews.exists():
            total_ratings = sum(review.rating for review in reviews)
            self.avg_star_rating = total_ratings / reviews.count()
            self.save()

    def __str__(self):
        return f" {self.chef.first_name} {self.chef.surname}"


class Chef_certification(models.Model):
    'chef certification model'
    id = models.UUIDField(primary_key=True, unique=True,
                          editable=False, default=uuid.uuid4)
    chef = models.ForeignKey(Chef, on_delete=models.CASCADE)
    file = models.FileField(upload_to='certificates/', blank=True, null=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.chef}'
    


class Review(models.Model):
    chef = models.ForeignKey(Chef, on_delete=models.CASCADE)
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Reviews"

    def __str__(self):
        return f"Review for {self.chef} by {self.reviewer}"
    
class Occasion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    occasion_name = models.CharField(max_length=255, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)
    #date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.occasion_name

class ChefCharge(models.Model):
    chef = models.ForeignKey(User, on_delete=models.CASCADE)
    occasion = models.ForeignKey(Occasion, on_delete=models.CASCADE, to_field='occasion_name')
    amount_charged = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.chef.first_name} - {self.occasion}"