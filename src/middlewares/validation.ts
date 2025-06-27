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
  
export const validateCreateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price")
    .isFloat({ min: 100, max: 1000 })
    .withMessage("Price must be between 100 and 1000"),
];

export const validatePurchase = [
  body("bookId")
    .notEmpty()
    .withMessage("Book ID is required")
    .isMongoId()
    .withMessage("Invalid Book ID"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
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