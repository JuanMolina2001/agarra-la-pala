import { Routes, Route, useNavigate } from "react-router-dom"
import { Empleos, Entrevista, Home, Result } from "./pages"
import { useEffect, useState } from "preact/hooks"
import { socket } from "./pages/entrevista/utils";
import { Alert } from "./components/icons";

export function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const addClickEventListener = (el) => {
      el.addEventListener('click', () => {
        sound.src = '/sounds/click.mp3';
        sound.play();
      });
      socket.on('error', data => {
       showModal(data,true)
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
        <Route path='/' element={<Home setEmpleo={setEmpleo} />} />
        <Route path='/job' element={<Empleos setCurriculum={setCurriculum} setEmpleo={setEmpleo} curriculum={curriculum} />} />
        <Route path='/interview' element={<Entrevista curriculum={curriculum} empleo={empleo} />} />
        <Route path='/result/:text' element={<Result />} />
        <Route path='*' element={<Home setEmpleo={setEmpleo} />} />
      </Routes>

    </div>
  )
}
