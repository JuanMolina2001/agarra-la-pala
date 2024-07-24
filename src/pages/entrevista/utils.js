import { io } from "socket.io-client";
export function getSocket() {
    if (window.Electron) {
        const sk = {
            on: (event, callback) => {
                window.Electron.on(event, callback)
            },
            emit: (event, data) => {
                window.Electron.send(event, data)
            },
        }
        return sk
    } else {
        const sk = io(import.meta.env.VITE_API, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });
        sk.connect()
        return sk
    }
}
export async function getEntrevistador() {
    const personalidades = ['Optimista Desbordante', 'Extrovertido Frenético', 'Dramático Desmesurado', 'Perfeccionista Maniático', 'Hipocondríaco Extremo', 'Soñador Despistado', 'Entusiasta Inagotable', 'Narcisista Exagerado', 'Crítico Implacable', 'Inseguro Paranóico', 'Curioso Incansable', 'Aventurero Temerario', 'Sarcástico Profesional', 'Melancólico Poético', 'Generoso Excesivo', 'Parlanchín Incontrolable', 'Obsesivo Detallista', 'Simpático Empalagoso', 'Germofóbico Histerico', 'Competitivo Salvaje']
    const indexes = new Set();
    const result = await (await (await fetch('https://randomuser.me/api/')).json()).results
    const name = `${result[0].name.title} ${result[0].name.first} ${result[0].name.last}`
    const gender = result[0].gender
    for (let i = 0; i < 4; i++) {
        indexes.add(Math.floor(Math.random() * personalidades.length));
    }
    const personalidad = Array.from(indexes).map(i => personalidades[i]).join(', ')
    return { name, personalidad, gender }
}