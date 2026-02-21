import { AbstractPizza } from "./AbstractPizza";

export class Order {
  readonly id: string;
  public pizzas: AbstractPizza[] = [];
  public comment?: string;
  public addAt?: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }

  addPizza(pizza: AbstractPizza) {
    this.pizzas.push(pizza);
  }

  getTotalPrice(): number {
    return this.pizzas.reduce((s, p) => s + p.price(), 0);
  }
}
