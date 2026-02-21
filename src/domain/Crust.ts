import { Ingredient } from "./Ingredient";

export class Crust {
  readonly id: string;

  constructor(
    public name: string,
    public ingredients: Ingredient[],
    public allowPizzaId?: string[],
  ) {
    this.id = crypto.randomUUID();
  }

  get price(): number {
    return this.ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0,
    );
  }
}
