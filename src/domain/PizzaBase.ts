export class PizzaBase {
  readonly id: string;

  constructor(
    public name: string,
    public price: number,
  ) {
    this.id = crypto.randomUUID();
  }
}
