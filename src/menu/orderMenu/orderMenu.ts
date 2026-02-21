import { OrderService } from "../../services/OrderService";
import { createOrder } from "./createOrder";
import { addPizzaToOrder } from "./addPizzaToOrder";
import { PizzaService } from "../../services/PizzaService";
import { showOrders } from "./showOrders";
import { splitOrder } from "./splitOrder";
import { BaseService } from "../../services/BaseService";
import { IngredientService } from "../../services/IngredientService";

export default async function orderMenu(
  ask: (question: string) => Promise<string>,
  orderService: OrderService,
  pizzaService: PizzaService,
  baseService: BaseService,
  ingredientService: IngredientService,
) {
  while (true) {
    console.log("\n=== ЗАКАЗЫ ===");
    console.log("1. Создать заказ");
    console.log("2. Добавить пиццу в заказ");
    console.log("3. Показать все заказы");
    console.log("4. Разделить заказ по гостям");
    console.log("0. Назад");

    const choice = await ask("Выберите пункт: ");
    console.clear();

    switch (choice) {
      case "1":
        await createOrder(ask, orderService);
        break;
      case "2":
        await addPizzaToOrder(
          ask,
          orderService,
          pizzaService,
          baseService,
          ingredientService,
        );
        break;
      case "3":
        showOrders(orderService);
        break;
      case "4":
        await splitOrder(ask, orderService);
        break;
      case "0":
        return;
      default:
        console.log("Неверный ввод");
    }
  }
}
