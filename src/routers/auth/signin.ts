import { Router, Request, Response, NextFunction } from "express";
import { User } from "src/models/user";

const router = Router();

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new Error("Wrong credential"));
  }
);

export { router as signinRouter };
