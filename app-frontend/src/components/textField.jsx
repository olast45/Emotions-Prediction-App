import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import '../css/textField.css'

const TextFieldComponent = () => {
    const [sentence, setSentence] = useState("");

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
            <h3>Your Entered Sentence is: {sentence} </h3>
        </div>
    );
};

export default TextFieldComponent;