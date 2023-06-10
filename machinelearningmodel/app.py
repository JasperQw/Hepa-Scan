from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)


@app.route('/etcModel', methods=['GET', 'POST'])
def predict():
    loaded_model = joblib.load('etc_model.pkl')
    input_data = request.get_json(force=True)['data']
    for index, data in enumerate(input_data):
        input_data[index] = float(data)

    input_data = pd.DataFrame([input_data], columns=[
                              'Age', 'Gender', 'TB', 'DB', 'Alkphos', 'Sgpt', 'Sgot', 'TP', 'ALB', 'A/G_Ratio'])
    prediction = loaded_model.predict(input_data)
    message = ""

    if (prediction == 1):
        message = "Patient is likely to have liver disease"
    else:
        message = "Patient is unlikely to have liver disease"
    response = {
        'prediction': prediction.tolist(),
        'message': message
    }
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
