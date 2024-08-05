import { useEffect, useRef, useState } from "preact/hooks";
import { pixelImage } from "./utils";
export default ({ setCurriculum, curriculum }) => {
    const [image, setImage] = useState(encodeURI('placeholder.jpg'));
    const canvas = useRef();
    useEffect(() => {
        const picture = document.querySelector('#canvas');
        const ctx = picture.getContext('2d');
        const img = new Image();
        img.src = image;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, picture.width, picture.height);
        }
    }, []);
    const handleImage = e => {
        const file = e.target.files[0];
        if (!file) return
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                const { height, width } = img;
                if (height > 200 || width > 200) {
                    toast.error('La imagen debe ser de 200x200');
                    return;
                }
                pixelImage(img);
                setImage(e.target.result);
            }
        }
        reader.readAsDataURL(file);
    }
    const Title = ({ children, icon }) => <div className="flex  gap-1  ">
        <i className={`pixelart-icons-font${icon}`}></i>
        <h3 className="text-lg font-bold">{children}</h3>
    </div>
    const TextArea = ({ name, placeholder, value }) => {
        const [length, setLength] = useState(0);
        return (
            <div className="relative">
                <textarea name={name} onChange={(e)=>{
                    setLength(e.target.value.length)
                    curriculum[name] = e.target.value
                    setCurriculum(curriculum)
                    e.target.focus()
                }} className="nes-textarea min-w-44" placeholder={placeholder} maxLength={150}>{value}</textarea>
            </div>
        )
    }
    return (
        <form id="curriculum" className="flex justify-center items-center flex-col gap-3 absolute top-0 left-0 z-30 w-screen h-screen backdrop-brightness-50 transition-all" onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            e.target.style = 'opacity:0;pointer-events:none;';
            setCurriculum({
                name: data.get('name'),
                about: data.get('about'),
                experience: data.get('experience'),
                education: data.get('education'),
                image: image
            });
        }}>
            <div className="flex justify-around bg-white overflow-y-auto h-[70vh] text-black shadow-[7px_7px_0px_1px_rgba(0,0,0,0.75)]  flex-col p-10 w-[30vw] [&_h2]:py-2 [&_h2]:font-bold  [&_textarea]:w-full [&_textarea]:focus:outline-none text-lg [&_textarea]:min-h-[10vh] ">
                <h2 className="text-4xl text-center font-bold">Curriculum</h2>
                <div className="flex w-full ">
                    <div className="w-full">
                        <Title icon="user.svg">Sobre mí</Title>
                        <TextArea value={curriculum.about} name="about" placeholder="Escribe sobre ti aquí" />
                    </div>
                    <div className="w-fit h-full flex items-center gap-1 flex-col px-2 py-7  ">
                        <canvas id="canvas" className={`nes-pointer border-dashed border-4 active:scale-95 transition-all border-black picture`} width={100} height={100} onClick={e => e.target.nextElementSibling.click()} />
                        <input type="file" name="picture" accept="image/*" className="hidden" onChange={handleImage} />
                        <span>
                            200x200
                        </span>
                        <input onChange={(e) => setCurriculum(c => ({
                            ...c,
                            name: e.target.value
                        }))} type="text" name="name" className="bg-transparent text-center text-lg font-bold w-44" placeholder="Tu nombre" >{curriculum.name}</input>
                    </div>
                </div>
                <Title icon="briefcase.svg">Experiencia</Title>
                <TextArea value={curriculum.experience} name="experience" placeholder="Escribe sobre tu experiencia aquí" />
                <Title icon="book-open.svg">Educación</Title>
                <TextArea value={curriculum.education} name="education" placeholder="Escribe sobre tu educación aquí" />
            </div>
            <button className=" is-success p-3 text-lg bg-contain bg-no-repeat bg-center active:scale-95 transition-all nes-btn">
                Guardar
            </button>
        </form>
    );
}