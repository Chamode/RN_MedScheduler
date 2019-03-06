from django.shortcuts import render
from rest_framework import viewsets
from .models import Medicine, Doctor, Appointment, User, Profile
from .serializers import MedicineSerializer, DoctorSerializer, AppointmentSerializer, UserSerializer, ProfileSerializer

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.


class MedicineView(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer


class DoctorView (viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer


class AppointmentView (viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related('doctor').all()
    serializer_class = AppointmentSerializer


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all().select_related('profile')
    serializer_class = UserSerializer


class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

#User authentication
@api_view(['POST'])
def user_login(request):
    if request.method == "POST":
        json_data = JSONParser().parse(request)

        user = User.objects.get(username=json_data['username'])

        if check_password(json_data['password'], user.password) is True:

            return Response(True, status=status.HTTP_201_CREATED)
        else:
            return Response(False, status=status.HTTP_401_UNAUTHORIZED)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
