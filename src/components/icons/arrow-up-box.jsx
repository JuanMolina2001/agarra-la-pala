export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M3 21h18V3H3v18zM19 5v14H5V5h14zm-8 12h2v-6h2V9h-2V7h-2v2H9v2h2v6zm-2-4v-2H7v2h2zm8 0h-2v-2h2v2z" fill={color}/>
</svg>

}