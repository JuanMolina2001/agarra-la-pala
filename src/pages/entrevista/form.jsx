import { imageToText, socket } from "./utils"
import Draw from "./draw";
import { Messageprocessing, } from "../../components/icons";
import { useState } from "preact/hooks";
export default ({ setMessages }) => {
    const [type, setType] = useState('text')
    const handleSubmit = async e => {
        e.preventDefault()
        const dataForm = new FormData(e.target)
        document.getElementById('canvasContainer').classList.add('hidden')
        let message
        if (dataForm.get('type') === 'text') {
            message = dataForm.get('message')
        } else {
            const res = await imageToText(document.getElementById('canvas').toDataURL())
            message = `mire este dibujo : ${res}`
            setType('text')
        }
        if (!message) return
        e.target.reset()
        socket.emit('chat', { message })
        const msgInp = document.getElementById('msgInp')
        msgInp.setAttribute('disabled', true)
        msgInp.focus()
        setMessages(messages=>[...messages, { role: 'user', parts: [{ text: message }] }])
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