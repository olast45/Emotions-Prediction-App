import uvicorn
import pickle

from fastapi import FastAPI

app = FastAPI()

# Load the model from the pickle file
with open('models/emotions_classifier_model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.get("/predict")
def model_prediction():
	return {"Hello" : "World"}


if __name__ == "__main__":
	uvicorn.run(app, host="0.0.0.0", port=8000) 
