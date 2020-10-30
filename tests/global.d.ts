declare module NodeJS {
    interface Global {
        __MONGO_DB_NAME__: string;
    }
}
