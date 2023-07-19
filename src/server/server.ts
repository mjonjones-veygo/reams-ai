import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import { AddressInfo } from 'net';
import http from 'http'

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';

const createServer = (): express.Application => {
    const app = express();

    // Parse payloads
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    app.use(cors());
    app.disable('x-powered-by');

    app.get('/health', (_req, res) => {
        res.send('I am healthy')
    })

    return app
}

const startServer = async () => {
    const app = await createServer();
    const server = http.createServer(app).listen({ host, port }, () => {
        const addressInfo = server.address() as AddressInfo;
        console.log(
            `Server is ready at http://${addressInfo.address}:${addressInfo.port}`,
        );
    });
}


startServer()
