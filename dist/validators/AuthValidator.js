"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const express_validator_1 = require("express-validator");
class AuthValidator {
    registerUserValidationRules() {
        return [
            (0, express_validator_1.body)('firstName')
                .notEmpty()
                .withMessage('First name is required')
                .isString()
                .withMessage('First name must be a string'),
            (0, express_validator_1.body)('middleName')
                .notEmpty()
                .withMessage('Middle name is required')
                .isString()
                .withMessage('Middle name must be a string'),
            (0, express_validator_1.body)('lastName')
                .notEmpty()
                .withMessage('Last name is required')
                .isString()
                .withMessage('Last name must be a string'),
            (0, express_validator_1.body)('username')
                .notEmpty()
                .withMessage('Username is required')
                .isString()
                .withMessage('Username must be a string'),
            (0, express_validator_1.body)('mobileNumber')
                .notEmpty()
                .withMessage('Mobile number is required')
                .isNumeric()
                .withMessage('Mobile number must be a number'),
            (0, express_validator_1.body)('password')
                .notEmpty()
                .withMessage('Password is required')
                .isString()
                .withMessage('Password must be a string'),
            (0, express_validator_1.body)('confirmPassword')
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
exports.AuthValidator = AuthValidator;
