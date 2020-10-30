import mongoose from 'mongoose';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../src/server';
import { UserModel } from '../src/models/UserModel';
import { createContact, createUser } from './helpers/create';
import connectToDB from './helpers/connectToDB';

const request = supertest(app);

beforeAll(async () => {
    await connectToDB();
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
});

let token: string;

describe('Creating contacts', () => {
    beforeAll(async () => {
        const user = await createUser();

        token = jwt.sign({ data: user }, process.env.SECRET_KEY, {
            expiresIn: '30d',
        });
    });

    test('User can create contact', async () => {
        const response = await request
            .post('/contacts')
            .set('token', token)
            .send({
                firstName: 'Анатолий',
                patronymic: 'Ефремович',
                lastName: 'Скворцов',
                email: 'a.e.skvorcov@mail.ru',
            });
        expect(response.status).toBe(200);
    });

    test.todo('User can`t create incorrect contact');
    test.todo('Can`t create without auth');
});

describe('Getting contacts', () => {
    test('User can get contact', async () => {
        const response = await request.get('/contacts');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    firstName: 'Анатолий',
                }),
            ])
        );
    });
});
