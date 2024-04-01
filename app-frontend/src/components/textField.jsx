import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import '../css/textField.css'

const TextFieldComponent = () => {
    const [sentence, setSentence] = useState("");
    const [prediction, setPrediction] = useState("");

    const sendTextToModel = () => {
        fetch(`http://localhost:8000/predict?sentence=${encodeURIComponent(sentence)}`)
        .then((response) => response.json())
        .then((data) => {
            setPrediction(data);
            console.log(data);
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
        <div id="text-component">
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

export default TextFieldComponent;