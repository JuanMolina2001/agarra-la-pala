import { app, BrowserWindow, ipcMain } from 'electron';
import { createJob, chat, imageToText } from './utils.js';
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
    win.loadURL(process.env.URL || `file://${__dirname}/dist/index.html`);
    win.webContents.openDevTools();
}
app.whenReady().then(crateWindow);
ipcMain.on('data', async (event, info) => {
    if (info.curriculum.image.includes('placeholder.jpg')) {
        info.curriculum.image = 'no hay imagen'
    } else {
        info.curriculum.image = await imageToText(info.curriculum.image)
    }
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(info));
    event.reply("data");
});
ipcMain.on("chat", async (event, { messages }) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'))
if (!data) {
    event.reply("chat", "No se ha enviado la información del trabajo")
    return
}
console.log(data)
const response = await chat(data, messages)
event.reply("chat", response);
});

ipcMain.on("empleos", async (event, { job, empleos }) => {
    const result = await createJob(job, empleos);
    event.reply("empleos", result);
});
