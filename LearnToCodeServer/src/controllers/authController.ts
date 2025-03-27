import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import User from "../models/User";
import bcrypt from "bcrypt";
import { AppError } from "../utils/errors";
import { sendSuccessResponse } from "../utils/sendSuccessResponse";


export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    sendSuccessResponse(res, 201, "Signup Successful")
  } catch (error) {
    next(error);
  }
};

export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("No user exists with that email", 400);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Incorrect Password", 400);
    }

    // Authenticate User
    const token = jwt.sign({
      id: user._id,
      email: user.email
    }, process.env.JWT_SECRET!, { expiresIn: '1h'})

    sendSuccessResponse(res, 200, "Sign In Successful", token)
  } catch (error) {
    next(error);
  }
};
