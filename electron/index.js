import { app, BrowserWindow, ipcMain } from 'electron';
import { createJob, chat, imageToText, evaluate } from './utils.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import { loadEnvFile } from 'process';
loadEnvFile('electron.env');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function crateWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.maximize();
    win.loadURL(process.env.URL || `file://${__dirname}/dist/index.html`);
    win.webContents.openDevTools();
}
app.whenReady().then(crateWindow);

ipcMain.on("chat", async (event, {messages,data}) => {
    if (!data) {
        event.reply("error", "No se ha enviado la información del trabajo")
        return
    }
    try {
        const response = await chat(data, messages)
        event.reply("chat", response);
    } catch (error) {
        console.log(error);
        event.reply("error", "Ocurrió un error al chatear");
    }
});

ipcMain.on("empleos", async (event, { job, empleos }) => {
    try {
        const result = await createJob(job, empleos);
        event.reply("empleos", result);
    } catch (error) {
        console.log(error);
        event.reply("error", 'Ocurrió un error al crear el trabajo');
    }
});
ipcMain.on("evaluate", async (event, data) => {
    try {
        const result = await evaluate(data);
        event.reply("evaluate", result);
    } catch (error) {
        console.log(error);
        event.reply("error", "Ocurrió un error al evaluar el candidato");
    }


})
ipcMain.on("imageToText", async (event, image) => {
    let result = image;
    if (image.startsWith('data:image')) {
        try {
            result = await imageToText(image);

        } catch (error) {
            console.log(error);
            event.reply("error", "Ocurrió un error al convertir la imagen en texto");
        }
    }
    event.reply("imageToText", result);
}); 