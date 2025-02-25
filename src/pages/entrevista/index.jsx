import { useEffect, useState } from "preact/hooks"
import Messages from "./messages";
import { socket, getEntrevistador, imageToText } from "./utils";
import Form from "./form";
import Avatar from "./avatar";
export default ({ curriculum, empleo }) => {
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || [])
    const addMessage = (role, text) => {
        setMessages(msgs => [...msgs, {
            role: role,
            parts: [{ text: text }]
        }])
    }
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || {
        curriculum: curriculum,
        empleo: empleo,
        entrevistador: null
    })

    useEffect(async () => {
        music.src = 'music/funny.mp3'
        music.pause()
        music.loop = true
        if (!data.empleo) {
            showModal('Error al registrar los datos', false)
            return
        }

        if (!JSON.parse(localStorage.getItem('data'))) {
            data.entrevistador ??= await getEntrevistador();
            data.curriculum.image = await imageToText(curriculum.image || data.curriculum.image)
            localStorage.setItem('data', JSON.stringify(data))
            setData(data)
        }
        const lastIsUser = messages.length > 0 && messages[messages.length - 1].role === 'user'
        const history = lastIsUser ? messages.slice(0, messages.length - 1) : messages
        socket.emit('startChat', { data: data, history: history })
        socket.on('chat', message => {
            if (music.paused) {
                music.play()
            }
            document.querySelector('.classic-loader').style.display = 'none'
            document.getElementById('app').classList.remove('opacity-0')
            addMessage('model', message)
            const msgInp = document.getElementById('msgInp')
            msgInp.removeAttribute('disabled')
        })
        if (lastIsUser) socket.emit('chat', { message: messages[messages.length - 1].parts[0].text })
        return () => {
            socket.off('chat')
        }
    }, [])

    return (
        <section className="flex">
            <Avatar data={data} emotion={messages.length > 0 ? messages[messages.length - 1].parts[0].text.split(':')[0].toLowerCase() : 'neutral'} />
            <section className="h-screen w-[50vw] bg-gray-100 flex flex-col relative" >
                <span className="absolute text-lg text-black top-0 right-0  bg-gray-300 p-1 w-full text-end shadow-sm shadow-black">
                    {messages.filter(msg => msg.role === 'user').length || 0}/10
                </span>
                <Messages data={data} addMessage={addMessage} messages={messages} curriculum={curriculum} entrevistador={data.entrevistador} />
                <Form setMessages={setMessages} />
            </section>
        </section>
    )
}