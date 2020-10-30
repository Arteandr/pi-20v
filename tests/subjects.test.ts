import mongoose from 'mongoose';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../src/server';
import { UserModel } from '../src/models/UserModel';
import { ContactModel, IContactModel } from '../src/models/ContactModel';
import { createContact, createSubject, createUser } from './helpers/create';
import connectToDB from './helpers/connectToDB';

const request = supertest(app);

beforeAll(async () => {
    await connectToDB();
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
});

describe('Creating subject', () => {
    let token: string;
    let teacher: IContactModel;
    beforeAll(async () => {
        const user = await createUser();

        token = jwt.sign({ data: user }, process.env.SECRET_KEY, {
            expiresIn: '30d',
        });

        teacher = await createContact();
    });

    test('User can create subject', async () => {
        const response = await request
            .post('/subjects')
            .set('token', token)
            .send({
                name: 'Математический анализ',
                teachers: [teacher.id],
            });
        expect(response.status).toBe(200);
    });
});

describe('Recieving subjects', () => {
    test('User can get subjects', async () => {
        const response = await request.get('/subjects');
        expect(response.status).toBe(200);
        expect(response.body.data[0].name).toBe('Математический анализ');
    });
});
