export interface CardImage {
  id: string;
  name: string;
  file: File;
  preview: string;
}

export type CardPriority = "" | "Low" | "Medium" | "High";

export type CardStatus = "" | "To Do" | "In Progress" | "Done";

export interface CardFormValues {
  title: string;
  description: string;
  priority: CardPriority;
  status: CardStatus;
  assignee: string;
  deadline: string;
  tags: string[];
  images: CardImage[];
}


