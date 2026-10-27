import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import styles from "./CreateCardForm.module.css";
import type { CardFormValues } from "../../types/cardFormTypes";
import { createCard } from "../../services/createCard";
import CardFormField from "../CardFormField/CardFormField";
import TagsField from "../TagsField/TagsField";
import ImagesField from "../ImagesField/ImagesField";
import Button from "../Button/Button";

const defaultValues: CardFormValues = {
  title: "",
  description: "",
  priority: "",
  status: "",
  assignee: "",
  deadline: "",
  tags: [],
  images: [],
};

const CreateCardForm = () => {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CardFormValues>({
    defaultValues,
    mode: "onBlur",
  });

  const tags = useWatch({
    control,
    name: "tags",
  });

  const images = useWatch({
    control,
    name: "images",
  });

  async function onSubmit(data: CardFormValues) {
    setServerError("");

    try {
      await createCard(data);

      alert(
        JSON.stringify(
          {
            ...data,
            images: data.images.map((file) => file.name),
          },
          null,
          2,
        ),
      );

      reset(defaultValues);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Failed to create card",
      );
    }
  }

  function handleCancel() {
    reset(defaultValues);
    setServerError("");
  }

  return (
    <section>
      <h1 className={styles.title}>Create New Card</h1>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles.columns}>
          <div className={styles.column}>
            <CardFormField label="Title" required error={errors.title?.message}>
              <input
                {...register("title", {
                  required: "Title is required",
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
              <input
                type="date"
                {...register("deadline", {
                  validate: (value) =>
                    !value ||
                    /^\d{4}-\d{2}-\d{2}$/.test(value) ||
                    "Please enter a valid date",
                })}
              />
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
            typeBtn="cancel"
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button typeBtn="apply" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Card"}
          </Button>
        </div>
      </form>
    </section>
  );
};
export default CreateCardForm;
