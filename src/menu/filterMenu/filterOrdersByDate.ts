import { FilterService } from "../../services/FilterService";
import { OrderService } from "../../services/OrderService";

export async function filterOrdersByDate(
  ask: (question: string) => Promise<string>,
  orderService: OrderService,
  filterService: FilterService<any>,
) {
  const dateInput = await ask("Введите дату (YYYY-MM-DD): ");
  const targetDate = new Date(dateInput);

  const orders = orderService.getAll();

  const filtered = filterService.filter(orders, (o) => {
    return (
      o.createdAt.getFullYear() === targetDate.getFullYear() &&
      o.createdAt.getMonth() === targetDate.getMonth() &&
      o.createdAt.getDate() === targetDate.getDate()
    );
  });

  if (filtered.length === 0) {
    console.log("Нет заказов на эту дату");
    return;
  }

  filtered.forEach((o) => console.log(`${o.id} | ${o.totalPrice}`));
}
