from django.db import models


# Create your models here.

class User(models.Model):
    Name=models.CharField(max_length=30)
    Email=models.CharField(max_length=30)

class Education(models.Model):
    Course=models.CharField(max_length=30)
    University=models.CharField(max_length=30)
    date=models.CharField(max_length=30)
    log_id=models.ForeignKey(User,on_delete=models.CASCADE)
    
