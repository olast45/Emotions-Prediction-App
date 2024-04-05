import "./css/App.css";
import React, { useState, useEffect } from "react";
import PredictionComponent from "./components/PredictionComponent";

const App = () => {
    const [sentence, setSentence] = useState("");
    const [prediction, setPrediction] = useState("");

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

    useEffect(() => {
        sendTextToModel();
    }, [sentence]);

    return (
      <PredictionComponent sentence={sentence} prediction={prediction} setSentence={setSentence} />
  );
};

export default App;



