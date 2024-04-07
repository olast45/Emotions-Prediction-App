import "./css/App.css";
import React, { useState, useEffect } from "react";
import EmotionPrediction from "./components/EmotionPrediction";
import EmotionsProbabilities from "./components/EmotionsProbabilities";

const App = () => {
    const [sentence, setSentence] = useState("");
    const [prediction, setPrediction] = useState("");
    const [probabilities, setProbabilities] = useState([]);

    useEffect(() => {
        const getPredictionAndProbabilities = () => {
            if (sentence.trim() !== "") {
                fetch(`http://localhost:8000/predict?sentence=${encodeURIComponent(sentence)}`)
                .then((response) => response.json())
                .then((data) => {
                    setPrediction(data.emotion);
                    console.log(data.emotion);
                    // After prediction is fetched, fetch probabilities
                    return fetch(`http://localhost:8000/predict_proba?sentence=${encodeURIComponent(sentence)}`);
                })
                .then((response) => response.json())
                .then((data) => {
                    setProbabilities(data.probabilities);
                    console.log(data.probabilities);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
            } else {
                setPrediction("");
                setProbabilities("");
            }
        };
    
        getPredictionAndProbabilities();
    }, [sentence]); 

    return (
        <>
        <div id="title">
            <h1>Emotions Prediction App</h1>
        </div>
        <EmotionPrediction sentence={sentence} prediction={prediction} setSentence={setSentence} />
        <EmotionsProbabilities probabilities={probabilities} />
      </>
  );
};

export default App;



