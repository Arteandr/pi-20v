import { body } from 'express-validator';

/* Validation for registration */
export const createContactValidations = [
    body('firstName', 'Введите имя')
        .isString()
        .isLength({
            min: 1,
        })
        .withMessage('Минимальная длина имени 1 символ'),

    body('lastName', 'Введите фамилию')
        .isString()
        .isLength({
            min: 1,
        })
        .withMessage('Минимальная длина фамилии 1 символ'),

    body('patronymic', 'Введите отчество')
        .isString()
        .isLength({
            min: 1,
        })
        .withMessage('Минимальная длина отчества 1 символ'),
    body('email', 'Введите электронную почту')
        .isEmail()
];
