import { BaseService } from "../services/BaseService";

export async function baseMenu(
  ask: (question: string) => Promise<string>,
  baseService: BaseService,
) {
  while (true) {
    console.log("\n===ОСНОВА===");
    console.log("1. Создать");
    console.log("2. Показать все");
    console.log("3. Удалить");
    console.log("0. Назад");

    const bases = baseService.getAll();

    const choice = await ask("Выберите пункт: ");
    console.clear();

    switch (choice) {
      case "1":
        const name = await ask("Название: ");
        const price = Number(await ask("Цена: "));
        try {
          baseService.create(name, price);
          console.log("Основа создана");
        } catch (error: any) {
          console.log(error.message);
        }
        break;
      case "2":
        bases.forEach((b) => console.log(`${b.id} | ${b.name} | ${b.price}`));
        break;
      case "3":
        if (bases.length > 0) {
          bases.forEach((b) => console.log(`${b.id} | ${b.name} | ${b.price}`));
          const id = await ask("Введите ID: ");
          baseService.delete(id);
          console.log("Удалено");
        } else {
          console.log("Нет созданных основ");
        }
        break;
      case "0":
        return;

      default:
        console.log("Неверный ввод");
    }
  }
}
