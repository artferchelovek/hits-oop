import { PizzaBase } from "./PizzaBase";
import { PizzaSize } from "./enums";

export abstract class AbstractPizza {
  readonly id: string;

  constructor(
    public base: PizzaBase,
    public size: PizzaSize,
  ) {
    this.id = crypto.randomUUID();
  }

  abstract price(): number;
}
