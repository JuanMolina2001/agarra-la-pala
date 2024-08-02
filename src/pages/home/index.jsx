import { Link } from "react-router-dom"
import { Config } from "../../components"
import { useEffect, useState } from "preact/hooks"
import Tutorial from "./tutorial"
const display = {
    '': null,
    'Configuraciones': <Config color='white' />,
    'Como Jugar': <Tutorial />
}
export default ({setEmpleo}) => {
    useEffect(() => {
        localStorage.removeItem('messages')
        localStorage.removeItem('data')
        setEmpleo('')
        music.pause()
    }, [])
    const [component, setComponent] = useState('')
    const handleComponent = (e) => {
        setComponent(e.target.innerText)
    }
    const Main = () => {
        return (
            <>
                <Link className="active:scale-95" to="/job"> Nueva Partida</Link>
                <button className="active:scale-95" onClick={handleComponent}>Configuraciones</button>
                <button className="active:scale-95" onClick={handleComponent}>Como Jugar</button>
            </>
        )
    }
    return (
        <main id='home' class="bg-contain bg-no-repeat text-white bg-center  items-center h-screen flex flex-col gap-5">
            <h1 class="gameTitle text-8xl ">Agarra la pala</h1>
            <div class="*:h-fit   items-center flex flex-col w-fit p-5 px-20 gap-2 text-lg b bg-gray-900 border-8 transition-all">
                {!component && <Main />}
                {display[component]}
                <button className={`${!component && 'hidden'} active:scale-95`} onClick={() => setComponent('')}>Atrás</button>
            </div>

        </main>


    )
}