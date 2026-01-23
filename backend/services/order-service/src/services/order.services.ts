import { OrderRepository } from "@/repository/order.repository";

export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) { }
}