import { AbstractPizza } from "./AbstractPizza";
import { Ingredient } from "./Ingredient";
import { PizzaBase } from "./PizzaBase";
import { PizzaSize } from "./enums";

export class SlicedPizza extends AbstractPizza {
  private slices: Map<number, Ingredient[]> = new Map();

  constructor(base: PizzaBase, size: PizzaSize) {
    super(base, size);

    for (let i = 1; i <= size; i++) {
      this.slices.set(i, []);
    }
  }

  addIngredientToSlice(slice: number, ingredient: Ingredient) {
    this.slices.get(slice)?.push(ingredient);
  }

  addIngredientToRange(from: number, to: number, ingredient: Ingredient) {
    for (let i = from; i <= to; i++) {
      this.addIngredientToSlice(i, ingredient);
    }
  }

  showSlices() {
    return Array.from(this.slices.entries())
      .map(([sliceNumber, ingredients]) => {
        if (ingredients.length === 0) {
          return `кусок ${sliceNumber}: пусто`;
        }
        const ingredientInfo = ingredients
          .map((ing) => `${ing.name} (${ing.price})`)
          .join(", ");
        return `кусок ${sliceNumber}: ${ingredientInfo}`;
      })
      .join("\n");
  }

  price(): number {
    let sum = this.base.price;

    for (const ingredient of this.slices.values()) {
      sum += ingredient.reduce((s, p) => s + p.price, 0);
    }

    return sum;
  }
}
