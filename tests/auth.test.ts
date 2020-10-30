import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../src/server';
import connectToDB from './helpers/connectToDB';

import { createUser } from './helpers/create';

const request = supertest(app);

beforeAll(async () => {
    await connectToDB();
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
});

const authData = {
    username: 'testuser',
    password: 'qwerty12345',
};

const invalidAuthData = {
    username: 'testuser',
    password: 'incorrectpassword',
};

const registerData = {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    subgroup: 1,
    ...authData,
};

describe('Registration', () => {
    test('User can succesfully register', async () => {
        const response = await request
            .post('/auth/register')
            .send(registerData);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });
    test('User can`n register if already registered', async () => {
        const response = await request
            .post('/auth/register')
            .send(registerData);
        expect(response.status).toBe(403);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('User has already registered');
    });
    test('User can`n register with incorrect data', async () => {
        const response = await request.post('/auth/register').send({});
        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
    });
});
describe('Authorization', () => {
    test('User can succesfully login', async () => {
        const response = await request.post('/auth/login').send(authData);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });
    test('User gets 401 on invalid credentials', async () => {
        const response = await request
            .post('/auth/login')
            .send(invalidAuthData);
        expect(response.status).toBe(401);
    });
});
