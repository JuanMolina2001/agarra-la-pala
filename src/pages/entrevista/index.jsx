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
    const [type, setType] = useState('text')
    useEffect(async () => {
        if (!data.empleo) {
            showModal('Error en los datos', false)
        }
        music.src = '/music/funny.mp3'
        music.play()
        data.entrevistador = !data.entrevistador && await getEntrevistador()
        data.curriculum.image = await imageToText(curriculum.image || data.curriculum.image)
        localStorage.setItem('data', JSON.stringify(data))
        setData(data)
        const lastIsUser = messages > 0 && messages[messages.length - 1].role === 'user'
        const history = lastIsUser ? messages.slice(0, messages.length - 1) : messages
        socket.emit('startChat', { data: data, history: history })
        socket.on('chat', message => {
            addMessage('model', message)
            const msgInp = document.getElementById('msgInp')
            msgInp.removeAttribute('disabled')
        })
        if (lastIsUser) sk.emit('chat', { message: messages[messages.length - 1].parts[0].text })
    }, [])

    return (
        <section className="flex">
            <Avatar data={data} emotion={messages.length > 0 ? messages[messages.length - 1].parts[0].text.split(':')[0].toLowerCase() : 'neutral'}/>
            <section className="h-screen w-[50vw] bg-gray-100 flex flex-col relative" >
                <span className="absolute text-lg text-black top-0 right-0  bg-gray-300 p-1 w-full text-end shadow-sm shadow-black">
                    {messages.filter(msg => msg.role === 'user').length || 0}/10
                </span>
                <Messages messages={messages} curriculum={{ name: 'juan' }} entrevistador={data.entrevistador} />
                <Form type={type} setType={setType} addMessage={addMessage} messages={messages} setMessages={setMessages} />
            </section>
        </section>
    )
}