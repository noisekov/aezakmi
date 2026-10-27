import type { CardFormValues } from "../types/cardFormTypes";

export async function createCard(data: CardFormValues): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 700);
  });

  console.log("Cards data", data);
}
