import { useEffect, useState } from "preact/hooks"
import Messages from "./messages";
import { getSocket, getEntrevistador, despedirse, evaluate, imageToText } from "./utils";
import { useNavigate } from "react-router-dom";
import Draw from "./draw";
import { Messageprocessing, } from "../../components/icons";
export default ({ curriculum, empleo }) => {
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || [])
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || {
        curriculum: curriculum,
        empleo: empleo,
        entrevistador: null
    })
    const emotion = messages.length >0 ? messages[messages.length - 1].content[0].text.split(':')[0].toLowerCase() : 'neutral'
    const [socket, setSocket] = useState()
    const [type, setType] = useState('text')
    const navigate = useNavigate()
    useEffect(async () => {
        music.src = '/music/funny.mp3'
        music.play()
        const sk = getSocket()
        setSocket(sk)
        !data.entrevistador ? data.entrevistador = await getEntrevistador() : null
        data.curriculum.image = await imageToText(curriculum.image || data.curriculum.image)
        localStorage.setItem('data', JSON.stringify(data))
        setData(data)
        if (messages[0]?.role !== 'assistant' || !messages) sk.emit('chat', { data: data, messages: messages })
        sk.on('chat', message => {
            setMessages(msgs => [...msgs, {
                role: 'assistant', content: [{
                    type: 'text',
                    text: message

                }]
            }])
            const msgInp = document.getElementById('msgInp')
            msgInp.removeAttribute('disabled')
        })

    }, [])
    useEffect(() => {
        if (messages.length === 0) return
        localStorage.setItem('messages', JSON.stringify(messages))
    }, [messages])
    useEffect(() => {
        sound.src = `${emotion}.mp3`
        sound.play()
    }, [emotion])
    const handleSubmit = async e => {
        e.preventDefault()
        const dataForm = new FormData(e.target)
        const type = dataForm.get('type')
        const canvas = document.getElementById('canvasContainer')
        canvas.classList.add('hidden')
        let message
        if (type === 'image') {
            const canvas = document.getElementById('canvas')
            const image = canvas.toDataURL()
            const res = await imageToText(image)
            message = `mire este dibujo : ${res}`
            setType('text')
        } else {
            message = dataForm.get('message')
        }
        if (!message) return
        const newMessages = [...messages, {
            role: 'user',
            content: [
                {
                    type: 'text',
                    text: message
                }
            ]
        }]
        setMessages(newMessages)
        e.target.reset()
        if (messages.filter(msg => msg.role === 'user').length >= 9) {
            setMessages(msgs => [...msgs, {
                role: 'assistant', content: [
                    { type: 'text', text: despedirse(emotion) }
                ]
            }])

            evaluate({
                ...data,
                messages: newMessages
            }).then(res => {
                e.target.querySelector('input').remove()
                e.target.querySelector('button').innerHTML = 'Finalizar'
                e.target.querySelector('button').addEventListener('click', () => {
                    navigate('/result/' + res)
                })
            })
            return
        } else {
            socket.emit('chat', { messages: newMessages, data: data })
        }
        const msgInp = document.getElementById('msgInp')
        msgInp.setAttribute('disabled', true)
        msgInp.focus()
    }

    return (
        <section className="flex">
            <section className="relative">
                {data.entrevistador && <img onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `/characters/${data.entrevistador.gender}/${data.entrevistador.personaje}/neutral.png`
                }} src={`/characters/${data.entrevistador.gender}/${data.entrevistador.personaje}/${emotion || 'neutral'}.png`} className="absolute top-[31.8%] left-[30%] h-[40vh] w-[20vw]" alt="" />}
                <img src="/oficina.jpg" draggable={false} className="h-screen w-[50vw]" alt="" />
            </section>
            <section className="h-screen w-[50vw] bg-gray-800 flex flex-col relative" >
                <span className="absolute text-2xl text-white top-0 right-0  bg-gray-800 p-1 w-full text-end">
                    {messages.filter(msg => msg.role === 'user').length || 0}/10
                </span>
                <Messages messages={messages} curriculum={{ name: 'juan' }} entrevistador={data.entrevistador} />
                <form className="p-5 flex gap-2 items-center justify-between overflow-auto" onSubmit={handleSubmit}>
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value='text'> texto</option>
                        <option value="image">imagen</option>
                    </select>
                    <input id="msgInp" name="message" type="text" className="w-full h-10 focus:outline-none p-2 text-xl" hidden={type !== 'text'} />
                    <Draw hidden={type !== 'image'} />
                    <button type="submit" className="bg-contain bg-no-repeat bg-center p-5 flex justify-center items-center active:scale-95 transition-transform" style={{ backgroundImage: 'url(/buttons/small-green.png)' }}>
                        <Messageprocessing color='white' height={40} width={40} />
                    </button>
                </form>
            </section>
        </section>
    )
}