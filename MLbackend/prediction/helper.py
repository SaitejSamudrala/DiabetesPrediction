import pandas as pd
import numpy as np
import pickle




def predict(attr: list):
    filename = '../GaussianNB_model.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    result = loaded_model.predict(np.array(attr).reshape(1,-1))
    if(result[0] == 1):
        return "YES"
    return "NO"



if __name__ == '__main__':
    # debugging code for the predict function goes here if any
    print(predict([148,0,33.6,50]))