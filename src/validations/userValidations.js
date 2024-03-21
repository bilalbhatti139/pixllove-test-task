import { body } from "express-validator";
import Users from "../models/auth.js";
import { BadRequestError, UnauthorizedError } from "../sender/customErrors.js";
import { withValidationErrors } from "../middleware/validation.js";

const validateRegisterInput = withValidationErrors([
    body("user_name").notEmpty().withMessage("user_name is required"),
    body("email")
        .notEmpty()
        .withMessage("email is required")
        .custom(async (email, { req }) => {
            if (!email) {
                throw new BadRequestError("Email is required");
            }
            const user = await Users.findOne({ email });
            if (user) {
                throw new BadRequestError("Email is already in use !! Try Another one");
            }
        }),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
]);

const validateLoginInput = withValidationErrors([
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .custom(async (password, { req }) => {
            const { email } = req.body;
            if (!email) {
                throw new BadRequestError("Email is required");
            }
            // Find the user by email
            const user = await Users.findOne({ email });
            // Check if the user exists
            if (!user) {
                throw new UnauthorizedError("User not Exist!");
            }
        }),
]);

export {
    validateRegisterInput,
    validateLoginInput,
};
