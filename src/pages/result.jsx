import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
export default () => {
    const { text } = useParams()
    return (
        <div className="bg-slate-400 flex items-center justify-center h-screen flex-col gap-10 " >
            <div className="p-4 text-6xl  [&_p]:text-3xl font-bold text-center" dangerouslySetInnerHTML={{ __html: marked.parse(text) }}>
            </div>
            <div className="flex gap-2">
                <Link to="/job"  className=" text-white h-20 flex justify-center items-center text-center w-40  text-lg bg-contain bg-no-repeat bg-center active:scale-95 transition-all  " style={{ backgroundImage: 'url(/buttons/small-green.png)' }}>Otra vez</Link>
                <Link to="/"  className=" text-white h-20 flex justify-center items-center text-center w-40  text-lg bg-contain bg-no-repeat bg-center active:scale-95 transition-all red" style={{ backgroundImage: 'url(/buttons/small-green.png)' }}>Volver al menu</Link>
            </div>
            <img src="/phone.png" className="h-1/2" alt="" draggable={false} />

        </div>
    )
};  