import { model, Schema } from 'mongoose'

/* User model schema */
const UserSchema = new Schema({
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
        required: true,
        type: Number,
    },
    completedTasks: {
        type: String,
    },
})

export const UserModel = model('User', UserSchema)
