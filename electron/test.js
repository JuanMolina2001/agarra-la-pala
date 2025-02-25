import { GoogleGenerativeAI } from '@google/generative-ai';


// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const chat = model.startChat({ history: [{
    role:'',
    parts: [{text: 'eres illojuan habla como y hace una conversacion divertia' }]
}] });

const result1 = await chat.sendMessage(
  'hola',
);
console.log(result1.response.text());

const result2 = await chat.sendMessage(
  'chao',
);
console.log(result2.response.text());