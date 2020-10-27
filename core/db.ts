import mongoose from 'mongoose';

mongoose.Promise = Promise;

mongoose.connect(
    `mongodb+srv://hwndrer:${process.env.DB_PASSWORD}@cluster0.v2c5t.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
export { db, mongoose };