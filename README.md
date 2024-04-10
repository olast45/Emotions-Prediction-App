# Emotions Prediction App

The purpose of this application is to classify the emotions expressed in text into six categories: joy, sadness, love, anger, fear, and surprise.
The application takes user input text and predicts the corresponding emotion in real-time. Additionally, it provides the probability scores for each emotion category, allowing users to understand the confidence level of the prediction for each emotion. It utilizes a trained XGBoost model that has been trained on a dataset containing labeled text samples for each emotion category. The model's predictions are served by a FastAPI backend, which communicates with the React frontend to provide a seamless user experience. To ensure easy deployment and scalability, the entire application is containerized using Docker

For a deeper understanding of the model and its performance, you can refer to the provided Jupyter notebook
`notebooks/emotions_analysis.ipynb. `
This notebook contains the analysis of the dataset, developing the best model and its training process, evaluation metrics, and insights into the emotion classification task.

## Usage

1. Install Docker

Follow the instructions given here - https://docs.docker.com

2. Clone the repository:

```shell
    git clone https://github.com/olast45/Emotions-Prediction-App.git
```

3. Navigate to the project directory:

```shell
    cd Emotions-Prediction-App
```

4. Modify the env_example file to specify the host ports for the frontend and backend service sand rename it to .env

5. Build the images for backend and frontend:

```shell
    docker compose build
```

6. Start and run the app:

```shell
    docker compose up
```

7. Open your web browser and navigate to http://localhost:<PORT_FRONTEND>
