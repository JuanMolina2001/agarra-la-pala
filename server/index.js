import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import express from "express";
import cors from 'cors';
import morgan from "morgan";
import { Server } from "socket.io";
import { createServer } from "http";
import { createJob, chat, imageToText } from './utils.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*"
}));
app.use(morgan("dev"));
app.use(express.json({
    limit: "5mb"
}));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || "*",

    },
    maxHttpBufferSize: 5 * 1024 * 1024
});

function pageRoute(req, res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
}

app.get('/', pageRoute);
app.get('/game', pageRoute);


io.on("connection", (socket) => {
    let data
    socket.on('data', async (info) => {
        const { empleo } = info;
        data = info
        if (info.curriculum.image.includes('placeholder.jpg')) {
            info.curriculum.image = 'no hay imagen'
            socket.emit("data");
            return
        }
        data.curriculum.image = await imageToText(info.curriculum.image)
        socket.emit("data");
    });
    socket.on("chat", async ({ messages }) => {
        if (!data) {
            socket.emit("chat", "No se ha enviado la información del trabajo")
            return
        }
        console.log(data)

        const response = await chat(data, messages) 
        socket.emit("chat", response);
    });
});

app.post("/api/empleos/:job", async (req, res) => {
    const { job } = req.params;
    const { empleos } = req.body;
    const result = await createJob(job, empleos);
    res.send(result);

});

server.listen(port, () => {
    console.log("Server running on " + port);
    console.log(process.env.CORS_ORIGIN)
});
