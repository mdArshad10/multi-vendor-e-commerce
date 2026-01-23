import { OrderController } from "@/controllers/order.controller";
import { OrderRepository } from "@/repository/order.repository";
import { OrderService } from "@/services/order.services";
import { asyncHandler, validateRequest } from "@multi-vendor-e-commerce/common";
import { Router } from "express";

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService)


const router: Router = Router();

router.route('/create-discount').post()


export default router;
