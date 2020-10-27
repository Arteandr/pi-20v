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

test('Users list', async (done) => {
    const response = await request.get('/users');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    done();
});
