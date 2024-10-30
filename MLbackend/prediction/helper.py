import pandas as pd
import numpy as np
import pickle
import os
from prediction.perceptron import CustomPerceptron

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(BASE_DIR)



def predict_response(attr):
    print("Starting Inference")
    print(attr)
    filename = os.path.join(BASE_DIR,'perceptron_model.pkl')
    loaded_perceptron_model = pickle.load(open(filename, 'rb'))

    filename = os.path.join(BASE_DIR,'naive_bayes_model.pkl')
    loaded_bayes_model = pickle.load(open(filename, 'rb'))

    filename2 = os.path.join(BASE_DIR, 'MinMaxScaler.pkl')
    loaded_scaler = pickle.load(open(filename2, 'rb'))

    if attr[4]=="Naive-Bayes Model":
        attr.remove("Naive-Bayes Model")
        result=loaded_bayes_model.predict(loaded_scaler.transform(np.array(attr).reshape(1,-1)))

    elif attr[4]=="Perceptron Model":
        attr.remove("Perceptron Model")
        result=loaded_bayes_model.predict(loaded_scaler.transform(np.array(attr).reshape(1,-1)))

    else:
        return "No Valid Input"
    print((np.array(attr).reshape(1,-1)))
    print(f"Input attributes: {attr}")
    print(f"Model prediction: {result}") 
    if(result[0] == 1):
        return "YES"
    return "NO"



if __name__ == '__main__':
    # debugging code for the predict function goes here if any
    print(predict_response([89,94,28.1,21,"Perceptron Model"]))