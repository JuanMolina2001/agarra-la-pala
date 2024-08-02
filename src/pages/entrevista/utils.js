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
    const personaje = Math.floor(Math.random() * 3) + 1
    return { name, personalidad, gender, personaje }
}
export function despedirse() {
    const messgaes = [`Bueno ha sido un placer conocer más sobre ti y tu experiencia. Agradecemos mucho tu tiempo hoy`,
        'Nos tomaremos unos días para revisar todas las candidaturas y te llamaremos  pronto  para informarte sobre nuestra decisión. ¡Que tengas un buen día!',
        'Vamos a revisar todas las entrevistas y te informaremos de nuestra decisión y sei quedas te llamaremos pronto. ¡Cuídate!',
        'Gracias por tu tiempo, te llamaremos pronto para informarte sobre nuestra decisión. ¡Que tengas un buen día!',
    ]
    return messgaes[Math.floor(Math.random() * messgaes.length)]
}
export async function evaluate(data) {
    return new Promise((resolve, reject) => {
        try {
            if (window.Electron) {
                window.Electron.send('evaluate', data)
                window.Electron.on('evaluate', res => {
                    resolve(res)
                })
            } else {
                fetch(import.meta.env.VITE_API + '/api/evaluate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.text()).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
export function imageToText(image) {
    return new Promise((resolve, reject) => {
        try {
            if (window.Electron) {
                window.Electron.send('imageToText', image)
                window.Electron.on('imageToText', res => {
                    resolve(res)
                })
            } else {
                fetch(import.meta.env.VITE_API + '/api/imageToText', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image })
                }).then(res => res.text()).then(res => {
                    resolve(res)
                }).catch(e => {
                    reject(e)
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}