import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.get('/users',():void => {});


app.listen(8888,():void => {
    console.log('Server running');
    
})

