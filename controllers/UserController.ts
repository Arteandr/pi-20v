import express from 'express';
import mongoose from 'mongoose';
import { generateMD5 } from '../utils/generateHash';
import { validationResult } from 'express-validator';
import { IUserModel, UserModel } from '../models/UserModel';

const isValidObjectId = mongoose.Types.ObjectId.isValid;

class UserController {
    /* Get all users */
    async index(_: any, res: express.Response): Promise<void> {
        try {
            const users = await UserModel.find({}).exec();

            res.json({
                status: 'success',
                data: users,
            });
        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error),
            });
        }
    }

    /** Show certain user */
    async show(req: express.Request, res: express.Response): Promise<void> {
        try {
            const userId = req.params.id;

            if (!isValidObjectId(userId)) {
                res.status(400).send();
                return;
            }

            const user = await UserModel.findById(userId).exec();

            if (!user) {
                res.status(404).send();
                return;
            }

            res.json({
                status: 'success',
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: JSON.stringify(error),
            });
        }
    }

    /* Create new user */
    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: 'error',
                    errors: errors.array(),
                });
                return;
            }

            const data: IUserModel = {
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: generateMD5(
                    req.body.password + process.env.SECRET_KEY
                ),
                completedTasks: [],
                subgroup: req.body.subgroup,
            };

            const user = await UserModel.create(data);

            res.json({
                status: 'success',
                data: user,
            });
        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error),
            });
        }
    }
}

export const UserCtrl = new UserController();
