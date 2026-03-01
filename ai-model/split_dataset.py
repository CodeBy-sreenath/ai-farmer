import os
import shutil
import random

raw_dir = "dataset/raw"
train_dir = "dataset/train"
val_dir = "dataset/validation"

split_ratio = 0.8  # 80% train, 20% validation

os.makedirs(train_dir, exist_ok=True)
os.makedirs(val_dir, exist_ok=True)

for class_name in os.listdir(raw_dir):
    class_path = os.path.join(raw_dir, class_name)

    if os.path.isdir(class_path):
        images = os.listdir(class_path)
        random.shuffle(images)

        split_index = int(len(images) * split_ratio)

        train_images = images[:split_index]
        val_images = images[split_index:]

        os.makedirs(os.path.join(train_dir, class_name), exist_ok=True)
        os.makedirs(os.path.join(val_dir, class_name), exist_ok=True)

        for img in train_images:
            shutil.copy(
                os.path.join(class_path, img),
                os.path.join(train_dir, class_name, img)
            )

        for img in val_images:
            shutil.copy(
                os.path.join(class_path, img),
                os.path.join(val_dir, class_name, img)
            )

print("✅ Dataset split completed successfully!")