import { useEffect, useState } from "preact/hooks"
import Messages from "./messages";
import { getSocket, getEntrevistador } from "./utils";
export default ({ curriculum, empleo }) => {
    const [messages, setMessages] = useState([])
    const [emotion, setEmotion] = useState('neutral')
    const [entrevistador, setEntrevistador] = useState()
    const [socket, setSocket] = useState()
    const [personaje, setPersonaje] = useState()
    useEffect(async () => {
        music.src = '/music/funny.mp3'
        music.play()
        setPersonaje(Math.floor(Math.random() * 3) + 1)
        const sk = getSocket()
        const entrevistador = await getEntrevistador()
        setSocket(sk)
        setEntrevistador(entrevistador)
        sk.emit('data', {
            empleo,
            entrevistador,
            curriculum,
        })
        sk.on('data', () => {
            sk.emit('chat', { messages })
            sk.on('chat', message => {
                const emotion = toString(message.split(':')[0])
                setEmotion(emotion.toLowerCase())
                setMessages(msgs => [...msgs, { role: 'assistant', content: message }])
                const msgInp = document.getElementById('msgInp')
                msgInp.removeAttribute('disabled')
            })
        })
    }, [])
    const handleSubmit = e => {
        e.preventDefault()
        const data = new FormData(e.target)
        const message = data.get('message')
        if (!message) return
        const newMessages = [...messages, {
            role: 'user',
            content: message
        }]
        setMessages(newMessages)
        e.target.reset()
        socket.emit('chat', { messages: newMessages })
        const msgInp = document.getElementById('msgInp')
        msgInp.setAttribute('disabled', true)
    }
    return (
        <section className="flex">
            <section className="relative">

                {entrevistador && <img src={`/characters/${entrevistador.gender}/${personaje}/${emotion}.png`} className="absolute top-[31.8%] left-[30%] h-[40vh] w-[20vw]" alt="" />}
                <img src="/oficina.jpg" draggable={false} className="h-screen w-[50vw]" alt="" />
            </section>
            <section className="h-screen w-[50vw] bg-gray-800 flex flex-col" >
                <Messages messages={messages} curriculum={curriculum} entrevistador={entrevistador} />

                <form className="p-5 flex gap-2 items-center" onSubmit={handleSubmit}>
                    <input disabled id="msgInp" name="message" type="text" className="w-full h-10 focus:outline-none p-2 text-xl    " />
                    <button type="submit" className="bg-contain bg-no-repeat bg-center p-5 flex justify-center items-center active:scale-95 transition-transform" style={{ backgroundImage: 'url(/buttons/small-green.png)' }}>
                        <img src="/icons/message-processing.svg" className="invert mx-2" height={40} width={40} alt="" />
                    </button>
                </form>
            </section>
        </section>
    )
}