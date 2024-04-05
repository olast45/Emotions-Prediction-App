import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import '../css/PredictionComponent.css'

const PredictionComponent = ({ sentence, prediction, setSentence }) => {
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
