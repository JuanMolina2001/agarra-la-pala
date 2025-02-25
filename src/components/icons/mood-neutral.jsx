export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M5 3h14v2H5V3zm0 16H3V5h2v14zm14 0v2H5v-2h14zm0 0h2V5h-2v14zM10 8H8v2h2V8zm4 0h2v2h-2V8zm1 5H9v2h6v-2z" fill={color}/>
</svg>

}