import { IngredientService } from "../services/IngredientService";

export async function ingredientMenu(
  ask: (question: string) => Promise<string>,
  ingredientService: IngredientService,
) {
  while (true) {
    console.log("\n=== ИНГРЕДИЕНТЫ ===");
    console.log("1. Создать");
    console.log("2. Показать все");
    console.log("3. Удалить");
    console.log("0. Назад");

    const choice = await ask("Выберите пункт: ");
    console.clear();

    switch (choice) {
      case "1":
        const name = await ask("Название: ");
        const price = Number(await ask("Цена: "));
        ingredientService.create(name, price);
        console.log("Ингредиент создан");
        break;

      case "2":
        const ingredients = ingredientService.getAll();
        ingredients.forEach((i) =>
          console.log(`${i.id} | ${i.name} | ${i.price}`),
        );
        break;

      case "3":
        const list = ingredientService.getAll();
        if (list.length > 0) {
          list.forEach((i) => console.log(`${i.id} | ${i.name} | ${i.price}`));
          const id = await ask("Введите ID: ");
          ingredientService.delete(id);
          console.log("Удалено");
        } else {
          console.log("Нет созданных ингредиентов");
        }
        break;

      case "0":
        return;

      default:
        console.log("Неверный ввод");
    }
  }
}
