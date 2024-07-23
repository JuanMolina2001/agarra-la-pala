import { useEffect, useRef, useState } from "preact/hooks";
import { marked } from "marked"
export default ({ empleo,  setEmpleo }) => {
    const ref = useRef()
    const [button, setButton] = useState(null)
    useEffect(() => {
        if (!button) return
        button.addEventListener('click', () => {
           setEmpleo(empleo)
        })
        return () => {
            button.removeEventListener('click', () => { })
        }
    }, [button])
    useEffect(() => {
        if (!empleo) return
        const element = ref.current;
        const button = document.createElement('button');
        button.className = "text-white p-2 my-5 active:scale-95 transition-all text-2xl bg-contain bg-no-repeat bg-center ";
        button.style.backgroundImage = "url(/buttons/small-blue.png)";
        button.id = "apply";
        button.innerHTML = "Aplicar";
        element.insertBefore(button, element.children[0].nextElementSibling)
        setButton(button)
    }, [empleo])
    return (
        <section ref={ref} className="bg-white [&_h2]:text-2xl overflow-y-auto  flex flex-col gap-2 w-[40vw] max-w-[40vw] [&_ul]:list-disc [&_ul]:pl-8 p-5" dangerouslySetInnerHTML={{ __html: marked.parse(empleo) }}>

        </section>
    )
}