import { Router, Request, Response, NextFunction } from "express";
import { User } from "src/models/user";
import jwt, { sign } from "jsonwebtoken";
const router = Router();

router.post(
  "./signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return next(new Error("user with the same email alreaddy exists"));

    const newUser = new User({
      email,
      password,
    });

    await newUser.save();
    req.session = {
      jwt: sign({ email, userId: newUser._id }, process.env.JWT_KEY!),
    };
    res.status(201).send(newUser);
  }
);

export { router as signupRouter };
