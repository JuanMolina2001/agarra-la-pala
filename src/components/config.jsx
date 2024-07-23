export default ({white}) => {
    const Range = ({ target }) => {
        return (
            <div className="flex gap-2">
                <img height={30} width={30} src={ target.muted ? '/icons/volume-x.svg' : '/icons/volume-1.svg'} className={`${white && 'invert'} transition-all active:scale-95 cursor-pointer`} draggable={false} alt="" onClick={(e) => {
                    target.muted = !target.muted
                    e.target.src = target.muted ? '/icons/volume-x.svg' : '/icons/volume-1.svg'
                }} />
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