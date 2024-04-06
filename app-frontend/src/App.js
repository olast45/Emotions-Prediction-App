import "./css/App.css";
import React, { useState, useEffect } from "react";
import EmotionPrediction from "./components/EmotionPrediction";

const App = () => {
    const [sentence, setSentence] = useState("");
    const [prediction, setPrediction] = useState("");

    useEffect(() => {
        const sendTextToModel = () => {
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
    
        sendTextToModel();
    }, [sentence]);    

    return (
        <>
        <div id="title">
            <h1>Emotions Prediction App</h1>
        </div>
        <EmotionPrediction sentence={sentence} prediction={prediction} setSentence={setSentence} />
      </>
  );
};

export default App;



