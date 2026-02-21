import { PizzaService } from "../../services/PizzaService";
import { PizzaBase } from "../../domain/PizzaBase";
import { Ingredient } from "../../domain/Ingredient";

async function chooseBase(
  ask: (question: string) => Promise<string>,
  baseService: any,
) {
  const bases: PizzaBase[] = baseService.getAll();

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

async function chooseIngredients(
  ask: (question: string) => Promise<string>,
  ingredientService: any,
) {
  const ingredients: Ingredient[] = ingredientService.getAll();

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

async function chooseSize(ask: (question: string) => Promise<string>) {
  console.log("1. Маленькая (6)");
  console.log("2. Средняя (8)");
  console.log("3. Большая (12)");

  const choice = await ask("Размер: ");

  if (choice === "1") return 6;
  if (choice === "2") return 8;
  return 12;
}

export async function createSlicedPizza(
  ask: (question: string) => Promise<string>,
  pizzaService: PizzaService,
  ingredientService: any,
  baseService: any,
) {
  const base = await chooseBase(ask, baseService);
  if (!base) return;

  const size = await chooseSize(ask);

  const pizza = pizzaService.createSliced(base, size);

  while (true) {
    console.log("1. Добавить ингредиент к куску");
    console.log("2. Добавить ингредиент к диапазону");
    console.log("0. Готово");

    const choice = await ask("Выберите: ");

    if (choice === "0") break;

    const ingredient = (await chooseIngredients(ask, ingredientService))[0];
    if (!ingredient) continue;

    if (choice === "1") {
      const slice = Number(await ask("Номер куска: "));
      pizza.addIngredientToSlice(slice, ingredient);
    }

    if (choice === "2") {
      const from = Number(await ask("С какого куска: "));
      const to = Number(await ask("По какой кусок: "));
      pizza.addIngredientToRange(from, to, ingredient);
    }
  }

  console.log("Покусочная создана");
  return pizza;
}
