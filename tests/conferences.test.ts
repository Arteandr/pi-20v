import mongoose from 'mongoose';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../src/server';
import { UserModel } from '../src/models/UserModel';
import { ContactModel, IContactModel } from '../src/models/ContactModel';
import { SubjectModel, ISubjectModel } from '../src/models/SubjectModel';
import { createContact, createUser, createSubject } from './helpers/create';
import connectToDB from './helpers/connectToDB';

const request = supertest(app);

beforeAll(async () => {
    await connectToDB();
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
});

describe('Creating contacts', () => {
    let token: string;
    let teacher: IContactModel;
    let subject: ISubjectModel;

    beforeAll(async () => {
        const user = await createUser();

        token = jwt.sign({ data: user }, process.env.SECRET_KEY, {
            expiresIn: '30d',
        });

        teacher = await createContact();
        subject = await createSubject(teacher);
    });

    test('User can create new conference', async () => {
        const response = await request
            .post('/conferences')
            .set('token', token)
            .send({
                subject: subject.id,
                teacher: teacher.id,
                startDate: new Date(),
            });
        expect(response.status).toBe(200);
    });
});

describe('Getting contacts', () => {
    test('User can get conference', async () => {
        const response = await request.get('/conferences');
        expect(response.status).toBe(200);
    });
});
