import { model, Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    subgroup: number;
    completedTasks: Array<number>;
}

export interface IUserModel extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

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

UserSchema.pre<IUserModel>('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUserModel>('User', UserSchema);
