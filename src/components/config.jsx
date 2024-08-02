import { useState } from 'preact/hooks'
import {Volume1, Volumex} from '../components/icons'
export default ({ color}) => {
    const Range = ({ target }) => {
        const [mute , setMute] = useState(target.muted)
        return (
            <div className="flex gap-2">
                <button onClick={(e) => {
                        target.muted = !target.muted
                        setMute(target.muted)
                    }}>
                   {
                          !target.muted ? <Volume1 height={30} width={30}  className=' transition-all active:scale-95 cursor-pointer' color={color}  /> : <Volumex height={30} width={30}  className='transition-all active:scale-95 cursor-pointer' color={color} />  
                   }
                </button>

                <input type="range" name="sound" id="sound" min="0" max="1" step="0.01" value={target.volume} onChange={(e) => {
                    target.volume = parseFloat(e.target.value);
                    e.target.nextElementSibling.innerHTML = parseInt(target.volume * 100) + '%'
                }} />
                <p className="text-xl">
                    {target.volume * 100 + '%'}
                </p>

            </div>
        )
    }
    return (
        <>
            <h1 className="">
                Configuración
            </h1>
            <h2 className="">
                Sonido
            </h2>
            <p>
                Efectos de sonido
            </p>
            <Range target={sound} />
            <p>
                Música
            </p>
            <Range target={music} />
        </>
    )
}