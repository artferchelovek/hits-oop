import { AbstractPizza } from "./AbstractPizza";

export class Order {
  readonly id: string;
  public pizzas: AbstractPizza[] = [];
  public comment?: string;
  public createdAt: Date;
  public scheduledAt?: Date;

  constructor() {
    this.id = crypto.randomUUID();
    this.createdAt = new Date();
  }

  addPizza(pizza: AbstractPizza) {
    this.pizzas.push(pizza);
  }

  get totalPrice(): number {
    return this.pizzas.reduce((s, p) => s + p.price(), 0);
  }
}
