import { body } from 'express-validator';
import { isValidObjectId } from 'mongoose';

/* Validation for registration */
export const createSubjectValidations = [
    body('name', 'Введите название')
        .isString()
        .isLength({
            min: 1,
        })
        .withMessage('Минимальная длина имени 1 символ'),

    body('teachers', 'Введите ID преподов')
        .isArray()
        .custom((teachers) => {
            teachers.forEach((t: unknown) => {
                if (typeof t !== 'string')
                    throw new Error('ID должен быть строкой');
                if (!isValidObjectId(t)) throw new Error('Некорректный ID');
            });
            return teachers;
        }),
];
