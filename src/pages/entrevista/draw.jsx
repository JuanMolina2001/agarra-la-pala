import { useEffect, useState } from "preact/hooks";

export default ({hidden}) => {
    const fillAll = (color) => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function hexToRgb(hex) {
        // Eliminar el símbolo # si está presente
        hex = hex.replace(/^#/, '');

        // Convertir el valor hexadecimal a números RGB
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        return { r: r, g: g, b: b };
    }
    const fillColor = (colorBefore, colorAfter) => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] === colorBefore.r && data[i + 1] === colorBefore.g && data[i + 2] === colorBefore.b) {
                data[i] = colorAfter.r
                data[i + 1] = colorAfter.g
                data[i + 2] = colorAfter.b
            }
        }
        ctx.putImageData(imageData, 0, 0)

    }
    const Button = ({ icon, onClick }) => {
        return (
            <div onClick={onClick} className="bg-blue-500 text-white select-none p-2 active:scale-95 transition-all  nes-pointer">
               <i className={`pixelart-icons-font-${icon} text-lg`}></i>
            </div>
        )
    }
    useEffect(() => {
        fillAll('#ffff')
    }, [])
    const [color, setColor] = useState('#000000')
    const [size, setSize] = useState(5)
    return (
        <div id="canvasContainer" className={`flex  w-fit h-fit border border-black ${hidden && 'hidden'}`}>
            <section className="flex flex-col gap-2 items-center border-r border-black pt-3 bg-white">
                <div className="grid grid-cols-2 grid-rows-3 gap-2">
                    <Button onClick={() => {
                        fillAll('#ffff')
                    }}
                        icon={'trash'}
                    />
                    <Button onClick={(e) => {
                        const canvas = document.getElementById('canvas')
                        canvas.classList.remove('cursor-crosshair')
                        canvas.classList.add("cursor-bucket")
                    }}
                        icon={'fill'}
                    />
                    <Button onClick={(e) => {
                        const canvas = document.getElementById('canvas')
                        canvas.classList.add('cursor-crosshair')
                        canvas.classList.remove("cursor-bucket")
                    }}
                        icon={'edit'}
                    />
                    <Button onClick={() => {
                        const canvas = document.getElementById('canvas')
                        canvas.parentElement.style.overflow = 'auto'
                        const currentScale = parseFloat(canvas.style.transform.replace('scale(', '').replace(')', ''))
                        canvas.style.transform = `scale(${currentScale + 0.5})`

                    }}
                        icon={'zoom-in'}
                    />
                    <Button onClick={() => {
                        const canvas = document.getElementById('canvas')
                        canvas.parentElement.style.overflow = 'auto'
                        const currentScale = parseFloat(canvas.style.transform.replace('scale(', '').replace(')', ''))
                        if (currentScale <= 0.5) return
                        canvas.style.transform = `scale(${currentScale - 0.5})`
                    }}
                        icon={'zoom-out'}
                    />
                    <Button onClick={() => {
                        const canvas = document.getElementById('canvas')
                        canvas.parentElement.style.overflow = 'visible'
                        canvas.style.transform = `scale(1)`
                    }}
                        icon={'arrows-horizontal'}
                    />
                </div>
                <input value={color} onChange={e => setColor(e.target.value)} type="color" name="" id="" />
                <input type="range" name="" id="" className="scale-75" min="1" max="100" value={size} onChange={e => setSize(e.target.value)} />
            </section>
            <section className="h-[400px] w-[400px]" draggable={false}>
                <canvas id="canvas"
                    draggable={false}
                    style={{ transform: 'scale(1)' }}
                    height={400}
                    width={400}
                    className="cursor-crosshair"
                    onClick={(e) => {
                        const ctx = e.target.getContext('2d')
                        if (e.target.classList.contains('cursor-bucket')) {
                            const colorBefore = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data
                            fillColor({ r: colorBefore[0], g: colorBefore[1], b: colorBefore[2] }, hexToRgb(color))
                        }
                    }}
                    onMouseMove={(e) => {
                        const ctx = e.target.getContext('2d');
                        ctx.lineWidth = size;
                        ctx.strokeStyle = color;
                        if (e.buttons === 1) {
                            if (e.target.classList.contains('cursor-bucket')) return
                            if (!ctx.isDrawing) {
                                ctx.beginPath();
                                ctx.moveTo(e.offsetX, e.offsetY);
                                ctx.isDrawing = true;
                            }
                            ctx.lineTo(e.offsetX, e.offsetY);

                            ctx.stroke();
                        }
                    }}
                    onMouseUp={(e) => {
                        const ctx = e.target.getContext('2d');
                        ctx.isDrawing = false;
                    }}
                    onMouseLeave={(e) => {
                        const ctx = e.target.getContext('2d');
                        ctx.isDrawing = false; 
                    }}
                ></canvas>
            </section>
        </div>

    )
}