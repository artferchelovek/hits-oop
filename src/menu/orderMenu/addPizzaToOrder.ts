import { OrderService } from "../../services/OrderService";
import { PizzaService } from "../../services/PizzaService";
import { RegularPizza } from "../../domain/RegularPizza";
import { CombinedPizza } from "../../domain/CombinedPizza";
import { createSlicedPizza } from "./createSlicedPizza";
import { BaseService } from "../../services/BaseService";
import { IngredientService } from "../../services/IngredientService";

export async function addPizzaToOrder(
  ask: (question: string) => Promise<string>,
  orderService: OrderService,
  pizzaService: PizzaService,
  baseService: BaseService,
  ingredientService: IngredientService,
) {
  const orders = orderService.getAll();
  if (orders.length === 0) {
    console.log("Нет заказов");
    return;
  }

  orders.forEach((o, index) =>
    console.log(`${index + 1}. ${o.id} ${o.createdAt}`),
  );

  const orderIndex = Number(await ask("Выберите заказ: ")) - 1;
  const order = orders[orderIndex];
  console.clear();

  if (!order) return;

  const pizzas = pizzaService.getAll();
  if (pizzas.length === 0) {
    console.log("Нет пицц");
    return;
  }

  console.log("1. Выбрать существующую пиццу");
  console.log("2. Создать пиццу 'по кускам'");

  const chose = Number(await ask("Выбрать опцию: "));
  switch (chose) {
    case 1:
      pizzas.forEach((p, index) => {
        if (p instanceof RegularPizza)
          console.log(`${index + 1}. ${p.id} | ${p.name} | ${p.price()}`);
        else if (p instanceof CombinedPizza)
          console.log(
            `${index + 1}. ${p.id} | ${p.left.base.name} + ${p.right.base.name} | ${p.price()}`,
          );
      });

      const pizzaIndex = Number(await ask("Выберите пиццу: ")) - 1;
      const pizza = pizzas[pizzaIndex];

      if (!pizza) return;

      order.addPizza(pizza);
      break;
    case 2:
      const pizza1 = await createSlicedPizza(
        ask,
        pizzaService,
        ingredientService,
        baseService,
      );
      if (pizza1) order.addPizza(pizza1);
      break;
  }

  console.log("Пицца добавлена в заказ");
}
