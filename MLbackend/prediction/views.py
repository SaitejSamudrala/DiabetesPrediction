
from rest_framework.decorators import api_view
from rest_framework.response import Response
from prediction.helper import predict_response
from django.http import JsonResponse
import json


 

@api_view(['GET', 'POST'])
def hello_world(request):
    if request.method == 'POST':
        return Response({"message": "Got some data!", "data": request.data})
    return Response({"message": "Hello, world!"})


@api_view(['POST'])
def predict(request):

    print(request.body)
    try:
        glucose: int = int(request.data.get("Glucose"))
        insulin: int  = int(request.data.get("Insulin"))
        bmi: float = float(request.data.get("BMI"))
        age: int = int(request.data.get("Age"))
        model=request.data.get("Model")
    except ValueError as e:
        return Response({"error": f"Invalid input: {str(e)}"}, status=400)
    
    
    # if not all([glucose, insulin, bmi, age]):
    #     return Response({"error": "All fields (Glucose, Insulin, BMI, Age) are required."}, status=400)
    
    try:
        prediction = predict_response([glucose,insulin, bmi, age,model])
    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    print(prediction)
    if prediction == 'YES':
        return Response({"Result": "Positive"})
    return Response({"Result":"Negative"})




