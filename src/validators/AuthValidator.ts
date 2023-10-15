import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

export class AuthValidator {
  public registerUserValidationRules(): ValidationChain[] {
    return [
        body('firstName')
            .notEmpty()
            .withMessage('First name is required')
            .isString()
            .withMessage('First name must be a string'),
        body('middleName')
            .notEmpty()
            .withMessage('Middle name is required')
            .isString()
            .withMessage('Middle name must be a string'),
        body('lastName')
            .notEmpty()
            .withMessage('Last name is required')
            .isString()
            .withMessage('Last name must be a string'),
        body('username')
            .notEmpty()
            .withMessage('Username is required')
            .isString()
            .withMessage('Username must be a string'),
        body('mobileNumber')
            .notEmpty()
            .withMessage('Mobile number is required')
            .isNumeric()
            .withMessage('Mobile number must be a number'),
        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isString()
            .withMessage('Password must be a string'),
        body('confirmPassword')
            .notEmpty()
            .withMessage('Confirm password is required')
            .isString()
            .withMessage('Confirm password must be a string')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation does not match password');
                }
                return true;
            }),
    ];
  }
}