import { OrderService } from "../../services/OrderService";
import { splitBetweenGuests } from "../../utils/splitBetweenGuests";

export async function splitOrder(
  ask: (question: string) => Promise<string>,
  orderService: OrderService,
) {
  const orders = orderService.getAll();
  if (orders.length === 0) {
    console.log("Нет заказов");
    return;
  }

  orders.forEach((o, index) =>
    console.log(`${index + 1}. ${o.id} | ${o.totalPrice}`),
  );

  const index = Number(await ask("Выберите заказ: ")) - 1;
  const order = orders[index];
  if (!order) return;

  const guests = Number(await ask("Количество гостей: "));
  const result = splitBetweenGuests(order.totalPrice, guests);

  console.log("Разделение:");
  result.forEach((amount, i) => console.log(`Гость ${i + 1}: ${amount}`));
}
