import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import '../css/PredictionComponent.css'

const PredictionComponent = () => {
    const [sentence, setSentence] = useState("");
    const [prediction, setPrediction] = useState("");

    const sendTextToModel = () => {
        fetch(`http://localhost:8000/predict?sentence=${encodeURIComponent(sentence)}`)
        .then((response) => response.json())
        .then((data) => {
            setPrediction(data.emotion);
            console.log(data.emotion);
        })
        .catch((error) => {
            console.error("Error fetching prediction:", error);
        });
    };

    useEffect(() => {
        if (sentence.trim() !== "") {
            sendTextToModel();
        } else {
            setPrediction("");
        }
    }, [sentence]);    

    return (
        <div id="my-component">
            <h2>Enter a sentence below</h2>
            <TextField 
                value={sentence}
                onChange={(e) => {
                    setSentence(e.target.value);
                }}
                className="TextField"
            />
            <h3>Your predicted emotion is: {prediction} </h3>
        </div>
    );
};

export default PredictionComponent;