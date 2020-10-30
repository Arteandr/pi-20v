import { model, Schema, Document } from 'mongoose';
import { IContactModel } from './ContactModel';

export interface ISubject {
    name: string;
    teachers: [IContactModel];
}

export interface ISubjectModel extends ISubject, Document {}

const SubjectSchema = new Schema<ISubjectModel>({
    name: {
        type: String,
        required: true,
    },
    teachers: {
        required: true,
        type: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
    },
});

export const SubjectModel = model<ISubjectModel>('Subject', SubjectSchema);
