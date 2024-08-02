import { Routes, Route, Link } from "react-router-dom"
import { Empleos, Entrevista, Home, Result } from "./pages"
import { useEffect, useState } from "preact/hooks"
import { getSocket } from "./pages/entrevista/utils";
import { Alert } from "./components/icons";
export function App() {
  const [error, setError] = useState('')
  useEffect(() => {
    const addClickEventListener = (el) => {
      el.addEventListener('click', () => {
        sound.src = '/sounds/click.mp3';
        sound.play();
      });
      const socket = getSocket()
      socket.on('error', data => {
        setError(data)
      })
    };

    Array.from(document.getElementsByClassName('active:scale-95')).forEach(addClickEventListener);
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.classList.contains('active:scale-95')) {
              addClickEventListener(node);
            }
            if (node.nodeType === 1) {
              Array.from(node.getElementsByClassName('active:scale-95')).forEach(addClickEventListener);
            }
          });
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  const [empleo, setEmpleo] = useState()
  const [curriculum, setCurriculum] = useState({})

  return (
    <div className="h-screen w-screen relative">
      <Routes>
        <Route path='/' element={<Home setEmpleo={setEmpleo}  />} />
        <Route path='/job' element={<Empleos setCurriculum={setCurriculum} setEmpleo={setEmpleo} curriculum={curriculum} />} />
        <Route path='/interview' element={<Entrevista curriculum={curriculum} empleo={empleo} />} />
        <Route path='/result/:text' element={<Result />} />
        <Route path='*' element={<Home setEmpleo={setEmpleo} />} />
      </Routes>
      <div id="error" className={`absolute w-screen h-screen z-50 top-0 left-0 backdrop-brightness-75 flex justify-center items-center ${!error && 'hidden'}`}>
        <div className=" w-1/4 h-1/4 flex flex-col bg-orange-100 shadow-[7px_7px_0px_1px_rgba(0,0,0,0.75)] ">
          <header className="bg-orange-800 text-white p-2">
            Error
          </header>
          <div className="grid grid-cols-3 grid-rows-2 h-full w-full">
            <div className="col-span-1 row-span-1 p-2 text-center ">
              <Alert height={80} width={80} color='red' className='' />
            </div>
            <div className="col-span-2  flex  items-center">
              <p> {error}</p>
            </div>
            <div className="col-span-3 flex justify-around items-center">
              <Link to={'/'} className="bg-red-600 text-white px-7 p-2" onClick={() => {
                setError('')
              }}>
                Volver al inicio
              </Link>
              <button className="border border-black px-7 p-2 " onClick={()=>{
                window.location.reload()
                setError('')
              }}>
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
