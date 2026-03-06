from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import json
import os

app = FastAPI(title="AI Farmer Plant Disease API")

# ==============================
# Enable CORS
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# Paths
# ==============================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "plant_disease_model.h5")
CLASS_PATH = os.path.join(BASE_DIR, "class_names.json")

model = None
class_names = None


# ==============================
# Load Model at Startup
# ==============================

@app.on_event("startup")
def load_model():

    global model
    global class_names

    try:

        print("Loading model from:", MODEL_PATH)

        model = tf.keras.models.load_model(MODEL_PATH, compile=False)

        with open(CLASS_PATH, "r") as f:
            class_names = json.load(f)

        print("✅ Model loaded successfully")

    except Exception as e:

        print("❌ Model loading failed:", e)

        model = None
        class_names = None


# ==============================
# Treatment Map
# ==============================

treatment_map = {
    "Pepper__bell___Bacterial_spot":
    "Spray copper-based bactericide every 7 days.",

    "Pepper__bell___healthy":
    "Plant is healthy. Maintain proper watering.",

    "Potato___Early_blight":
    "Apply fungicide containing chlorothalonil.",

    "Potato___Late_blight":
    "Apply systemic fungicide immediately.",

    "Potato___healthy":
    "Plant is healthy. Maintain soil moisture.",

    "Tomato_Bacterial_spot":
    "Spray copper bactericide.",

    "Tomato_Early_blight":
    "Apply fungicide weekly.",

    "Tomato_Late_blight":
    "Remove infected plants immediately.",

    "Tomato_Leaf_Mold":
    "Reduce humidity and improve airflow.",

    "Tomato_Septoria_leaf_spot":
    "Remove infected leaves.",

    "Tomato_Spider_mites_Two_spotted_spider_mite":
    "Spray neem oil.",

    "Tomato_Target_Spot":
    "Apply fungicide.",

    "Tomato_Tomato_mosaic_virus":
    "Remove infected plants.",

    "Tomato_Tomato_YellowLeaf_Curl_Virus":
    "Control whiteflies.",

    "Tomato_healthy":
    "Plant is healthy."
}


# ==============================
# Root Route
# ==============================

@app.get("/")
def home():
    return {"message": "🌱 AI Farmer API is running"}


# ==============================
# Health Check
# ==============================

@app.get("/health")
def health():

    if model is None:
        return {"status": "error", "model": "not loaded"}

    return {"status": "ok", "model": "loaded"}


# ==============================
# Prediction API
# ==============================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:

        contents = await file.read()

        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((224, 224))

        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array)

        predicted_index = int(np.argmax(predictions))
        confidence = float(np.max(predictions))

        predicted_class = class_names[str(predicted_index)]

        treatment = treatment_map.get(
            predicted_class,
            "Consult agricultural expert"
        )

        return {
            "success": True,
            "disease": predicted_class,
            "confidence": round(confidence * 100, 2),
            "treatment": treatment
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )