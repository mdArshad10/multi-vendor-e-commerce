import { env } from "@/config/env";
import { UserController } from "@/controllers/user.controller";
import { ProductRepository } from "@/repository/product.repository";
import { SellerRepository } from "@/repository/seller.repository";
import { ShopRepository } from "@/repository/shop.respository";
import { UserRepository } from "@/repository/user.repository";
import UserService from "@/services/user.services";
import { SellerVerifySchema } from "@/validation/seller.validation";
import { createShopSchema } from "@/validation/shop.validation";
import { userForgotPasswordOtpSchema, userForgotPasswordSchema, userLoginSchema, userRegisterSchema, userVerifySchema } from "@/validation/user.validation";
import { asyncHandler, validateRequest } from "@multi-vendor-e-commerce/common";
import { InternalAuthMiddleware, IsSeller, IsUser } from "@multi-vendor-e-commerce/common/src/middlewares";
import { Router } from "express";
import Stripe from "stripe";

const router: Router = Router();

const user = new UserRepository();
const product = new ProductRepository();
const seller = new SellerRepository();
const shop = new ShopRepository();
const strip = new Stripe(env.STRIPE_SECRET_KEY);

const service = new UserService(user, product, seller, shop, strip);
const userController = new UserController(service);
const internalAuthMiddleware = InternalAuthMiddleware(env.INTERNAL_TOKEN_SECRET)

router.route("/register").post(validateRequest({ body: userRegisterSchema.shape.body }), asyncHandler(userController.register.bind(userController)))

router.route("/verify").post(validateRequest({ body: userVerifySchema.shape.body }), asyncHandler(userController.verifyUser.bind(userController)))

router.route("/login").post(validateRequest({ body: userLoginSchema.shape.body }), asyncHandler(userController.loginUser.bind(userController)))

router.route("/logout").post(internalAuthMiddleware, IsUser, asyncHandler(userController.logoutUser.bind(userController)))

router.route("/forgot-password").post(validateRequest({ body: userForgotPasswordSchema.shape.body }), asyncHandler(userController.forgotPassword.bind(userController)))

router.route("/verify-forgot-password-otp").post(validateRequest({ body: userForgotPasswordOtpSchema.shape.body }), asyncHandler(userController.verifyForgotPasswordOtp.bind(userController)))

router.route("/update-password").post(validateRequest({ body: userForgotPasswordSchema.shape.body }), asyncHandler(userController.updatePassword.bind(userController)))

router.route("/me").get(internalAuthMiddleware, asyncHandler(userController.getUserDetail.bind(userController)))


router.route("/register-seller").post(validateRequest({ body: userRegisterSchema.shape.body }), asyncHandler(userController.registerSeller.bind(userController)))

router.route("/verify-seller").post(validateRequest({ body: SellerVerifySchema.shape.body }), asyncHandler(userController.verifySeller.bind(userController)))
router.route('/login-seller').post(validateRequest({ body: userLoginSchema.shape.body }), asyncHandler(userController.loginSeller.bind(userController)))
router.route('/login-seller').post(internalAuthMiddleware, IsSeller, asyncHandler(userController.logoutSeller.bind(userController)))

router.route("/create-shop").post(validateRequest({ body: createShopSchema.shape.body }), asyncHandler(userController.createShop.bind(userController)))
router.route('/connect-bank').post(asyncHandler(userController.connectStripAccount.bind(userController)))


export default router;
