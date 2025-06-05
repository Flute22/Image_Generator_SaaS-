import { Router } from "express";
import { registerUser, loginUser, userCredits } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/credits").post(verifyJWT, userCredits);

export default router;
