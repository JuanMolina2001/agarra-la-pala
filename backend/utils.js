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