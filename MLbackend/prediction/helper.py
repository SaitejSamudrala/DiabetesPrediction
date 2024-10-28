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
    result = loaded_model.predict(np.array(attr).reshape(1,-1))
    if(result[0] == 1):
        return "YES"
    return "NO"



if __name__ == '__main__':
    # debugging code for the predict function goes here if any
    print(predict_response([148,0,33.6,50]))