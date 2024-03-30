import { Router } from "express";
import { google, signin, signup ,signout } from "../controllers/user.controller.js";

const router=Router();

router.post("/signup",signup)
router.post("/signin",signin)
router.post("/signout",signout)
router.post("/google",google)

export default router