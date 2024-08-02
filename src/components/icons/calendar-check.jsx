export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M15 2h2v2h4v18H3V4h4V2h2v2h6V2zm4 6V6H5v2h14zm0 2H5v10h14V10zm-3 2v2h-2v-2h2zm-4 4v-2h2v2h-2zm-2 0h2v2h-2v-2zm0 0H8v-2h2v2z" fill={color}/>
</svg>

}