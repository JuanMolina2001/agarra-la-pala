export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M13 4h-2v16h2V4zM4 6h5v2H4v8h5v2H2V6h2zm11 0h7v12h-7v-2h5V8h-5V6z" fill={color}/>
</svg>

}