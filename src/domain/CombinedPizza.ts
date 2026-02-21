import { AbstractPizza } from "./AbstractPizza";
import { PizzaSize } from "./enums";
import { PizzaBase } from "./PizzaBase";

export class CombinedPizza extends AbstractPizza {
  constructor(
    public left: AbstractPizza,
    public right: AbstractPizza,
    base: PizzaBase,
    size: PizzaSize,
  ) {
    super(base, size);
  }

  price(): number {
    return (this.left.price() + this.right.price()) / 2;
  }
}
