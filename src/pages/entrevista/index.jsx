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
    const emotion = messages.length > 0 ? messages[messages.length - 1].parts[0].text.split(':')[0].toLowerCase() : 'neutral'
    const [socket, setSocket] = useState()
    const [type, setType] = useState('text')
    const navigate = useNavigate()
    useEffect(async () => {
        music.src = '/music/funny.mp3'
        music.play()
        const sk = getSocket()
        setSocket(sk)
        console.log('socket connected')
        !data.entrevistador ? data.entrevistador = await getEntrevistador() : null
        console.log('entrevistador loaded')
        data.curriculum.image = await imageToText(curriculum.image || data.curriculum.image)
        console.log('image to text')
        localStorage.setItem('data', JSON.stringify(data))
        console.log('local data saved')
        setData(data)
        console.log('data loaded')
        const lastIsUser =messages > 0 && messages[messages.length - 1].role === 'user'
        const history = lastIsUser ? messages.slice(0, messages.length - 1) : messages
        sk.emit('startChat', { data: data, history: history })
        sk.on('chat', message => {
            setMessages(msgs => [...msgs, {
                role: 'model', parts: [{ text: message }]
            }])
            const msgInp = document.getElementById('msgInp')
            msgInp.removeAttribute('disabled')
        })
        if (lastIsUser) sk.emit('chat', { message: messages[messages.length - 1].parts[0].text })
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
            parts: [{ text: message }]

        }]
        setMessages(newMessages)
        e.target.reset()
        if (messages.filter(msg => msg.role === 'user').length >= 9) {
            setMessages(msgs => [...msgs, {
                role: 'model', parts: [{ text: despedirse(emotion) }]
            }
            ])

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
            socket.emit('chat', { message })
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
            <section className="h-screen w-[50vw] bg-gray-100 flex flex-col relative" >
                <span className="absolute text-lg text-black top-0 right-0  bg-gray-300 p-1 w-full text-end shadow-sm shadow-black">
                    {messages.filter(msg => msg.role === 'user').length || 0}/10
                </span>
                <Messages messages={messages} curriculum={{ name: 'juan' }} entrevistador={data.entrevistador} />
                <form className="p-5 flex gap-2 items-center justify-between overflow-auto" onSubmit={handleSubmit}>
                    <div className="nes-select w-48">
                        <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value='text'> texto</option>
                            <option value="image">imagen</option>
                        </select>
                    </div>

                    <input id="msgInp" name="message" type="text" className="w-full h-10 focus:outline-none p-2 text-lg nes-input" hidden={type !== 'text'} />
                    <Draw hidden={type !== 'image'} />
                    <button type="submit" className="bg-contain bg-no-repeat bg-center flex justify-center items-center active:scale-95 transition-transform nes-btn is-success" >
                        <Messageprocessing color='white' height={40} width={40} />
                    </button>
                </form>
            </section>
        </section>
    )
}