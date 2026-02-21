import readline from "readline";
import { IngredientService } from "./services/IngredientService";
import { BaseService } from "./services/BaseService";
import { PizzaService } from "./services/PizzaService";
import { OrderService } from "./services/OrderService";
import { ingredientMenu } from "./menu/ingredientMenu";
import { baseMenu } from "./menu/baseMenu";
import { pizzaMenu } from "./menu/pizzaMenu";
import orderMenu from "./menu/orderMenu/orderMenu";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ingredientService = new IngredientService();
const baseService = new BaseService();
const pizzaService = new PizzaService();
const orderService = new OrderService();

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

async function mainMenu(): Promise<void> {
  while (true) {
    console.clear();
    console.log("\n=== ГЛАВНОЕ МЕНЮ ===");
    console.log("1. Ингредиенты");
    console.log("2. Основы");
    console.log("3. Пиццы");
    console.log("4. Заказы");
    console.log("0. Выход");

    const choice = await ask("Выберите пункт: ");
    console.clear();

    switch (choice) {
      case "1":
        await ingredientMenu(ask, ingredientService);
        break;
      case "2":
        await baseMenu(ask, baseService);
        break;
      case "3":
        await pizzaMenu(ask, pizzaService, baseService, ingredientService);
        break;
      case "4":
        await orderMenu(
          ask,
          orderService,
          pizzaService,
          baseService,
          ingredientService,
        );
        break;
      case "0":
        rl.close();
        return;
      default:
        console.log("Неверный ввод");
    }
  }
}

mainMenu();
