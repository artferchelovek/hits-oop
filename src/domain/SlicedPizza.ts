import { AbstractPizza } from "./AbstractPizza";
import { Ingredient } from "./Ingredient";
import { PizzaBase } from "./PizzaBase";
import { PizzaSize } from "./enums";

export class SlicedPizza extends AbstractPizza {
  private slices: Map<number, Ingredient[]> = new Map();

  constructor(base: PizzaBase, size: PizzaSize) {
    super(base, size);
  }

  addIngredientToSlice(slice: number, ingredient: Ingredient) {
    this.slices.get(slice)?.push(ingredient);
  }

  addIngredientToRange(from: number, to: number, ingredient: Ingredient) {
    for (let i = from; i <= to; i++) {
      this.addIngredientToSlice(i, ingredient);
    }
  }

  price(): number {
    let sum = this.base.price;

    for (const ingredient of this.slices.values()) {
      sum += ingredient.reduce((s, p) => s + p.price, 0);
    }

    return sum;
  }
}
