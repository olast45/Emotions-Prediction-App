import "./css/App.css";
import PredictionComponent from "./components/PredictionComponent";

export default function App() {
  return (
    <>
      <div id="title">
        <h1>Emotions Prediction App</h1>
      </div>
      <PredictionComponent />
    </>
  );
}
