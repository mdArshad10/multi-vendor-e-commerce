import { createServer } from 'http'
import { createApp } from "./app";
import { env } from './config/env';


const main = async () => {
    try {
        await Promise.all([]);
        const app = createApp();
        const server = createServer(app);

        const port = env.KAFKA_SERVICE_PORT;

        server.listen(port, () => {
            console.log(`kafka services connected successfully => ${port}`);
        });

        const shutdown = () => {
            Promise.all([])
                .catch(() => { })
                .finally(() => {
                    server.close(() => process.exit(0));
                })
        }
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (error) {
        console.log("error on PRODUCT-service");
        console.log(error);

        process.exit(0);
    }
}

void main();