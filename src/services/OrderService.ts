import { Order } from "../domain/Order";
import { AbstractPizza } from "../domain/AbstractPizza";

export class OrderService {
  private orders: Order[] = [];

  create(): Order {
    const order = new Order();
    this.orders.push(order);
    return order;
  }

  addPizza(orderId: string, pizza: AbstractPizza): void {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) throw new Error("Заказ не найден");

    order.addPizza(pizza);
  }

  getAll(): Order[] {
    return this.orders;
  }
}
