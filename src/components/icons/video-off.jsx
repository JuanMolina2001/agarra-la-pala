export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 5H2v14h14v-4h2v2h2v2h2V5h-2v2h-2v2h-2V5H4zm10 12H4V7h10v10zm-4-6H8V9H6v2h2v2H6v2h2v-2h2v2h2v-2h-2v-2zm0 0V9h2v2h-2z" fill={color}/>
</svg>

}