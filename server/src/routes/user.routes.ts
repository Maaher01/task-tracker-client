import { Router } from "express";
import { login, signup, forgotPassword } from "../controllers/userController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/forgotpassword", forgotPassword);

export default router;
