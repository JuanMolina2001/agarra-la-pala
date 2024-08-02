export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 2h18v20h-2V4H4v12h14v2h2v2h-2v-2H2V2h2z" fill={color}/>
</svg>

}