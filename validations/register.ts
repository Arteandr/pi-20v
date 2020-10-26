import validator from "express-validator";

/* Validation for registration */
export const registerValidations = [
    validator.body('username',"Введите имя пользователя").isString().withMessage('Неверное имя пользователя').isLength({
        min: 4,
        max: 20,
    }).withMessage('Неверный размер имени пользователя. Допустимое количество символов от 4 до 20')
];