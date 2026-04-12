import express from "express";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.model.js";
import asyncHandler from "./../utils/asyncHandler.js";
import { loginSchema, registerSchema } from "../validator/auth.validator.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { success } from "zod";
import generateRessetToken from "../utils/generateResetToken.js";

const router = express.Router();

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const parseData = registerSchema.safeParse(req.body);

    if (!parseData.success) {
      const errors = parseData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ExpressError(errors, 400);
    }
    const { email, fullName, password } = parseData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ExpressError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    await newUser.save();
    const token = generateToken(newUser._id);
    res.status(200).json({
      success: true,
      message: "User registered succesfully!!",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  }),
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const parseData = loginSchema.safeParse(req.body);
    if (!parseData.success) {
      const errors = parseData.error.issues
        .map((err) => err.message)
        .join(", ");
      throw new ExpressError(errors, 400);
    }

    const { email, password } = parseData.data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ExpressError("Email is not found!!", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ExpressError("Invalid Password", 400);
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  }),
);

router.post(
  "/forget-password",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ExpressError("User not found!!", 404);
    }
    const resetToken = generateRessetToken(user._id);
    User.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();
    const resetLink = `http:localhost:/reset-password/${resetToken}`;
    res.status(200).json({
      success: true,
      message: "password reset token generated",
      resetLink,
    });
  }),
);

router.post(
  "/reset-password/:token",
  asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      throw new ExpressError("Password is required", 400);
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    } catch (error) {
      throw new ExpressError("Invalid or expired token", 400);
    }

    const user = await User.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      throw new ExpressError("Invalid or expired token", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  }),
);
export default router;
