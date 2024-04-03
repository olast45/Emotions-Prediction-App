import uvicorn
import pickle
import sys
sys.path.append('../utils')

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from functions import clean_data, remove_stopwords_and_lemmatize

app = FastAPI()

# This middleware adds CORS headers to HTTP responses, allowing communication
# between the frontend and backend even if they are hosted on different domains or ports

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def label_to_emotion(label: int) -> str:
    label_to_emotion_dict = {
		0 : "sadness",
		1 : "joy",
		2 : "love",
		3 : "anger",
		4 : "fear",
		5 : "surprise"
	}
    return label_to_emotion_dict.get(label)
     

# Load the model from the pickle file
with open('../models/emotions_classifier_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Load the tfidf vectorizer from the pickle file
with open('../models/tfidf.pkl', 'rb') as file:
    tfidf_vectorizer = pickle.load(file)
    
@app.get("/predict")
def model_prediction(sentence: str) -> str:
	sentence = clean_data(sentence)
	sentence = remove_stopwords_and_lemmatize(sentence)
	sentence_tfidf = tfidf_vectorizer.transform([sentence])
	prediction = model.predict(sentence_tfidf)
	return label_to_emotion(prediction[0])


if __name__ == "__main__":
	uvicorn.run(app, host="0.0.0.0", port=8000) 
