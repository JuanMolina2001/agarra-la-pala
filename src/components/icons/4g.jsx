export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M5 7H3v6h5v4h2V7H8v4H5V7zm16 0h-9v10h9v-6h-4v2h2v2h-5V9h7V7z" fill={color}/>
</svg>

}