from django.db import models

# Create your models here.
class UserResponse(models.Model):
    Glucose = models.IntegerField(null=False)
    Insulin = models.IntegerField(null=False)
    BMI = models.FloatField(null=False)
    Age = models.IntegerField(null=False)
