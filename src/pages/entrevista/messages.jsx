import { useEffect } from "preact/hooks"

export default ({ messages, entrevistador, curriculum }) => {
    useEffect(() => {
        const container = document.getElementById('messagesContainer')
        container.scrollTop = container.scrollHeight
    }, [messages])
    return (
        <div className="flex-1 overflow-y-auto mt-3" id="messagesContainer">
            {
                messages.map((message, i) => {
                    if (message.role === 'user') {
                        return (
                            <div className="flex flex-col items-end m-5 text-white text-xl message">
                                <p className="">
                                    {curriculum.name}
                                </p>
                                <div className="bg-green-500   p-2">
                                    {message.content[0].text}
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div className="flex flex-col text-white  m-5 text-xl w-fit">
                            {entrevistador.name}
                            <div className="bg-gray-700  p-2 ">
                                {message.content[0].text}
                            </div>
                        </div>)
                })
            }
        </div>
    )
}