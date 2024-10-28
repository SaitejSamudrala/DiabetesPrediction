from django.shortcuts import render
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
import pickle
from tutorial.quickstart.serializers import GroupSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from prediction.helper import predict

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]



@api_view(['GET', 'POST'])
def hello_world(request):
    if request.method == 'POST':
        return Response({"message": "Got some data!", "data": request.data})
    return Response({"message": "Hello, world!"})


@api_view(['POST'])
def predict(request):
    
    prediction = predict([request.Glucose,request.Insulin,request.BMI,request.Age])
    if prediction == 'YES':
        return Response({"Result": "Positive"})
    return Response({"Result":"Negative"})


