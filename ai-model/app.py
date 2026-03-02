from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import json

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = tf.keras.models.load_model("plant_disease_model.h5")

# Load class names from JSON file
with open("class_names.json", "r") as f:
    class_names = json.load(f)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()

    # Preprocess image
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image = image.resize((224, 224))

    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Make prediction
    predictions = model.predict(img_array)
    predicted_index = str(np.argmax(predictions))
    confidence = float(np.max(predictions))

    predicted_class = class_names[predicted_index]

    return {
        "disease": predicted_class,
        "confidence": confidence
    }