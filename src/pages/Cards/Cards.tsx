import { useState } from "react";
import CreateCardForm from "../../components/CreateCardForm/CreateCardForm";
import CardPreview from "../../components/CardPreview/CardPreview";
import { type CardFormValues } from "../../types/cardFormTypes";
import {
  createCard,
  createEmptyCardFormValues,
  updateCard,
} from "../../services/createCard";

type ViewMode = "form" | "preview";

const Cards = () => {
  const [view, setView] = useState<ViewMode>("form");
  const [card, setCard] = useState<CardFormValues | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  async function handleSave(data: CardFormValues) {
    if (isEditing) {
      await updateCard(data);
    } else {
      await createCard(data);
    }

    setCard(data);
    setIsEditing(false);
    setView("preview");
  }

  function handleEdit() {
    setIsEditing(true);
    setView("form");
  }

  function handleBackToForm() {
    setIsEditing(false);
    setView("form");
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setView("preview");
  }

  if (view === "preview" && card) {
    return (
      <CardPreview
        card={card}
        onBackToForm={handleBackToForm}
        onEdit={handleEdit}
      />
    );
  }

  return (
    <CreateCardForm
      key={isEditing ? "edit-card" : "new-card"}
      initialValues={isEditing && card ? card : createEmptyCardFormValues()}
      isEditing={isEditing}
      onSubmit={handleSave}
      onCancel={handleCancelEdit}
    />
  );
};

export default Cards;
