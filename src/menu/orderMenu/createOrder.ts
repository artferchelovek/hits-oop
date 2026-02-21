import { OrderService } from "../../services/OrderService";

export async function createOrder(
  ask: (question: string) => Promise<string>,
  orderService: OrderService,
) {
  const comment = await ask("Комментарий (можно пусто): ");
  const isScheduled = await ask("Отложенный заказ? (y/n): ");

  let scheduledAt: Date | undefined;

  if (isScheduled.toLowerCase() === "y") {
    const dateInput = await ask("Введите дату (YYYY-MM-DD HH:MM): ");
    scheduledAt = new Date(dateInput);
  }

  const order = orderService.create(comment || undefined, scheduledAt);

  console.log("Заказ создан:", order.id);
}
