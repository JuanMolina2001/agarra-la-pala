import { useEffect } from "preact/hooks"
import { despedirse, evaluate } from "./utils";
import { useNavigate } from "react-router-dom";
export default ({ messages, curriculum, entrevistador, addMessage,data }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (messages.length === 0) return
        localStorage.setItem('messages', JSON.stringify(messages))
        const container = document.querySelector('.nes-container')
        container.scrollTop = container.scrollHeight
        if (messages.filter(msg => msg.role === 'user').length >= 5) {
            messages.push({ role: 'model', parts: [{ text: despedirse() }] })
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
        }
    }, [messages])
    return (
        <section class="nes-container flex-1 overflow-auto scroll-smooth">
            <section class="message-list " i>
                {
                    messages.map((message, i) => {
                        const direction = message.role === 'user'
                        return (
                            <section class={`flex flex-col  items-${direction ? 'end' : 'start'} `}>
                                <p>
                                    {direction ? curriculum.name : entrevistador.name}
                                </p>
                                <div class={`nes-balloon w-fit from-${direction ? 'right' : 'left'}`}>
                                    <p>
                                        {message.parts[0].text}
                                    </p>
                                </div>
                            </section>
                        )
                    }
                    )}
            </section>
        </section>

    )
}
