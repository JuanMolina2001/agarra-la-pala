import { useEffect,  useState } from "preact/hooks"
import EmpleoDetails from "./empleoDetails"
import EmpleoList from "./empleoList"
import Curriculum from "./curriculum"
import Config from "./config"
import { getEmpleo } from "./utils"
import {Sliders2, Search } from "../../components/icons"
export default ({ setEmpleo, setCurriculum,curriculum }) => {
    const [empleos, setEmpleos] = useState([])
    const [current, setCurrent] = useState(0)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const search = data.get('search')
        if (!search) return
        const empleoList = document.getElementById('empleoList')
        const loader = document.querySelector('.loader')
        loader.style = 'display:block'
        empleoList.style = 'display:none'
        const formInp = e.target.querySelectorAll('input, button')
        formInp.forEach(inp => inp.setAttribute('disabled', 'true'))
        const empleos = []
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
            const data = await getEmpleo(search, empleos)
            empleos.push(data)
        }
        formInp.forEach(inp => inp.removeAttribute('disabled'))
        loader.style = 'display:none'
        empleoList.style = 'display:block'
        setEmpleos(empleos)
    }
    useEffect(() => {
        music.src = '/music/elevator.mp3'
        music.loop = false; 
        music.play();
    
        const handleEnd = () => {
          music.currentTime = 0;
          music.play(); // Reproducir nuevamente
        };
        music.addEventListener('ended', handleEnd);
        return () => music.pause()
    }, [])

    return (
        <div className=" bg-slate-400 flex flex-col h-screen relative">
            <Curriculum setCurriculum={setCurriculum} curriculum={curriculum} />
            <Config />
            <header className="p-2 flex gap-3 items-center justify-center w-full bg-white shadow-md shadow-[#00000050] z-20">
                <img draggable={false} src="/link.png" height={50} width={50} alt="" />
                <form className="flex gap-1" onSubmit={handleSubmit}>
                    <input id="search" name="search" type="text" className="bg-slate-200 focus:outline-none p-2 h-11 text-lg" placeholder="Buscar empleos ..." />
                    <button className="active:scale-95 transition-all" >
                        <Search color={'black'} height={30} width={30} />
                    </button>
                </form>
                <button className=" text-white p-3 text-lg h-14 overflow-hidden bg-contain bg-no-repeat bg-center active:scale-95 transition-all" style={{ backgroundImage: 'url(/buttons/circle.png)' }} onClick={() => {
                    const element = document.getElementById('curriculum')
                    element.style = 'opacity:1;pointer-events:all;'

                }}>
                    <canvas className="picture" height={30} width={30} ></canvas>
                </button>
                <button className="active:scale-95 transition-all"  onClick={() => {
                    const element = document.getElementById('config')
                    element.style = 'opacity:1;pointer-events:all;'

                }}>
                    <Sliders2 color={'black'} height={30} width={30} />
                </button>
            </header>
            <main className="flex  h-full  self-center w-[60vw]">
                <EmpleoList current={current} empleos={empleos} setCurrent={setCurrent} />
                <EmpleoDetails empleo={empleos.length !== 0 ? empleos[current] : ''} setEmpleo={setEmpleo} />
            </main>
        </div>
    )
}