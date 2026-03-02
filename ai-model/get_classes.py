import json
from tensorflow.keras.preprocessing.image import ImageDataGenerator

train_dir = "dataset/train"

datagen = ImageDataGenerator(rescale=1./255)

train_generator = datagen.flow_from_directory(
    train_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

class_indices = train_generator.class_indices

# Reverse mapping (index → class name)
index_to_class = {v: k for k, v in class_indices.items()}

with open("class_names.json", "w") as f:
    json.dump(index_to_class, f)

print("Class names saved!")