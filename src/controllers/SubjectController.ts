import express from 'express';
import { validationResult } from 'express-validator';
import { ISubject, SubjectModel } from '../models/SubjectModel';
import { IUserModel } from '../models/UserModel';

class SubjectController {
    /* Get all subjects */
    async index(_: any, res: express.Response): Promise<void> {
        try {
            const contacts = await SubjectModel.find({})
                .populate('teachers')
                .exec();

            res.json({
                status: 'success',
                data: contacts,
            });
        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error),
            });
        }
    }

    /* Create new subject */
    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const user = req.user as IUserModel;

            if (user?._id) {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    res.status(400).json({
                        status: 'error',
                        errors: errors.array(),
                    });
                    return;
                }

                const data: ISubject = {
                    ...req.body,
                };

                const subject = await SubjectModel.create(data);

                res.json({
                    status: 'success',
                    data: subject,
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }
}

export const SubjectCtrl = new SubjectController();
