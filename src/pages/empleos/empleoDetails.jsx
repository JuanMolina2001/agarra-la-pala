import { useEffect, useRef, useState } from "preact/hooks";
import { marked } from "marked"
import { useNavigate } from "react-router-dom";
export default ({ empleo, setEmpleo }) => {
    const navigate = useNavigate()

    return (
        <section className="bg-white [&_h2]:text-2xl overflow-y-auto  flex flex-col gap-2 w-[40vw] max-w-[40vw] [&_ul]:list-disc [&_ul]:pl-8 p-5">
            <div className="flex flex-col gap-2" dangerouslySetInnerHTML={{ __html: marked.parse(empleo) }}></div>
            {empleo &&
                <button className=" text-white p-3 text-2xl bg-contain bg-no-repeat bg-center active:scale-95 transition-all " style={{ backgroundImage: 'url(/buttons/small-blue.png)' }} onClick={(e) => {
                    setEmpleo(empleo)
                    navigate('/interview')
                }} >
                    Aplicar
                </button>
            }
        </section>
    )
}