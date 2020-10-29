import { model, Schema, Document } from 'mongoose';

export interface ITaskModel {
    _id?: string;
    user: string;
    subject: string;
    text: string;
    startDate: string;
    endDate: string;
    subgroup?: number;
}

export type ITaskModelDocument = ITaskModel & Document;

const TaskSchema = new Schema<ITaskModel>({
    user: {
        required: true,
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
    subject: {
        required: true,
        type: String,
    },
    text: {
        required: true,
        type: String,
    },
    startDate: {
        required: true,
        type: String,
    },
    endDate: {
        required: true,
        type: String,
    },
    subgroup: {
        required: false,
        type: Number,
    },
});

export const TaskModel = model<ITaskModelDocument>('Task', TaskSchema);
