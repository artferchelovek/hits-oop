import { Order } from "../domain/Order";

export class OrderService {
  private orders: Order[] = [];

  create(comment?: string, scheduledAt?: Date): Order {
    const order = new Order();
    order.comment = comment;
    order.scheduledAt = scheduledAt;

    this.orders.push(order);
    return order;
  }

  getById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  getAll(): Order[] {
    return this.orders;
  }
}
