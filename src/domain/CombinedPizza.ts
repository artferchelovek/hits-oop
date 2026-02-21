import { AbstractPizza } from "./AbstractPizza";
import { PizzaSize } from "./enums";

export class CombinedPizza extends AbstractPizza {
  constructor(
    public left: AbstractPizza,
    public right: AbstractPizza,
    size: PizzaSize,
  ) {
    super(left.base, size);
  }

  price(): number {
    return (this.left.price() + this.right.price()) / 2;
  }
}
