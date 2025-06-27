import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateCreateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .isIn(["author", "buyer"])
    .withMessage("Role must be author, or buyer"),

  body('confirmPassword')
    .custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error("Passwords does not match")
        }
        return true
    })  
];

export const validateLoginUser = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
  

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
};