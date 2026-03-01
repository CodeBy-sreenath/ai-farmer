import connectDB from "@/lib/mongodb";
import Prediction from "@/models/Prediction";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Send image to Python ML server
    const pythonFormData = new FormData();
    pythonFormData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: pythonFormData,
    });

    if (!response.ok) {
      return Response.json(
        { error: "ML server error" },
        { status: 500 }
      );
    }

    const predictionResult = await response.json();

    /*
      predictionResult should look like:
      {
        disease: "Tomato Early Blight",
        confidence: 92.4,
        treatment: "Spray neem oil weekly"
      }
    */

    // Save to MongoDB
    const savedPrediction = await Prediction.create({
      disease: predictionResult.disease,
      confidence: predictionResult.confidence,
      treatment: predictionResult.treatment,
    });

    return Response.json(savedPrediction, { status: 201 });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const predictions = await Prediction.find()
      .sort({ createdAt: -1 });

    return Response.json(predictions, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}