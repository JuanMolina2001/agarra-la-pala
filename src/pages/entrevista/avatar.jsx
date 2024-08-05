import { useEffect } from "preact/hooks"

export default ({ data, emotion }) => {
    useEffect(() => {
        if (emotion === 'neutral') return
        sound.src = `sounds/voices/${data.entrevistador.gender}/${emotion}.wav`
        sound.play()
    }, [emotion])
    return (
        <section className="relative">
            {data.entrevistador && <img onError={(e) => {
                e.target.onerror = null
                e.target.src = `characters/${data.entrevistador.gender}/${data.entrevistador.personaje}/neutral.png`
            }} src={`characters/${data.entrevistador.gender}/${data.entrevistador.personaje}/${emotion || 'neutral'}.png`} className="absolute top-[31.8%] left-[30%] h-[40vh] w-[20vw]" alt="" />}
            <img src="oficina.jpg" draggable={false} className="h-screen w-[50vw]" alt="" />
        </section>
    )
}