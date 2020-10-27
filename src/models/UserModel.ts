import { model, Schema, Document } from 'mongoose';

export interface IUserModel {
    _id?: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    subgroup: number;
    completedTasks: Array<number>;
}

export type IUserModelDocument = IUserModel & Document;

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
    password: {
        required: true,
        type: String,
    },
    subgroup: {
        required: true,
        type: Number,
    },
    completedTasks: {
        required: false,
        type: Array,
    },
});

UserSchema.set('toJSON', {
    transform: (_, obj) => {
        delete obj.password;
        return obj;
    },
});

export const UserModel = model<IUserModelDocument>('User', UserSchema);
