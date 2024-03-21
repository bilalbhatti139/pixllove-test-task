import express from "express";
import { register,login,logOut } from "../controllers/auth.js";
import { validateRegisterInput,validateLoginInput } from "../validations/userValidations.js";
import {isAuth} from "../middleware/authorize.js"
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Registers:
 *       type: object
 *       properties:
 *         user_name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a New User
 *     tags: [Auth]
 *     description: 
 *     parameters:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registers'
 *     responses:
 *       201:
 *         description:
 */

router.post("/register",validateRegisterInput, register);

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description:
 */

router.post("/login",validateLoginInput,login);

router.post("/logOut",isAuth, logOut);

export default router;
