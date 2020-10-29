import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../src/server';

const request = supertest(app);

beforeAll(async () => {
    await mongoose.connect(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        }
    );
});

afterAll(async () => {
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
        expect(response.status).toBe(400);
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
