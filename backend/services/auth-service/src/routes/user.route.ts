import { UserController } from "@/controllers/user.controller";
import { UserRepository } from "@/repository/user.repository";
import UserService from "@/services/user.services";
import { userForgotPasswordOtpSchema, userForgotPasswordSchema, userLoginSchema, userRegisterSchema, userVerifySchema } from "@/validation/user.validation";
import { asyncHandler, validateRequest } from "@multi-vendor-e-commerce/common";
import { Router } from "express";

const router: Router = Router();

const service = new UserService(new UserRepository())
const userController = new UserController(service);

router.route("/register").post(validateRequest({ body: userRegisterSchema.shape.body }), asyncHandler(userController.register.bind(userController)))

router.route("/verify").post(validateRequest({ body: userVerifySchema.shape.body }), asyncHandler(userController.verifyUser.bind(userController)))

router.route("/login").post(validateRequest({ body: userLoginSchema.shape.body }), asyncHandler(userController.loginUser.bind(userController)))

router.route("/forgot-password").post(validateRequest({ body: userForgotPasswordSchema.shape.body }), asyncHandler(userController.forgotPassword.bind(userController)))

router.route("/verify-forgot-password-otp").post(validateRequest({ body: userForgotPasswordOtpSchema.shape.body }), asyncHandler(userController.verifyForgotPasswordOtp.bind(userController)))

router.route("/update-password").post(validateRequest({ body: userForgotPasswordSchema.shape.body }), asyncHandler(userController.updatePassword.bind(userController)))


export default router;
