import { app, BrowserWindow, ipcMain } from 'electron';
import { createJob, chat, imageToText, evaluate, chatGenai } from './utils.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { loadEnvFile } from 'process';
try {
    loadEnvFile('../electron.env');
} catch (e) {
    console.log(e);
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function crateWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });
    win.maximize();
    win.loadURL(process.env.URL || `file://${path.join(__dirname, 'dist', 'index.html')}`);
    process.env.URL && win.webContents.openDevTools();
    !process.env.URL && win.setMenu(null);
}
app.whenReady().then(crateWindow);

ipcMain.on("startChat", async (event, { data, history }) => {
    if (!data) {
        event.reply("error", "No se ha enviado la información del trabajo")
        return
    }
    try {
        const { curriculum, entrevistador, empleo } = data
        const message = `mi curriculum: 
        nombre: ${curriculum.name},
        acerca de mi: ${curriculum.about},
        experiencia ${curriculum.experience},
        educación ${entrevistador.education},
        foto: ${curriculum.image}`
        const chat = chatGenai({
            entrevistador,
            empleo,
            history: history.length > 0 ?
                [
                    { role: 'user', parts: [{ text: message }] },
                    ...history
                ] :
                history
        })
        if (history.length <= 0) {
            const result = await chat.sendMessage(message)
            event.reply("chat", result.response.text())
        }
        ipcMain.on("chat", async (event, { message }) => {
            const r = await chat.sendMessage(message)
            event.reply("chat", r.response.text())
        })

    } catch (error) {
        console.log(error);
        event.reply("error", "Ocurrió un error al chatear");
    }
});



// ipcMain.on("chat", async (event, {messages,data}) => {
//     if (!data) {
//         event.reply("error", "No se ha enviado la información del trabajo")
//         return
//     }

//     try {
//         const response = await chat(data, messages)
//         event.reply("chat", response);
//     } catch (error) {
//         console.log(error.cause);
//         event.reply("error", "Ocurrió un error al chatear");
//     }
// });

ipcMain.on("empleos", async (event, { job, empleos }) => {
    try {
        const result = await createJob(job, empleos);
        event.reply("empleos", result);
    } catch (error) {
        console.log(error.cause);
        event.reply("error", 'Ocurrió un error al crear el trabajo');
    }
});
ipcMain.on("evaluate", async (event, data) => {
    try {
        const result = await evaluate(data);
        event.reply("evaluate", result);
    } catch (error) {
        console.log(error.cause);
        event.reply("error", "Ocurrió un error al evaluar el candidato");
    }


})
ipcMain.on("imageToText", async (event, image) => {
    let result = image;
    if (image.startsWith('data:image')) {
        try {
            result = await imageToText(image);

        } catch (error) {
            console.log(error.cause);
            event.reply("error", "Ocurrió un error al convertir la imagen en texto");
        }
    }
    event.reply("imageToText", result);
}); 