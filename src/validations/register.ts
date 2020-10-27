import { body } from 'express-validator';

/* Validation for registration */
export const registerValidations = [
    body('username', 'Введите имя пользователя')
        .isString()
        .withMessage('Неверное имя пользователя')
        .isLength({
            min: 4,
            max: 20,
        })
        .withMessage('Допустимое количество символов от 4 до 20'),
    body('firstName', 'Введите ваше имя')
        .isString()
        .isLength({
            min: 2,
            max: 20,
        })
        .withMessage('Допустимое количество символов в имени от 2 до 20'),
    body('lastName', 'Введите фамилию')
        .isString()
        .isLength({
            min: 2,
            max: 20,
        })
        .withMessage('Допустимое количество символов в фамилии от 2 до 20'),
    /* Password */
    body('password', 'Укажите пароль')
        .isString()
        .isLength({
            min: 6,
        })
        .withMessage('Пароль должен быть минимум 6 символов')
        .custom((value, { req }) => {
            if (value !== req.body.password2) {
                throw new Error('Пароли не совпадают');
            } else {
                return value;
            }
        }),
    body('subgroup', 'Укажите подгруппу')
        .isNumeric()
        .custom((value) => {
            if (value !== 1 && value !== 2) {
                throw new Error('Укажите подгруппу (1,2)');
            } else {
                return value;
            }
        }),
];
