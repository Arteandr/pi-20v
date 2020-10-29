import {model, Schema, Document} from 'mongoose';

export interface IContactModel {
    _id?: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    telephone?: string;
    email?: string;
    subjects: string;
};

export type IContactModelDocument = IContactModel & Document;

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
    number: {
        required: false,
        type: String,
    },
    email: {
        required: false,
        type: String,
    },
    subjects: {
        required: true,
        type: String
    }
});

export const ContactModel = model<IContactModelDocument>('Contact',ContactSchema);