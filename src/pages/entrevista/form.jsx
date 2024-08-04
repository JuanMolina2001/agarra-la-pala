import { imageToText, despedirse, evaluate, socket } from "./utils"
import { useNavigate } from "react-router-dom"
import Draw from "./draw";
import { Messageprocessing, } from "../../components/icons";
export default ({ type, setType, addMessage, messages, setMessages }) => {
    const navigate = useNavigate()
    const handleSubmit = async e => {
        e.preventDefault()
        const dataForm = new FormData(e.target)
        document.getElementById('canvasContainer').classList.add('hidden')
        let message
        if (dataForm.get('type') === 'image') {
            const res = await imageToText(document.getElementById('canvas').toDataURL())
            message = `mire este dibujo : ${res}`
            setType('text')
        } else {
            message = dataForm.get('message')
        }
        if (!message) return
        messages.push({ role: 'user', parts: [{ text: message }] })
        setMessages(messages)
        e.target.reset()
        if (messages.filter(msg => msg.role === 'user').length >= 9) {
            addMessage('model', despedirse())
            evaluate({
                ...data,
                messages
            }).then(res => {
                e.target.querySelector('input').remove()
                const button = e.target.querySelector('button')
                button.innerHTML = 'Finalizar'
                button.addEventListener('click', () => {
                    navigate(`/result/_${res}`)
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
    )
}