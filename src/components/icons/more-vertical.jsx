export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M15 1v6H9V1h6zm-2 2h-2v2h2V3zm2 6v6H9V9h6zm-2 2h-2v2h2v-2zm2 6v6H9v-6h6zm-2 2h-2v2h2v-2z" fill={color}/>
</svg>

}