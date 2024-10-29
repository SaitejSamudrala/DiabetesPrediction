import pandas as pd
import numpy as np
import pickle
import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
print(BASE_DIR)




def predict_response(attr):
    print("Starting Inference")
    filename = os.path.join(BASE_DIR, 'GaussianNB_model.sav')
    loaded_model = pickle.load(open(filename, 'rb'))

    filename2 = os.path.join(BASE_DIR, 'StandardScaler.sav')
    loaded_scaler = pickle.load(open(filename2, 'rb'))

    
    result = loaded_model.predict(loaded_scaler.transform(np.array(attr).reshape(1,-1)))
    print(loaded_scaler.transform(np.array(attr).reshape(1,-1)))
    print(f"Input attributes: {attr}")  # Debugging line
    print(f"Model prediction: {result}")  # Debugging line
    if(result[0] == 1):
        return "YES"
    return "NO"



if __name__ == '__main__':
    # debugging code for the predict function goes here if any
    print(predict_response([89,94,28.1,21]))