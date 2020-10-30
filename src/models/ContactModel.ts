import { model, Schema, Document } from 'mongoose';

export interface IContact {
    firstName: string;
    lastName: string;
    patronymic: string;
    telephone?: string;
    email?: string;
    subjects?: [string?];
}

export interface IContactModel extends IContact, Document {}

const ContactSchema = new Schema<IContactModel>({
    firstName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String,
    },
    patronymic: {
        required: true,
        type: String,
    },
    email: {
        required: false,
        type: String,
    },
    telephone: {
        required: false,
        type: String,
    },
});

ContactSchema.virtual('subjects', {
    ref: 'Subject',
    localField: '_id',
    foreignField: 'teachers',
});

export const ContactModel = model<IContactModel>('Contact', ContactSchema);
