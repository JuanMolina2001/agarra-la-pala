export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M5 1H3v14h10v2h-2v2h2v-2h2v-2h2v-2h-2v-2h-2V9h-2v2h2v2H5V3h12V1H5zm4 4H7v6h2V7h10v14H9v-4H7v6h14V5H9z" fill={color}/>
</svg>

}