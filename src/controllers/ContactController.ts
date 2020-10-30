import express from 'express';
import { validationResult } from 'express-validator';
import { IUserModel } from '../models/UserModel';
import { ContactModel, IContactModel } from '../models/ContactModel';
class ContactController {
    /* Get all Contact */
    async index(_: any, res: express.Response): Promise<void> {
        try {
            const contacts = await ContactModel.find({}).exec();

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

    /* Create new contacts */
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

                const data: IContactModel = {
                    ...req.body,
                };

                const task = await ContactModel.create(data);

                res.json({
                    status: 'success',
                    data: task,
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

export const ContactCtrl = new ContactController();
