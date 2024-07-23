export default ({ empleos, setCurrent, current }) => {
    const EmpleoItem = ({ empleo, onClick, index }) => {
        return (
            <button className={`w-96 flex gap-2 p-2 border-b items-center ${current === index && 'selected'}`} onClick={onClick}>
                <img src="/icons/buildings.svg" className="h-20 w-auto opacity-65" alt="" />
                <p className="text-sky-700 font-bold text-lg text-start">
                    {empleo.replace(/#/g, '')}
                </p>
            </button>
        )
    }
    return (
        <section className="bg-white  flex-1  border-r-2 relative [&_.selected]:bg-gray-100">
            <div id="empleoList" className="overflow-y-auto w-full h-full">
                {empleos.length !== 0 ?
                    empleos.map((empleo, i) => <EmpleoItem key={i} index={i} onClick={() => {
                        setCurrent(i)
                    }} empleo={empleo.split('\n')[0]} />)
                    :
                    <div className="w-full h-full flex justify-center items-center" id="list">
                        <p className="text-xl p-2">
                            Busca empleos para mostrarlos aquí
                        </p>
                    </div>

                }
            </div>

            <div className="loader absolute top-1/2 left-1/2" style={{ display: 'none' }}></div>
        </section>

    )
}