import { OrderService } from "../../services/OrderService";
import { RegularPizza } from "../../domain/RegularPizza";
import { CombinedPizza } from "../../domain/CombinedPizza";
import { SlicedPizza } from "../../domain/SlicedPizza";

export function showOrders(orderService: OrderService) {
  const orders = orderService.getAll();

  if (orders.length === 0) {
    console.log("Нет заказов");
    return;
  }

  orders.forEach((o) => {
    console.log("\n------------------");
    console.log("ID:", o.id);
    console.log("Создан:", o.createdAt.toLocaleString());
    console.log("Отложен:", o.scheduledAt?.toLocaleString() ?? "Нет");
    console.log("Комментарий:", o.comment ?? "Нет");
    console.log("Пицц:", o.pizzas.length);
    o.pizzas.forEach((p) => {
      if (p instanceof RegularPizza)
        console.log(`     - ${p.name} | ${p.price()}`);
      else if (p instanceof CombinedPizza)
        console.log(
          `     - ${p.left.base.name} + ${p.right.base.name} | ${p.price()}`,
        );
      else if (p instanceof SlicedPizza) {
        console.log("     - Кусочная пицца");
        console.log(p.showSlices());
      }
    });
    console.log("Общая стоимость:", o.totalPrice);
  });
}
