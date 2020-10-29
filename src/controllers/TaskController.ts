import express from 'express';
import { validationResult } from 'express-validator';
import { ITaskModel, TaskModel } from '../models/TaskModel';
import { IUserModel } from '../models/UserModel';
import { isValidObjectId } from '../utils/isValidObjectId';

class TaskController {
    /* Get all tasks */
    async index(_: any, res: express.Response): Promise<void> {
        try {
            const tasks = await TaskModel.find({}).exec();

            res.json({
                status: 'success',
                data: tasks.reverse(),
            });
        } catch (error) {
            res.json({
                status: 'error',
                message: JSON.stringify(error),
            });
        }
    }

    /** Show certain task */
    async show(req: express.Request, res: express.Response): Promise<void> {
        try {
            const taskId = req.params.id;

            if (!isValidObjectId(taskId)) {
                res.status(400).send();
                return;
            }

            const task = await TaskModel.findById(taskId).exec();

            if (!task) {
                res.status(404).send();
                return;
            }

            res.json({
                status: 'success',
                data: task,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: JSON.stringify(error),
            });
        }
    }

    /* Create new task */
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

                const data: ITaskModel = {
                    text: req.body.text,
                    user: user._id,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    subject: req.body.subject,
                    subgroup: req.body.subgroup ? req.body.subgroup : 0,
                };

                const task = await TaskModel.create(data);

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

    /** Delete task */
    async delete(req: express.Request, res: express.Response): Promise<void> {
        const user = req.user as IUserModel;

        try {
            if (user) {
                const taskId = req.params.id;

                if (!isValidObjectId(taskId)) {
                    res.status(400).send();
                    return;
                }

                const task = await TaskModel.findById(taskId);

                if (task) {
                    task.remove();
                    res.send();
                } else {
                    res.status(404).send();
                }
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }

    /** Update task */
    async update(req: express.Request, res: express.Response): Promise<void> {
        const user = req.user as IUserModel;

        try {
            if (user) {
                const taskId = req.params.id;

                if (!isValidObjectId(taskId)) {
                    res.status(400).send();
                    return;
                }

                const task = await TaskModel.findById(taskId);

                if (task) {
                    const text = req.body.text;
                    task.text = text;
                    task.save();
                    res.send();
                } else {
                    res.status(404).send();
                }
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }
}

export const TaskCtrl = new TaskController();
