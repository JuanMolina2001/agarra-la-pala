export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8 2h8v4h5v12h-5v4H8v-4H3V6h5V2zM5 16h14V8H5v8zm6-6h2v2h2v2h-4v-4z" fill={color}/>
</svg>

}