import { Link } from "react-router-dom"
import { Config } from "../../components/"
export default () => {
    return (
        <div id="config" className="flex gap-5 justify-center items-center flex-col  absolute top-0 left-0 z-30 w-screen h-screen backdrop-brightness-50 transition-all " style={{ opacity: '0', pointerEvents: 'none' }}>
            <div className="flex gap-5 bg-white overflow-y-auto h-[70vh] text-black shadow-[7px_7px_0px_1px_rgba(0,0,0,0.75)]  flex-col p-10 w-[30vw] [&_h1]:text-4xl [&_h2]:text-lg [&_h1]:font-bold [&_h2]:font-bold [&_p]:text-lg ">
                <Config color='black'/>
                <Link to="/" className=" text-white p-3 text-lg  bg-contain bg-no-repeat bg-center active:scale-95 transition-all w-fit self-center nes-btn is-error" >
                    Menu
                </Link>
            </div>
            <button className=" text-white p-3 text-lg bg-contain bg-no-repeat bg-center active:scale-95 transition-all nes-btn is-success"  onClick={(e) => {
                document.getElementById('config').style = 'opacity: 0; pointer-events: none'
            }} >
                Cerrar
            </button>
        </div>
    )
}