export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M15 3h-2v2h2v2h2v2h-2v2h2V9h2V7h-2V5h-2V3zm-2 0h-2v6H9V7H7V5H5v2h2v2h2v2h2v2H9v2H7v2H5v2h2v-2h2v-2h2v6h2V3zm2 8h-2v2h2v2h2v2h-2v2h-2v2h2v-2h2v-2h2v-2h-2v-2h-2v-2z" fill={color}/>
</svg>

}