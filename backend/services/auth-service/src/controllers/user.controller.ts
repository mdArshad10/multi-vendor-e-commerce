import UserService from "@/services/user.services";
import { asyncHandler, HttpResponse } from "@multi-vendor-e-commerce/common";
import { NextFunction, Request, Response } from "express";


export class UserController {
   constructor(
      private readonly service: UserService,
   ) { }

   async register(req: Request, res: Response, next: NextFunction) {
      try {
         const { name, email } = req.body;
         await this.service.registerUser(name, email);
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
            maxAge: 15 * 60 * 60 * 1000
         })
         res.cookie("refreshToken", user.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 60 * 1000
         })
         res.status(200).json(
            HttpResponse.success({ data: { id: user.user.id, email: user.user.email } }, "login successfully")
         )
      } catch (error) {
         next(error)
      }
   }

}