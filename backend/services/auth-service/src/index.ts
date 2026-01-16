import {createServer} from 'http'
import { createApp } from "./app";
import { connectRedis, disconnectPrisma, disconnectRedis } from '@multi-vendor-e-commerce/common';


const main = async ()=>{
    try {
        await Promise.all([connectRedis()]);
        const app = createApp();
        const server = createServer(app);

        const port = 4000;
        server.listen(port,()=>{
            console.log(`auth services connected successfully => ${port}`);
        })
        const shutdown = ()=>{
            Promise.all([disconnectPrisma(),disconnectRedis()])
            .catch(()=>{})
            .finally(()=>{
                server.close(()=>process.exit(0));
            })
        }
        process.on('SIGINT',shutdown);
        process.on('SIGTERM',shutdown);
    } catch (error) {
        process.exit(0);
    }
}

void main();