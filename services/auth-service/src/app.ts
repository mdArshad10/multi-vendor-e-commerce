import express from 'express';
import type{Application} from 'express'

export const createApp = ():Application=>{
    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({extended:true}))

    return app;
}