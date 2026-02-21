import { AbstractPizza } from "./AbstractPizza";
import { PizzaBase } from "./PizzaBase";
import { PizzaSize } from "./enums";
import { Ingredient } from "./Ingredient";
import { Crust } from "./Crust";

export class RegularPizza extends AbstractPizza {
  constructor(
    public name: string,
    base: PizzaBase,
    size: PizzaSize,
    public ingredients: Ingredient[],
    public crust?: Crust,
  ) {
    super(base, size);
  }

  price(): number {
    const ingredientPrice = this.ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0,
    );
    const crustPrice = this.crust?.price ?? 0;
    return this.base.price + ingredientPrice + crustPrice;
  }
}
