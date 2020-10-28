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

test('User can succesfully register', async (done) => {
    const response = await request.post('/auth/register').send({
        username: 'testuser',
        firstName: 'Ivan',
        lastName: 'Ivanov',
        password: 'qwerty12345',
        subgroup: 1,
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    done();
});

test('User can succesfully login', async (done) => {
    const response = await request.post('/auth/login').send({
        username: 'testuser',
        password: 'qwerty12345',
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    done();
});

test('User gets 401 on invalid credentials', async (done) => {
    const response = await request.post('/auth/login').send({
        username: 'testuser',
        password: 'incorrect password',
    });
    expect(response.status).toBe(401);
    done();
});

