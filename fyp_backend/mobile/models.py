from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    icNum = models.CharField(max_length = 15)
    address = models.CharField(max_length = 75)
    age = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    healthHistory = models.CharField(max_length = 250)

class Doctor(models.Model):
    name = models.CharField(max_length = 50)
    speciality = models.CharField(max_length = 20)
    mNumber = models.CharField(max_length = 15)
    oNumber = models.CharField(max_length = 15)
    email = models.CharField(max_length = 30)
    address = models.CharField(max_length = 75)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    title = models.CharField(max_length = 20)
    doctor = models.ForeignKey(Doctor, on_delete = models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length = 40)
    notes = models.CharField(max_length = 150)

    def __str__(self):
        return self.title

class Medicine(models.Model):
    name = models.CharField(max_length = 50)
    desc = models.CharField(max_length = 150)
    dosage = models.PositiveIntegerField()
    unit = models.CharField(max_length = 20)

    def __str__(self):
        return self.name