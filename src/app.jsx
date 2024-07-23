import { Routes, Route } from "react-router-dom"
import { Empleos, Entrevista, Home } from "./pages"
import { useEffect, useState } from "preact/hooks"
export function App() {
  useEffect(() => {
    const addClickEventListener = (el) => {
      el.addEventListener('click', () => {
        sound.src = '/sounds/click.mp3';
        sound.play();
      });
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
  const [curriculum, setCurriculum] = useState()

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/game' element={
        curriculum && empleo
          ? <Entrevista curriculum={curriculum} empleo={empleo} />
          : <Empleos setCurriculum={setCurriculum} setEmpleo={setEmpleo} />
      } />
      <Route path='*' element={<Home />} />
    </Routes>
  )
}
