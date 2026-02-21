import { AbstractPizza } from "../domain/AbstractPizza";
import { RegularPizza } from "../domain/RegularPizza";
import { PizzaBase } from "../domain/PizzaBase";
import { PizzaSize } from "../domain/enums";
import { Ingredient } from "../domain/Ingredient";
import { Crust } from "../domain/Crust";
import { CombinedPizza } from "../domain/CombinedPizza";
import { SlicedPizza } from "../domain/SlicedPizza";

export class PizzaService {
  private pizzas: AbstractPizza[] = [];

  createRegular(
    name: string,
    base: PizzaBase,
    size: PizzaSize,
    ingredients: Ingredient[],
    crust?: Crust,
  ): RegularPizza {
    const pizza = new RegularPizza(name, base, size, ingredients, crust);
    this.pizzas.push(pizza);
    return pizza;
  }

  createCombined(
    left: AbstractPizza,
    right: AbstractPizza,
    base: PizzaBase,
    size: PizzaSize,
  ): CombinedPizza {
    const pizza = new CombinedPizza(left, right, base, size);
    this.pizzas.push(pizza);
    return pizza;
  }

  createSliced(base: PizzaBase, size: PizzaSize): SlicedPizza {
    return new SlicedPizza(base, size);
  }

  getAll(): AbstractPizza[] {
    return this.pizzas;
  }

  delete(id: string): void {
    this.pizzas = this.pizzas.filter((p) => p.id !== id);
  }
}
