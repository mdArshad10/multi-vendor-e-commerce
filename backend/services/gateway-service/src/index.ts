import { createServer } from 'http'
import { createApp } from './app'
import { env } from './config/env';

const main = async () => {
    try {
        await Promise.all([]);
        const app = createApp();
        const server = createServer(app)

        const port = env.GATEWAY_SERVICE_PORT;
        server.listen(port, () => {
            console.log(`Gateway service is running at port ${port}`);
            console.log(`Auth-services port => ${env.AUTH_SERVICE_PORT}`);
        })

        const shutdown = () => {
            Promise.all([])
                .catch(() => { })
                .finally(() => {
                    server.close(() => process.exit(0));
                })
        }

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

void main();