import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import express from "express";
import cors from 'cors';
import morgan from "morgan";
import { Server } from "socket.io";
import { createServer } from "http";
import { createJob } from './utils.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 8000;
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*"
}));
app.use(morgan("dev"));
app.use(express.json({
    limit: "5mb"
}));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
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
        if (info.curriculum.image.includes('/placeholder.jpg')) {
            info.curriculum.image = 'no hay imagen'
            socket.emit("data");
            return
        }
        const result = await generateText({
            model: google('models/gemini-1.5-flash-latest'),
            maxTokens: 512,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: 'detalla lo que hay en la imagen',
                        },
                        {
                            type: 'image',
                            image: info.curriculum.image,
                        },
                    ],
                },
            ],
        });
        data.curriculum.image = result.text
        socket.emit("data");
    });
    socket.on("chat", async ({ messages }) => {
        if (!data) {
            socket.emit("chat", "No se ha enviado la información del trabajo")
            return
        }
        console.log(data)
        let response = ''
        try {
            const result = await generateText({
                model: google("models/gemini-1.5-flash-latest"),
                maxTokens: 500,
                system: `
Tu tarea es evaluar las habilidades y la adecuación de un candidato para un puesto específico. Evalúa sus experiencias laborales , habilidades técnicas, y capacidades interpersonales. Verifica si cumple con los requisitos del puesto. Mantén tu personalidad acorde a la del personaje que estás interpretando y añade un toque cómico. 
La respuesta debe ser corta (máximo 5 líneas). Antes de la respuesta, escribe la emoción que quieres que tenga tu personaje y sepárala de la respuesta con dos puntos.
Las emociones a usar antes de tu respuesta son:
- neutral
- feliz
- molesto
- sorprendido
Ejemplo:
feliz: Tu respuesta.
evita poner caracteres especiales como comillas, paréntesis, corchetes, hashtags, etc.
---
    tu eres:
${JSON.stringify(data.entrevistador)}
---
el empleo es el siguiente:
${data.empleo.replaceAll('\n', ' ')}
            `,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `este es mi curriculum ${JSON.stringify(data.curriculum)}`,
                            }
                        ]
                    },
                    ...messages
                ],

            });
            response = result.text
        } catch (e) {
            console.log(e)
            const alts = ['¡Ups! No capté del todo lo que querías decir. ¿Podrías reformular tu pregunta para asegurarme de que te ofrezco la mejor respuesta posible?", "¡Vaya! Parece que no entendí bien tu pregunta. ¿Podrías reformularla para que pueda ayudarte mejor?', 'Parece que no entendí bien tu pregunta. ¿Podrías repetirla o aclararla un poco más?']
            response = alts[Math.floor(Math.random() * alts.length)]
        }
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
    console.log("Server running on http://localhost:" + port);
});
