export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M11 2h2v2h2v4h2v4h2v6h-2v2h-2v2H9v-2H7v-2H5v-6h2V8h2V4h2V2z" fill={color}/>
</svg>

}