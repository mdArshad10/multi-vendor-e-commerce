import UserService from "@/services/user.services";
import { HttpResponse } from "@multi-vendor-e-commerce/common";
import { NextFunction, Request, Response } from "express";


export class UserController {
   constructor(
      private readonly service: UserService,
   ) { }

   async register(req: Request, res: Response, next: NextFunction) {
      try {
         const { name, email } = req.body;
         await this.service.registerUser(email, name);
         res.status(201).json(
            new HttpResponse("User registered successfully", 201, null)
         )
      } catch (error) {
         next(error)
      }
   }

   async verifyUser(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, otp, password, name } = req.body;
         const user = await this.service.verifyUser(email, otp, password, name);
         res.status(201).json(
            HttpResponse.created(user)
         )
      } catch (error) {
         next(error)
      }
   }

   async loginUser(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;
         const user = await this.service.loginUser(email, password);
         res.cookie("accessToken", user.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 60 * 1000,
            path: "/"
         })
         res.cookie("refreshToken", user.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 60 * 1000,
            path: "/"
         })
         res.status(200).json(
            HttpResponse.success({ data: { id: user.user.id, email: user.user.email } }, "login successfully")
         )
      } catch (error) {
         next(error)
      }
   }

   async forgotPassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;
         await this.service.forgotPassword(email, 'user');
         res.status(200).json(
            HttpResponse.success(null, "OTP sent successfully, plz verify your acccount")
         )
      } catch (error) {
         next(error)
      }
   }

   async updatePassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;
         await this.service.updatePassword(email, password);
         res.status(200).json(
            HttpResponse.success(null, "Password updated successfully")
         )
      } catch (error) {
         next(error)
      }
   }

   async verifyForgotPasswordOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, otp } = req.body;
         await this.service.verifyForgotPasswordOtp(email, otp, 'user');
         res.status(200).json(
            HttpResponse.success(null, "OTP verified successfully")
         )
      } catch (error) {
         next(error)
      }
   }

   async getUserDetail(req: Request, res: Response, next: NextFunction) {
      try {
         const id = req.user.id as string;
         const user = await this.service.getUser(id);
         res.status(200).json(
            new HttpResponse("get user detail", 200, user)
         )
      } catch (error) {
         next(error)
      }
   }

   async logoutUser(req: Request, res: Response, next: NextFunction) {
      try {
         res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
         });
         res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
         });
         res.status(200).json(
            new HttpResponse("logout successfully", 200, null)
         )
      } catch (error) {
         next(error)
      }
   }

}