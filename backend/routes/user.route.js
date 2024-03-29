import { Router } from "express";
import { google, signin, signup } from "../controllers/user.controller.js";

const router=Router();

router.post("/signup",signup)
router.post("/sigin",signin)
router.post("/google",google)

export default router