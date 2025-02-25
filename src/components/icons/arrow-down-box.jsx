export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM11 7h2v6h2v2h-2v2h-2v-2H9v-2h2V7zm-2 4v2H7v-2h2zm8 0h-2v2h2v-2z" fill={color}/>
</svg>

}