import { FilterService } from "../../services/FilterService";

export async function filterPizzasByIngredient(
  ask: (question: string) => Promise<string>,
  pizzaService: any,
  filterService: FilterService<any>,
) {
  const name = await ask("Введите название ингредиента: ");

  const pizzas = pizzaService.getAll();

  const filtered = filterService.filter(pizzas, (p) => {
    if ("ingredients" in p) {
      return p.ingredients?.some((i: any) => i.name === name);
    }

    if ("slices" in p) {
      return Array.from(p["slices"].values())
        .flat()
        .some((i: any) => i.name === name);
    }

    return false;
  });

  if (filtered.length === 0) {
    console.log("Ничего не найдено");
    return;
  }

  filtered.forEach((p) => console.log(`${p.id} | Цена: ${p.price()}`));
}
