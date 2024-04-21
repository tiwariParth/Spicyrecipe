import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
const zod = require("zod");

const registerUserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  username: zod.string(),
});

export const registerUser = async (req: Request, res: Response) => {
  const { success } = registerUserSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, process.env.JWT_SECRET!, (err, token) => {
      if (err) throw err;
      
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
