export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M6 8h10V6h2v2h2v2h-2v2h-2v-2H6v10H4V8h2zm10 4v2h-2v-2h2zm0-6V4h-2v2h2z" fill={color}/>
</svg>

}