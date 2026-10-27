import { useState } from "react";
import styles from "./TagsField.module.css";
import CardFormField from "../CardFormField/CardFormField";

interface TagsFieldProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagsField = ({ tags, onChange }: TagsFieldProps) => {
  const [input, setInput] = useState("");

  function addTag() {
    const tag = input.trim().replace(/,$/, "").trim();

    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
    }

    setInput("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }

    if (event.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <CardFormField label="Tags">
      <div className={styles.container}>
        {tags.map((tag, index) => (
          <span
            className={`${styles.tag} ${styles[`tag${index % 3}`]}`}
            key={tag}
          >
            {tag}
            <button
              type="button"
              className={styles.remove}
              aria-label={`Remove tag ${tag}`}
              onClick={() => onChange(tags.filter((item) => item !== tag))}
            >
              ×
            </button>
          </span>
        ))}

        <input
          className={styles.input}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length ? "" : "Add tags..."}
          aria-label="Add tags"
        />
      </div>
    </CardFormField>
  );
};

export default TagsField;
