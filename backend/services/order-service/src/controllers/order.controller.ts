import { OrderService } from "@/services/order.services";
import { HttpResponse } from "@multi-vendor-e-commerce/common";
import { NextFunction, Request, Response } from "express";


export class OrderController{
    constructor(
        private readonly orderService:OrderService
    ){}
}