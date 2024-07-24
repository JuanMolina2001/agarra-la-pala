const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
export function pixelImage(img) {
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach(picture => {
        const canvas = picture;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const pixelSize = 4; // Adjust pixel size for effect
        for (let y = 0; y < canvas.height; y += pixelSize) {
            for (let x = 0; x < canvas.width; x += pixelSize) {
                const red = data[((y * canvas.width + x) * 4)];
                const green = data[((y * canvas.width + x) * 4) + 1];
                const blue = data[((y * canvas.width + x) * 4) + 2];

                // Fill a rectangle with the color of the current pixel
                ctx.fillStyle = `rgb(${red},${green},${blue})`;
                ctx.fillRect(x, y, pixelSize, pixelSize);
            }
        }
    })
}
export async function getEmpleo(search, empleos) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/empleos/${search}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ empleos: empleos })
    })
    const data = await res.text()
    return data
}