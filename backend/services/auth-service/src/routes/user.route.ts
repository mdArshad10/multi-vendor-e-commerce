import { env } from "@/config/env";
import { UserController } from "@/controllers/user.controller";
import { ProductRepository } from "@/repository/product.repository";
import { SellerRepository } from "@/repository/seller.repository";
import { UserRepository } from "@/repository/user.repository";
import UserService from "@/services/user.services";
import { userForgotPasswordOtpSchema, userForgotPasswordSchema, userLoginSchema, userRegisterSchema, userVerifySchema } from "@/validation/user.validation";
import { asyncHandler, validateRequest } from "@multi-vendor-e-commerce/common";
import { InternalAuthMiddleware } from "@multi-vendor-e-commerce/common/src/middlewares";
import { Router } from "express";
import Stripe from "stripe";

const router: Router = Router();

const user = new UserRepository();
const product = new ProductRepository();
const seller = new SellerRepository();
const strip = new Stripe("adafsdfasdfadsfadsf");

const service = new UserService(user, product, seller, strip);
const userController = new UserController(service);

router.route("/register").post(validateRequest({ body: userRegisterSchema.shape.body }), asyncHandler(userController.register.bind(userController)))

router.route("/verify").post(validateRequest({ body: userVerifySchema.shape.body }), asyncHandler(userController.verifyUser.bind(userController)))

router.route("/login").post(validateRequest({ body: userLoginSchema.shape.body }), asyncHandler(userController.loginUser.bind(userController)))

router.route("/forgot-password").post(validateRequest({ body: userForgotPasswordSchema.shape.body }), asyncHandler(userController.forgotPassword.bind(userController)))

router.route("/verify-forgot-password-otp").post(validateRequest({ body: userForgotPasswordOtpSchema.shape.body }), asyncHandler(userController.verifyForgotPasswordOtp.bind(userController)))

router.route("/update-password").post(validateRequest({ body: userForgotPasswordSchema.shape.body }), asyncHandler(userController.updatePassword.bind(userController)))

router.route("/me").get(InternalAuthMiddleware(env.INTERNAL_TOKEN_SECRET), asyncHandler(userController.getUserDetail.bind(userController)))


export default router;
