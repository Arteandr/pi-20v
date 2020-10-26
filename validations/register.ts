import validator from 'express-validator';

/* Validation for registration */
export const registerValidations = [
    validator
        .body('username', 'Введите имя пользователя')
        .isString()
        .withMessage('Неверное имя пользователя')
        .isLength({
            min: 4,
            max: 20,
        })
        .withMessage('Допустимое количество символов от 4 до 20'),
    validator
        .body('firstName', 'Введите ваше имя')
        .isString()
        .isLength({
            min: 2,
            max: 20,
        })
        .withMessage('Допустимое количество символов в имени от 2 до 20'),
    validator
        .body('lastName', 'Введите фамилию')
        .isString()
        .isLength({
            min: 2,
            max: 20,
        })
        .withMessage('Допустимое количество символов в фамилии от 2 до 20'),
    validator
        .body('password', 'Укажите пароль')
        .isString()
        .isLength({
            min: 6,
        })
        .withMessage('Пароль должен быть минимум 6 символов'),
];
