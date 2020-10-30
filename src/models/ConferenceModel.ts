import { model, Schema, Document } from 'mongoose';
import { IContactModel } from './ContactModel';
import { ISubjectModel } from './SubjectModel';

export interface IConference {
    subject: ISubjectModel;
    teacher: IContactModel;
    startDate: Date;
}

export interface IConferenceModel extends IConference, Document {}

const ConferenceSchema = new Schema<IConferenceModel>({
    subject: {
        required: true,
        ref: 'Subject',
        type: Schema.Types.ObjectId,
    },
    teacher: {
        required: true,
        ref: 'Contact',
        type: Schema.Types.ObjectId,
    },
    startDate: {
        required: true,
        type: Date,
    },
});

export const ConferenceModel = model<IConferenceModel>(
    'Conference',
    ConferenceSchema
);
