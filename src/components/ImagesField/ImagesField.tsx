import { useState } from "react";
import type { DragEvent } from "react";
import CardFormField from "../CardFormField/CardFormField";
import styles from "./ImagesField.module.css";
import type { CardImage } from "../../types/cardFormTypes";

interface ImagesFieldProps {
  images: CardImage[];
  onChange: (images: CardImage[]) => void;
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to load image"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading image"));
    };

    reader.readAsDataURL(file);
  });
}

const ImagesField = ({ images, onChange }: ImagesFieldProps) => {
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  async function handleFiles(files: FileList | File[] | null) {
    if (!files || files.length === 0) return;

    const remaining = 5 - images.length;

    if (remaining <= 0) {
      setError("You can add up to 5 images");
      return;
    }

    const selectedFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (selectedFiles.length === 0) {
      setError("Please select image files");
      return;
    }

    const selected = selectedFiles.slice(0, remaining);
    const exceededLimit = selectedFiles.length > remaining;

    setError("");

    try {
      const newImages = await Promise.all(
        selected.map(
          async (file): Promise<CardImage> => ({
            id: crypto.randomUUID(),
            name: file.name,
            file,
            preview: await readFile(file),
          }),
        ),
      );

      onChange([...images, ...newImages]);

      if (exceededLimit) {
        setError("Only 5 images can be added");
      }
    } catch {
      setError("Failed to read one of the images");
    }
  }

  function removeImage(id: string) {
    onChange(images.filter((image) => image.id !== id));
    setError("");
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    void handleFiles(event.dataTransfer.files);
  }

  return (
    <CardFormField
      label={`Images${images.length > 0 ? ` (${images.length})` : ""}`}
      error={error}
    >
      <div className={styles.container}>
        {images.map((image) => (
          <div className={styles.image} key={image.id}>
            <img src={image.preview} alt={image.name} />

            <button
              type="button"
              className={styles.remove}
              aria-label={`Remove ${image.name}`}
              onClick={() => removeImage(image.id)}
            >
              ×
            </button>

            <span className={styles.fileName}>{image.name}</span>
          </div>
        ))}

        {images.length < 5 && (
          <label
            className={`${styles.upload} ${
              isDragging ? styles.isDragging : ""
            }`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleDrop}
          >
            <span className={styles.imageText}>Drag & drop images here</span>

            <span className={styles.imageSubtext}>or click to browse</span>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                void handleFiles(event.target.files);
                event.target.value = "";
              }}
            />
          </label>
        )}
      </div>
    </CardFormField>
  );
};

export default ImagesField;
