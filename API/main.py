from PIL import Image
from fastapi import FastAPI, File, UploadFile
import numpy as np
import uvicorn
from io import BytesIO
import tensorflow as tf
from tensorflow.keras.models import load_model


app = FastAPI()

# Assuming `MODEL` is your loaded Keras model
MODEL = load_model("/Users/athulnambiar/Desktop/PROJECTS/POTATO DISEASE/model/model_2.keras")

@app.get("/ping")
async def ping():
    return "Hello, I am alive!"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    
    # Preprocess the image if necessary (e.g., resizing, normalization)
    # Example: image = preprocess_image(image)
    
    # Make predictions using the loaded model
    predictions = MODEL.predict(np.expand_dims(image, axis=0))
    
    # Process predictions and return results
    # Example: return {"class": "healthy" if predictions[0] < 0.5 else "blight", "confidence": predictions[0]}
    return {"predictions": predictions.tolist()}  # Return predictions as a list for easier JSON serialization

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
