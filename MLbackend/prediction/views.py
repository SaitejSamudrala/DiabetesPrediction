
from rest_framework.decorators import api_view
from rest_framework.response import Response
from prediction.helper import predict
from django.http import JsonResponse



 

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


