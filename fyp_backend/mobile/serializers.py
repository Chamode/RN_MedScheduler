from rest_framework import serializers
from .models import Medicine, Doctor, Appointment, Profile, User

class MedicineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Medicine
        fields = ('id', 'url', 'name', 'desc', 'dosage', 'unit')

class DoctorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Doctor
        fields = ('id', 'url', 'name', 'speciality', 'mNumber', 'oNumber', 'email', 'address')
    
class AppointmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Appointment
        fields = ('id', 'url', 'title', 'doctor', 'date', 'time', 'location', 'notes')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'password', 'profile')

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'url', 'user', 'icNum', 'address', 'age', 'weight', 'height', 'healthHistory')