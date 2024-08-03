import { useEffect } from "preact/hooks"

export default ({ messages,curriculum , entrevistador  }) => {
    
    useEffect(() => {
        const container = document.querySelector('.message-list')
        container.scrollTop = container.scrollHeight
    }, [messages])
    return (
        <section class="nes-container flex-1 overflow-auto">
            <section class="message-list" i>
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
