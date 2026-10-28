import type { CardFormValues } from "../../types/cardFormTypes";
import Button from "../Button/Button";
import styles from "./CardPreview.module.css";

interface CardPreviewProps {
  card: CardFormValues;
  onBackToForm: () => void;
  onEdit: () => void;
}

const formatDeadline = (deadline: string): string => {
  if (!deadline) return "—";

  const date = new Date(`${deadline}T00:00:00`);

  if (Number.isNaN(date.getTime())) return deadline;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const CardPreview = ({ card, onBackToForm, onEdit }: CardPreviewProps) => {
  return (
    <section className={styles.page}>
      <h1 className={styles.pageTitle}>Card Preview</h1>

      <article className={styles.card}>
        <div className={styles.badges}>
          {card.status && <span className={styles.status}>{card.status}</span>}

          <span
            className={`${styles.priority} ${
              styles[`priority${card.priority}`]
            }`}
          >
            {card.priority === "High" && "🔥 "}
            {card.priority}
          </span>
        </div>

        <h2 className={styles.title}>{card.title}</h2>

        <p className={styles.description}>{card.description}</p>

        <div className={styles.divider} />

        <div className={styles.details}>
          <div>
            <span className={styles.detailLabel}>ASSIGNEE</span>
            <span className={styles.detailValue}>{card.assignee || "—"}</span>
          </div>

          <div>
            <span className={styles.detailLabel}>DEADLINE</span>
            <span className={styles.detailValue}>
              {formatDeadline(card.deadline)}
            </span>
          </div>
        </div>

        {card.tags.length > 0 && (
          <div className={styles.tags}>
            {card.tags.map((tag, index) => (
              <span
                className={`${styles.tag} ${styles[`tag${index % 3}`]}`}
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {card.images.length > 0 && (
          <div className={styles.images}>
            {card.images.map((image) => (
              <img
                key={image.id}
                src={image.preview}
                alt={image.name}
                title={image.name}
              />
            ))}
          </div>
        )}
      </article>

      <div className={styles.actions}>
        <Button
          typeBtn="Cancel"
          type="button"
          className={styles.backButton}
          onClick={onBackToForm}
        >
          ← Back to Form
        </Button>

        <Button
          typeBtn="Apply"
          type="button"
          className={styles.editButton}
          onClick={onEdit}
        >
          Edit Card
        </Button>
      </div>
    </section>
  );
};

export default CardPreview;
