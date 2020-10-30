import mongoose from 'mongoose';

export default async () => {
    const url =
        process.env.MONGO_URL.split('/').slice(0, -1).join('/') +
        '/' +
        global.__MONGO_DB_NAME__;
    await mongoose.connect(
        url,
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
};
