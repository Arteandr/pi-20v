import { body } from 'express-validator';

/* Validation for registration */
export const createTaskValidations = [
    body('text', 'Введите текст задания')
        .isString()
        .isLength({
            max: 280,
        })
        .withMessage('Максимальная длина задания 280 символов'),
];
