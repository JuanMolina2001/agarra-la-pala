export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 5H2v14h18v-4h2V9h-2V5H4zm14 2v10H4V7h14z" fill={color}/>
</svg>

}