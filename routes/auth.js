import express from "express";
import { login, register, resetPassword, sendEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);

// //Register as Super Admin
// router.post("/register-sa", registerSuperAdmin);

//Login
router.post("/login", login);

// send reset
router.post("/send-email", sendEmail)

// reset pass
router.post("/reset-password", resetPassword)

export default router;