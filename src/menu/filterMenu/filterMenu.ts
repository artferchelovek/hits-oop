import { PizzaService } from "../../services/PizzaService";
import { FilterService } from "../../services/FilterService";
import { filterPizzasByIngredient } from "./filterPizzasByIngredient";
import { OrderService } from "../../services/OrderService";
import { filterOrdersByDate } from "./filterOrdersByDate";

export async function filterMenu(
  ask: (question: string) => Promise<string>,
  pizzaService: PizzaService,
  orderService: OrderService,
): Promise<void> {
  const filterService = new FilterService<any>();
  while (true) {
    console.log("\n=== ФИЛЬТРАЦИЯ ===");
    console.log("1. Пиццы по ингредиенту");
    console.log("2. Заказы по дате");
    console.log("0. Назад");

    const choice = await ask("Выберите пункт: ");

    switch (choice) {
      case "1":
        await filterPizzasByIngredient(ask, pizzaService, filterService);
        break;
      case "2":
        await filterOrdersByDate(ask, orderService, filterService);
        break;
      case "0":
        return;
      default:
        console.log("Неверный ввод");
    }
  }
}
