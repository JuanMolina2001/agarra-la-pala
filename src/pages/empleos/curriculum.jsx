import { useEffect, useRef, useState } from "preact/hooks";
import { pixelImage } from "./utils";
export default ({ setCurriculum }) => {
    const [image, setImage] = useState(encodeURI('/placeholder.jpg'));
    const canvas = useRef();
    useEffect(() => {
        // const pictures = document.querySelectorAll('.picture');
        // pictures.forEach(picture => {

        // });
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
                console.log(height, width);
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
    const H2 = ({ children, icon }) => <div className="flex border-b-2 gap-1 border-current ">
        <img draggable={false} height={40} width={40} src={`/icons/${icon}`} alt="" />
        <h2 className="text-2xl font-bold">{children}</h2>
    </div>
    const TextArea = ({ name, placeholder }) => {
        const [length, setLength] = useState(0);
        return (
            <div className="relative">
                <textarea name={name} className="" placeholder={placeholder} onChange={e => setLength(e.target.value.length)} maxLength={150}></textarea>
                <span className="absolute bottom-0 right-0 m-2 text-sm">
                    {length}/150
                </span>
            </div>
        )
    }
    return (
        <form id="curriculum" className="flex justify-center items-center flex-col gap-3 absolute top-0 left-0 z-30 w-screen h-screen backdrop-brightness-50 transition-all" onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            const json = {
                name: data.get('name'),
                about: data.get('about'),
                experience: data.get('experience'),
                education: data.get('education'),
                image: image
            };
            e.target.style = 'opacity:0;pointer-events:none;';
            setCurriculum(json);
        }}>
            <div className="flex justify-around bg-white overflow-y-auto h-[70vh] text-black shadow-[7px_7px_0px_1px_rgba(0,0,0,0.75)]  flex-col p-10 w-[30vw] [&_h2]:py-2 [&_h2]:font-bold  [&_textarea]:w-full [&_textarea]:focus:outline-none text-xl [&_textarea]:min-h-[10vh] ">
                <h1 className="text-4xl text-center font-bold">Curriculum</h1>
                <div className="flex w-full ">
                    <div className="w-full">
                        <H2 icon="user.svg">Sobre mí</H2>
                        <TextArea name="about" placeholder="Escribe sobre ti aquí" />
                    </div>
                    <div className="w-fit h-full flex items-center gap-1 flex-col px-2 py-7  ">
                        <canvas id="canvas" className={`cursor-pointer border-dashed border-4 active:scale-95 border-black picture`} width={100} height={100} onClick={e => e.target.nextElementSibling.click()} />
                        <input type="file" name="picture" accept="image/*" className="hidden" onChange={handleImage} />
                        <span>
                            200x200
                        </span>
                        <input type="text" name="name" className="bg-transparent text-center text-xl font-bold" placeholder="Tu nombre" />
                    </div>
                </div>
                <H2 icon="briefcase.svg">Experiencia</H2>
                <TextArea name="experience" placeholder="Escribe sobre tu experiencia aquí" />
                <H2 icon="book-open.svg">Educación</H2>
                <TextArea name="education" placeholder="Escribe sobre tu educación aquí" />
            </div>
            <button className=" text-white p-3 text-2xl bg-contain bg-no-repeat bg-center active:scale-95 transition-all" style={{ backgroundImage: 'url(/buttons/small-green.png)' }}>
                SAVE
            </button>
        </form>
    );
}