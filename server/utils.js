import { generateText } from "ai";
import { google } from "@ai-sdk/google";
export async function createJob(job, empleos) {
    const messages = empleos.flatMap((message) => [
        {
            role: "assistant",
            content: `${message} `,
        },
        {
            role: "user",
            content: `crea un anuncio de empleo para un puesto de ${job} diferente al anterior, inventa todos los datos  incluyendo los requerimientos, nombre de la empresa`,
        },
    ])

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
export async function chat(data, messages) {
    try {
        const result =  await generateText({
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
        return result.text
    } catch (e) {
        console.log(e)
        const alts = ['¡Ups! No capté del todo lo que querías decir. ¿Podrías reformular tu pregunta para asegurarme de que te ofrezco la mejor respuesta posible?", "¡Vaya! Parece que no entendí bien tu pregunta. ¿Podrías reformularla para que pueda ayudarte mejor?', 'Parece que no entendí bien tu pregunta. ¿Podrías repetirla o aclararla un poco más?']
        return alts[Math.floor(Math.random() * alts.length)]
    }
}
export async function imageToText(image) {
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
                        image: image,
                    },
                ],
            },
        ],
    });
    return result.text;
}
export async function evaluate({ messages, curriculum, empleo }) {
    const  result =await generateText({
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
          ${empleo.replaceAll('\n', ' ')}
          la persona es la siguiente:
          ${curriculum}
          los mensajes son los siguientes:
          ${JSON.stringify(messages)}
         solo responde si lo llamaron o no y el motivo de tu respuesta hacelo de manera comica y creativa, maximo 2 lineas
          `
      })
      console.log(result.text)
  }