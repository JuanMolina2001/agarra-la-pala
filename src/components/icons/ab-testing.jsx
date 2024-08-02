export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M3 3h6v2H5v2h4v2H5v2h4v2H3V3zm6 8h2V9H9v2zm0-4h2V5H9v2zm4 4h8v10h-2v-4h-4v4h-2V11zm2 4h4v-2h-4v2zm0-12h6v6h-2V5h-4V3zM3 15h2v4h4v2H3v-6z" fill={color}/>
</svg>

}