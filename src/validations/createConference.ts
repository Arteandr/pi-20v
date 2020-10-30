import { body } from 'express-validator';
import { isValidObjectId } from 'mongoose';

/* Validation for registration */
export const createConferenceValidations = [
    body('subject', 'Введите ID предмета')
        .isString()
        .isLength({
            min: 1,
        })
        .withMessage('Минимальная длина имени 1 символ')
        .custom((v) => {
            if (!isValidObjectId(v)) throw new Error('Некорректный ID');
            return v;
        }),

    body('teacher', 'Введите ID препода')
        .isString()
        .isLength({
            min: 1,
        })
        .withMessage('Минимальная длина имени 1 символ')
        .custom((v) => {
            if (!isValidObjectId(v)) throw new Error('Некорректный ID');
            return v;
        }),
];
