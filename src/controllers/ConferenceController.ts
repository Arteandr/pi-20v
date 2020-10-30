import express from 'express';
import { validationResult } from 'express-validator';
import { IUserModel } from '../models/UserModel';
import { ConferenceModel, IConference } from '../models/ConferenceModel';
import { ContactModel, IContactModel } from '../models/ContactModel';
class ConferenceController {
    /* Get all conferences */
    async index(_: any, res: express.Response): Promise<void> {
        try {
            const contacts = await ConferenceModel.find({})
                .populate('subject')
                .populate('teacher')
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

    /* Create new conference */
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

                const data: IConference = {
                    ...req.body,
                };

                let task = await ConferenceModel.create(data);
                task = await task
                    .populate('subject')
                    .populate('teacher')
                    .execPopulate();

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

export const ConferenceCtrl = new ConferenceController();
