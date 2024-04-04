import uvicorn
import pickle
import sys
sys.path.append('../utils')

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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
def model_prediction(sentence: str) -> JSONResponse:
    """
    Predicts the emotion label and probabilities for each emotion to be predicted for the given input sentence.

    Parameters:
    - sentence (str): The input sentence to make the prediction for.

    Returns:
    - JSONResponse: A JSON response containing the predicted emotion label and the list of all emotions and their corresponding probabilities.

    This function performs the following steps:
    1. Cleans the input sentence by applying the `clean_data` function.
    2. Removes stopwords and lemmatizes the cleaned sentence using the `remove_stopwords_and_lemmatize` function.
    3. Transforms the preprocessed sentence into a TF-IDF vector using the `tfidf_vectorizer` transformer.
    4. Predicts the emotion label for the TF-IDF vector using the trained model.
    5. Computes the probabilities of each emotion class for the input sentence using the trained model and converts it to a list.
    6. Maps the emotion class labels to their corresponding emotion names using the `label_to_emotion` function.
    7. Constructs a list of tuples, where each tuple contains an emotion name and its corresponding probability.
    8. Returns a JSON response.
    """
    sentence = clean_data(sentence)
    sentence = remove_stopwords_and_lemmatize(sentence)
    sentence_tfidf = tfidf_vectorizer.transform([sentence])
    prediction = model.predict(sentence_tfidf)
    probabilities = model.predict_proba(sentence_tfidf)[0].tolist()
    labels = [label_to_emotion(label) for label in model.classes_]
    prediction_probabilities = list(zip(labels, probabilities))
    return JSONResponse(content={"emotion": label_to_emotion(prediction[0]), "probabilities": prediction_probabilities})


if __name__ == "__main__":
	uvicorn.run(app, host="0.0.0.0", port=8000) 
