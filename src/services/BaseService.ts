import { PizzaBase } from "../domain/PizzaBase";

export class BaseService {
  private bases: PizzaBase[] = [];

  create(name: string, price: number) {
    if (name !== "Классическая") {
      const classic = this.bases.find((base) => base.name === name);

      if (!classic) {
        throw new Error("Сначала нужно создать классическую");
      }

      if (price > classic.price * 1.2) {
        throw new Error(`Снизьте цену на на ${classic.price * 1.2 - price}`);
      }
    }

    const base = new PizzaBase(name, price);
    this.bases.push(base);
    return base;
  }

  update(id: string, name: string, price: number) {
    const base = this.bases.find((base) => base.name === name);

    if (!base) {
      throw new Error("Такого основания нет");
    }

    base.name = name;
    base.price = price;
  }

  delete(baseId: string) {
    this.bases = this.bases.filter((b) => b.id === baseId);
  }

  getAll() {
    return this.bases;
  }
}
