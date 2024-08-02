import { Link } from "react-router-dom"
import { Config } from "../../components/"
export default () => {
    return (
        <div id="config" className="flex gap-5 justify-center items-center flex-col  absolute top-0 left-0 z-30 w-screen h-screen backdrop-brightness-50 transition-all " style={{ opacity: '0', pointerEvents: 'none' }}>
            <div className="flex gap-5 bg-white overflow-y-auto h-[70vh] text-black shadow-[7px_7px_0px_1px_rgba(0,0,0,0.75)]  flex-col p-10 w-[30vw] [&_h1]:text-4xl [&_h2]:text-2xl [&_h1]:font-bold [&_h2]:font-bold [&_p]:text-xl ">
                <Config />
                <Link to="/" className=" text-white p-3 text-2xl  bg-contain bg-no-repeat bg-center active:scale-95 transition-all w-fit self-center red" style={{ backgroundImage: 'url(/buttons/small-green.png)' }}>
                    Menu
                </Link>
            </div>
            <button className=" text-white p-3 text-2xl bg-contain bg-no-repeat bg-center active:scale-95 transition-all " style={{ backgroundImage: 'url(/buttons/small-green.png)' }} onClick={(e) => {
                document.getElementById('config').style = 'opacity: 0; pointer-events: none'
            }} >
                Cerrar
            </button>
        </div>
    )
}