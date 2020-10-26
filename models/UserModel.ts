import { model, Schema, Document } from 'mongoose';

interface IUserModel {
    username: string;
    firstName: string;
    lastName: string;
    subgroup: number;
    completedTasks: Array<number>;
    confirmedHash: string;
}

type IUserModelDocument = IUserModel & Document;

/* User model schema */
const UserSchema = new Schema<IUserModel>({
    username: {
        unique: true,
        required: true,
        type: String,
    },
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String,
    },
    subgroup: {
        required: false,
        type: Number,
    },
    completedTasks: {
        type: Array,
    },
    confirmedHash: {
        required: true,
        type: String,
    },
});

export const UserModel = model<IUserModelDocument>('User', UserSchema);
