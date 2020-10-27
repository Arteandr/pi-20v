import mongoose from 'mongoose';

mongoose.Promise = Promise;

export default async (): Promise<void> => {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
};
