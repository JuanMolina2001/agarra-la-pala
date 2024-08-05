const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("Electron", {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    on: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    remove: (channel, func) => {
        ipcRenderer.removeListener(channel, func);
    },
});