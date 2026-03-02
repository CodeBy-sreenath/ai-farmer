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

# Load class names
with open("class_names.json", "r") as f:
    class_names = json.load(f)

# ==============================
# Treatment dictionary (ALL 15)
# ==============================

treatment_map = {

    # Pepper
    "Pepper__bell___Bacterial_spot":
        "Spray copper-based bactericide every 7 days. Avoid overhead irrigation and remove infected leaves.",

    "Pepper__bell___healthy":
        "Plant is healthy. Maintain proper watering and balanced fertilizer for continued growth.",

    # Potato
    "Potato___Early_blight":
        "Remove infected leaves immediately. Apply fungicide containing chlorothalonil or mancozeb every 7–10 days.",

    "Potato___Late_blight":
        "Use certified disease-free seeds. Apply systemic fungicide immediately and improve air circulation.",

    "Potato___healthy":
        "Plant is healthy. Maintain proper soil moisture and apply balanced NPK fertilizer.",

    # Tomato
    "Tomato_Bacterial_spot":
        "Spray copper-based bactericide. Avoid working with wet plants and remove infected foliage.",

    "Tomato_Early_blight":
        "Remove lower infected leaves. Apply fungicide weekly and use crop rotation next season.",

    "Tomato_Late_blight":
        "Apply fungicide immediately. Remove infected plants and avoid overhead watering.",

    "Tomato_Leaf_Mold":
        "Improve air circulation and reduce humidity. Apply fungicide if infection spreads.",

    "Tomato_Septoria_leaf_spot":
        "Remove infected leaves. Apply protective fungicide and avoid splashing water on leaves.",

    "Tomato_Spider_mites_Two_spotted_spider_mite":
        "Spray neem oil or insecticidal soap. Increase humidity and remove heavily infested leaves.",

    "Tomato_Target_Spot":
        "Remove infected leaves. Apply fungicide and ensure proper spacing between plants.",

    "Tomato_Tomato_mosaic_virus":
        "Remove infected plants immediately. Disinfect tools and avoid tobacco contamination.",

    "Tomato_Tomato_YellowLeaf_Curl_Virus":
        "Control whiteflies using insecticides. Remove infected plants and use resistant varieties.",

    "Tomato_healthy":
        "Plant is healthy. Continue regular watering, proper sunlight, and balanced fertilization.",
}

# ==============================
# Prediction API
# ==============================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()

    # Preprocess image
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image = image.resize((224, 224))

    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Prediction
    predictions = model.predict(img_array)
    predicted_index = str(np.argmax(predictions))
    confidence = float(np.max(predictions))

    predicted_class = class_names[predicted_index]

    # Get treatment
    treatment = treatment_map.get(
        predicted_class,
        "Consult a local agricultural expert for proper treatment guidance."
    )

    return {
        "disease": predicted_class,
        "confidence": confidence,
        "treatment": treatment
    }