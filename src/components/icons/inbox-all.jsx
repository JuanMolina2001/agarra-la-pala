export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M3 2h18v20H3V2zm2 2v4h4v2h6V8h4V4H5zm14 6h-2v2H7v-2H5v4h14v-4zm0 6h-2v2H7v-2H5v4h14v-4z" fill={color}/>
</svg>

}