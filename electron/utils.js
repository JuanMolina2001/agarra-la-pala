import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { GoogleGenerativeAI } from "@google/generative-ai";
export async function createJob(job, empleos) {
    const messages = empleos.map((message) => [
        {
            role: "assistant",
            content: `${message} `,
        },
        {
            role: "user",
            content: `crea un anuncio de empleo para un puesto de ${job} diferente al anterior, inventa todos los datos  incluyendo los requerimientos, nombre de la empresa`,
        },
    ]).flat();

    const result = await generateText({
        model: google("models/gemini-1.5-flash-latest"),
        maxTokens: 1024,
        system: `eres un recruiter el cual tiene que crear un anuncio de empleo  en el que tenga un titulo una descripción y 
        requerimientos hacelo simple e inventa todos los datos  incluyendo los requerimientos, nombre de la empresa, etc. 
        se creativo y no te preocupes por la veracidad de la información intenta hacerlo algo minimalista y que no sea muy largo
        solo el titulo, la descripción y los requerimientos
        no mas de 15 lineas
        `,
        messages: [
            {
                role: "user",
                content: `crea un anuncio de empleo para un puesto de ${job}, inventa todos los datos incluyendo los requerimientos, nombre de la empresa`,
            },
            ...messages,
        ],

    });

    return result.text;
}
// esta forma de chat me daba muchos problemas, por eso lo cambie a la api de google
export async function chat(data, messages) {
    const { entrevistador, empleo, curriculum } = data
    const result = await generateText({
        model: google("models/gemini-1.5-flash-latest"),

        maxTokens: 1024,
        system:
            `Tu tarea es evaluar las habilidades y la adecuación de un candidato para un puesto específico. Evalúa sus experiencias laborales , habilidades técnicas, y capacidades interpersonales. Verifica si cumple con los requisitos del puesto. Mantén tu personalidad acorde a la del personaje que estás interpretando y añade un toque cómico. 
    La respuesta debe ser corta (máximo 5 líneas). Antes de la respuesta, escribe la emoción que quieres que tenga tu personaje y sepárala de la respuesta con dos puntos.
    Las emociones a usar antes de tu respuesta son:
    - neutral
    - feliz
    - molesto
    - sorprendido
    Ejemplo:
    feliz: Tu respuesta.
    evita poner caracteres especiales como comillas, paréntesis, corchetes, hashtags, etc.
    `,
        messages: [
            {
                role: 'assistant',
                content: [
                    {
                        type: "text",
                        text: `soy ${entrevistador.name},de genero ${entrevistador.gender} y mi personalidad es ${entrevistador.personalidad}  y el puesto es este ${empleo}`,
                    }
                ]

            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `este es mi curriculum: \nnombre: ${curriculum.name},\nacerca de mi: ${curriculum.about},\nexperiencia ${curriculum.experience},\neducación ${entrevistador.education},\nfoto: ${curriculum.image}`,
                    }
                ]
            },
            ...messages
        ],

    });
    return result.text
}
export function chatGenai({ entrevistador, empleo ,history }) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: `Eres un reclutador para una empresa.
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
tu eres ${entrevistador.name},de genero ${entrevistador.gender} y tu personalidad es ${entrevistador.personalidad}  y el puesto es este:
${empleo.replaceAll('\n', '')}
        `,

    });

    return model.startChat({
        history: history,
    });
}
export async function imageToText(image) {
    const result = await generateText({
        model: google('models/gemini-1.5-flash-latest'),
        maxTokens: 512,
        system: 'eres un asistente virtual que tiene que describir lo que hay en la imagen',
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: 'detalla lo que hay en la imagen en español',
                    },
                    {
                        type: 'image',
                        image: image,
                    },
                ],
            },
        ],
    });
    return result.text;
}
export async function evaluate(data) {
    const result = await generateText({
        model: google('models/gemini-1.5-flash-latest'),
        maxTokens: 512,
        prompt: `
        evalúa según la siguiente conversación si el candidato es apto para el puesto de trabajo, si cumple con los requisitos del puesto.
        determina si pasa las siguientes condiciones.
        - tiene experiencia en el puesto
        - tiene habilidades técnicas
        - tiene habilidades interpersonales
        - cumple con los requisitos del puesto
        - Dejo una manera de contactarlo
        - tiene una buena presentación
        - tiene una buena actitud
        el empleo es el siguiente:
        ${data.empleo.replaceAll('\n', ' ')}
        la persona es la siguiente:
        ${data.curriculum}
        los mensajes son los siguientes:
        ${JSON.stringify(data.messages)}
       solo responde si lo llamaron o no y el motivo de tu respuesta hacelo de manera comica y creativa, maximo 2 lineas
       un titulo y el motivo
        `
    })
    return result.text
}