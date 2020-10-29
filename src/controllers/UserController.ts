import express from 'express';
import jwt from 'jsonwebtoken';

import { validationResult } from 'express-validator';
import { IUser, IUserModel, UserModel } from '../models/UserModel';
import { isValidObjectId } from '../utils/isValidObjectId';
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
            res.status(500).json({
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

            const data: IUser = {
                completedTasks: [],
                ...req.body,
            };

            let user = await UserModel.findOne({ username: data.username });

            if (user) {
                res.status(403).json({
                    status: 'error',
                    message: 'User has already registered',
                });
                return;
            }

            user = await UserModel.create(data);

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

    /* Login user */
    async afterLogin(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        try {
            const user = req.user
                ? (req.user as IUserModel).toJSON()
                : undefined;
            res.json({
                status: 'success',
                data: {
                    ...user,
                    token: jwt.sign(
                        { data: req.user },
                        process.env.SECRET_KEY,
                        {
                            expiresIn: '30d',
                        }
                    ),
                },
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }

    async getUserInfo(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        try {
            const user = req.user
                ? (req.user as IUserModel).toJSON()
                : undefined;

            res.json({
                status: 'success',
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }
}

export const UserCtrl = new UserController();
