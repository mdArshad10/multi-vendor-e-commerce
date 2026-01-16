import { createServer } from 'http'
import { createApp } from './app'

const main = async () => {
    try {
        await Promise.all([]);
        const app = createApp();
        const server = createServer(app)

        const port = 3000;
        server.listen(port, () => {
            console.log(`Gateway service is running at port ${port}`);
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
        process.exit(1);
    }
}

void main();