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
export function getEmpleo(search, empleos) {
    return new Promise((resolve, reject) => {
        try {
            window.Electron.send('empleos', { job: search, empleos })
            window.Electron.on('empleos', (data) => {
                resolve(data)
            })
        } catch (e) {
            reject(e)
        }
    })
}