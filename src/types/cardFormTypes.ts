export interface CardFormValues {
  title: string;
  description: string;
  priority: "" | "Low" | "Medium" | "High";
  status: "" | "To Do" | "In Progress" | "Done";
  assignee: string;
  deadline: string;
  tags: string[];
  images: File[];
}
