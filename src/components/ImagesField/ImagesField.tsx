import { useState } from "react";
import styles from "./ImagesField.module.css";
import CardFormField from "../CardFormField/CardFormField";

interface ImagesFieldProps {
  images: File[];
  onChange: (images: File[]) => void;
}

interface ImagePreview {
  file: File;
  url: string;
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
  const [previews, setPreviews] = useState<Map<File, string>>(new Map());
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files) return;

    const selected = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 5 - images.length);

    if (selected.length === 0) {
      setError("You can add up to 5 images");
      return;
    }

    setError("");

    try {
      const newPreviews: ImagePreview[] = await Promise.all(
        selected.map(async (file) => ({
          file,
          url: await readFile(file),
        })),
      );

      setPreviews((previous) => {
        const next =
          images.length === 0 ? new Map<File, string>() : new Map(previous);

        newPreviews.forEach(({ file, url }) => {
          next.set(file, url);
        });

        return next;
      });

      onChange([...images, ...selected]);
    } catch {
      setError("Failed to read one of the images");
    }
  }

  function removeImage(file: File) {
    onChange(images.filter((image) => image !== file));

    setPreviews((previous) => {
      const next = new Map(previous);
      next.delete(file);
      return next;
    });
  }

  return (
    <CardFormField
      label={`Images ${images.length > 0 ? "(" + images.length + ")" : ""}`}
      error={error}
    >
      <div className={styles.container}>
        {images.map((file, index) => (
          <div className={styles.image} key={`${file.name}-${index}`}>
            {previews.has(file) && (
              <img src={previews.get(file)} alt={file.name} />
            )}

            <button
              type="button"
              className={styles.remove}
              aria-label={`Remove ${file.name}`}
              onClick={() => removeImage(file)}
            >
              ×
            </button>

            <span className={styles.fileName}>{file.name}</span>
          </div>
        ))}

        {images.length < 5 && (
          <label className={styles.upload}>
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
