import type { CardFormValues } from "../types/cardFormTypes";

function simulateRequest(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}

export async function createCard(data: CardFormValues): Promise<void> {
  await simulateRequest();
  console.log("Create card:", data);
}

export async function updateCard(data: CardFormValues): Promise<void> {
  await simulateRequest();
  console.log("Update card:", data);
}

export function createEmptyCardFormValues(): CardFormValues {
  return {
    title: "",
    description: "",
    priority: "",
    status: "",
    assignee: "",
    deadline: "",
    tags: [],
    images: [],
  };
}
