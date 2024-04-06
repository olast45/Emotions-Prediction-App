import React from "react";

const EmotionsProbabilities = ({ probabilities }) => {
 
    return (
      <div className="probability-list">
        {probabilities &&
          probabilities.map((pair, index) => (
            <div key={index} className="probability-item">
              <span className="emotion">{pair[0]}: </span>{" "}
              <span className="probability"> {`${(pair[1] * 100).toFixed(2)}%`}</span>
            </div>
          ))}
      </div>
    );
  };
  

export default EmotionsProbabilities;
