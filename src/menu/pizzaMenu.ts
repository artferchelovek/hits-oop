import { BaseService } from "../services/BaseService";
import { IngredientService } from "../services/IngredientService";
import { PizzaService } from "../services/PizzaService";
import { RegularPizza } from "../domain/RegularPizza";

export async function pizzaMenu(
  ask: (question: string) => Promise<string>,
  pizzaService: PizzaService,
  baseService: BaseService,
  ingredientService: IngredientService,
): Promise<void> {
  async function chooseBase() {
    const bases = baseService.getAll();

    if (bases.length === 0) {
      console.log("Нет доступных основ");
      return null;
    }

    bases.forEach((b, index) =>
      console.log(`${index + 1}. ${b.name} (${b.price})`),
    );

    const choice = Number(await ask("Выберите основу: "));
    return bases[choice - 1];
  }

  async function chooseIngredients() {
    const ingredients = ingredientService.getAll();

    if (ingredients.length === 0) {
      console.log("Нет ингредиентов");
      return [];
    }

    ingredients.forEach((i, index) =>
      console.log(`${index + 1}. ${i.name} (${i.price})`),
    );

    const input = await ask("Введите номера ингредиентов через запятую: ");

    const indexes = input.split(",").map((i) => Number(i.trim()) - 1);

    return indexes.map((i) => ingredients[i]).filter(Boolean);
  }

  async function chooseSize() {
    console.log("1. Маленькая (6)");
    console.log("2. Средняя (8)");
    console.log("3. Большая (12)");

    const choice = await ask("Размер: ");

    if (choice === "1") return 6;
    if (choice === "2") return 8;
    return 12;
  }

  async function createRegularPizza() {
    const name = await ask("Название пиццы: ");
    const base = await chooseBase();
    if (!base) return;

    const size = await chooseSize();
    const ingredients = await chooseIngredients();

    pizzaService.createRegular(name, base, size, ingredients);

    console.log("Пицца создана");
  }

  async function createCombinedPizza() {
    const pizzas = pizzaService.getAll();

    if (pizzas.length < 2) {
      console.log("Нужно минимум 2 пиццы");
      return;
    }

    pizzas.forEach((p, index) =>
      console.log(
        `${index + 1}. ${p.id} | ${p instanceof RegularPizza && p.name} | ${p.price()}`,
      ),
    );

    const leftIndex = Number(await ask("Левая половина: ")) - 1;
    const rightIndex = Number(await ask("Правая половина: ")) - 1;

    const base = await chooseBase();
    if (!base) return;

    const size = await chooseSize();

    pizzaService.createCombined(
      pizzas[leftIndex],
      pizzas[rightIndex],
      base,
      size,
    );

    console.log("Комбинированная создана");
  }

  function showAllPizzas() {
    const pizzas = pizzaService.getAll();

    pizzas.forEach((p) =>
      console.log(
        `${p.id}${p instanceof RegularPizza && ` | ${p.name}`} | Цена: ${p.price()}`,
      ),
    );
  }

  while (true) {
    console.log("\n=== ПИЦЦЫ ===");
    console.log("1. Создать обычную");
    console.log("2. Создать комбинированную");
    console.log("3. Показать все");
    console.log("4. Удалить");
    console.log("0. Назад");

    const choice = await ask("Выберите пункт: ");
    console.clear();

    switch (choice) {
      case "1":
        await createRegularPizza();
        break;
      case "2":
        await createCombinedPizza();
        break;
      case "3":
        showAllPizzas();
        break;
      case "4":
        const id = await ask("Введите ID: ");
        pizzaService.delete(id);
        console.log("Удалено");
        break;
      case "0":
        return;
      default:
        console.log("Неверный ввод");
    }
  }
}
