import { useEffect } from "preact/hooks"
import { evaluate, lastMessage } from "./utils";
import { useNavigate } from "react-router-dom";
export default ({ messages, curriculum, entrevistador, data }) => {
    const navigate = useNavigate()
    const limit = messages.filter(msg => msg.role === 'user').length >= 10
    useEffect(() => {
        if (messages.length === 0) return
        localStorage.setItem('messages', JSON.stringify(messages))
        const container = document.querySelector('.nes-container')
        container.scrollTop = container.scrollHeight
        if (limit) {
            evaluate({
                ...data,
                messages
            }).then(res => {
                const input = document.querySelector('#form input')
                input && input.remove()

                const button = document.querySelector('#form button')
                button.innerHTML = 'Finalizar'
                button.addEventListener('click', () => {
                    localStorage.setItem('result', res)
                    navigate(`/result`)
                })
            })
        }
    }, [messages])
    return (
        <section class="nes-container flex-1 overflow-auto scroll-smooth mt-7">
            <section class="message-list w-full" i>
                {
                    messages.map((message, i) => {
                        const direction = message.role === 'user'
                        return (
                            <section class={`flex flex-col  items-${direction ? 'end' : 'start'} w-full`}>
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
                {
                    entrevistador
                    &&
                    <section class={`flex flex-col  items-start ${!limit && 'hidden'} w-full`}>
                        <p>
                            {entrevistador.name}
                        </p>
                        <div class={`nes-balloon w-fit from-left`}>
                            <p>
                                {lastMessage}
                            </p>
                        </div>
                    </section>
                }
            </section>
        </section>

    )
}
