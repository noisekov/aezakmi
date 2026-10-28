import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import CardFormField from "../CardFormField/CardFormField";
import ImagesField from "../ImagesField/ImagesField";
import TagsField from "../TagsField/TagsField";
import styles from "./CreateCardForm.module.css";
import { type CardFormValues } from "../../types/cardFormTypes";
import Button from "../Button/Button";
import { createEmptyCardFormValues } from "../../services/createCard";

interface CreateCardFormProps {
  initialValues: CardFormValues;
  isEditing: boolean;
  onSubmit: (data: CardFormValues) => Promise<void>;
  onCancel: () => void;
}

const CreateCardForm = ({
  initialValues,
  isEditing,
  onSubmit,
  onCancel,
}: CreateCardFormProps) => {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CardFormValues>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const tags = useWatch({ control, name: "tags" }) ?? [];
  const images = useWatch({ control, name: "images" }) ?? [];

  async function submitForm(data: CardFormValues) {
    setServerError("");

    try {
      await onSubmit(data);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Failed to save card",
      );
    }
  }

  function handleCancel() {
    setServerError("");

    if (isEditing) {
      onCancel();
      return;
    }

    reset(createEmptyCardFormValues());
  }

  return (
    <section>
      <h1 className={styles.title}>
        {isEditing ? "Edit Card" : "Create New Card"}
      </h1>

      <form
        className={styles.form}
        onSubmit={handleSubmit(submitForm)}
        noValidate
      >
        <div className={styles.columns}>
          <div className={styles.column}>
            <CardFormField label="Title" required error={errors.title?.message}>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Maximum 100 characters",
                  },
                })}
                placeholder="Enter card title"
              />
            </CardFormField>

            <CardFormField
              label="Description"
              required
              error={errors.description?.message}
            >
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 characters",
                  },
                })}
                placeholder="Enter detailed description..."
              />
            </CardFormField>

            <CardFormField
              label="Priority"
              required
              error={errors.priority?.message}
            >
              <select
                {...register("priority", {
                  required: "Please select a priority",
                })}
              >
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </CardFormField>

            <CardFormField label="Status" error={errors.status?.message}>
              <select {...register("status")}>
                <option value="">Select status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </CardFormField>
          </div>

          <div className={styles.column}>
            <CardFormField label="Assignee">
              <select {...register("assignee")}>
                <option value="">Select assignee</option>
                <option value="Alex Johnson">Alex Johnson</option>
                <option value="Sam Williams">Sam Williams</option>
                <option value="Emily Davis">Emily Davis</option>
              </select>
            </CardFormField>

            <CardFormField label="Deadline" error={errors.deadline?.message}>
              <input type="date" {...register("deadline")} />
            </CardFormField>

            <TagsField
              tags={tags}
              onChange={(newTags) =>
                setValue("tags", newTags, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            />

            <ImagesField
              images={images}
              onChange={(newImages) =>
                setValue("images", newImages, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            />
          </div>
        </div>

        {serverError && (
          <p className={styles.serverError} role="alert">
            {serverError}
          </p>
        )}

        <div className={styles.actions}>
          <Button
            typeBtn="Cancel"
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button typeBtn="Apply" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Save Card"
                : "Create Card"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateCardForm;
