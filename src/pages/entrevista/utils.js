
export const socket = {
    on: (event, callback) => {
        window.Electron.on(event, callback)
    },
    emit: (event, data) => {
        window.Electron.send(event, data)
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
    const messages = [`Bueno ha sido un placer conocer más sobre ti y tu experiencia. Agradecemos mucho tu tiempo hoy`,
        'Nos tomaremos unos días para revisar todas las candidaturas y te llamaremos  pronto  para informarte sobre nuestra decisión. ¡Que tengas un buen día!',
        'Vamos a revisar todas las entrevistas y te informaremos de nuestra decisión y sei quedas te llamaremos pronto. ¡Cuídate!',
        'Gracias por tu tiempo, te llamaremos pronto para informarte sobre nuestra decisión. ¡Que tengas un buen día!',
    ]
    return messages[Math.floor(Math.random() * messages.length)]
}
export async function evaluate(data) {
    return new Promise((resolve, reject) => {
        try {
            window.Electron.send('evaluate', data)
            window.Electron.on('evaluate', res => {
                resolve(res)
            })
        } catch (e) {
            reject(e)
        }
    })
}
export function imageToText(image) {
    return new Promise((resolve, reject) => {
        try {
                window.Electron.send('imageToText', image)
                window.Electron.on('imageToText', res => {
                    resolve(res)
                })
        } catch (e) {
            reject(e)
        }
    })
}