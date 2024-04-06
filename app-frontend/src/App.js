import "./css/App.css";
import React, { useState, useEffect } from "react";
import EmotionPrediction from "./components/EmotionPrediction";
import EmotionsProbabilities from "./components/EmotionsProbabilities";

const App = () => {
    const [sentence, setSentence] = useState("");
    const [prediction, setPrediction] = useState("");
    const [probabilities, setProbabilities] = useState([]);

    useEffect(() => {
        const getPrediction = () => {
            if (sentence.trim() !== "") {
                fetch(`http://localhost:8000/predict?sentence=${encodeURIComponent(sentence)}`)
                .then((response) => response.json())
                .then((data) => {
                    setPrediction(data.emotion);
                    console.log(data.emotion);
                })
                .catch((error) => {
                    console.error("Error fetching prediction:", error);
                });
            } else {
                setPrediction("");
            }
        };

        const getProbabilities = () => {
            if (sentence.trim() !== "") {
                fetch(`http://localhost:8000/predict_proba?sentence=${encodeURIComponent(sentence)}`)
                .then((response) => response.json())
                .then((data) => {
                    setProbabilities(data.probabilities);
                    console.log(data.probabilities);
                })
                .catch((error) => {
                    console.error("Error fetching probabilities:", error);
                });
            }
            else {
                setProbabilities("");
            }
        };
    
        getPrediction();
        getProbabilities();
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



