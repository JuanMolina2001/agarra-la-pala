export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 4h18v14h-6v2H8v-2H2V4h2zm16 12V6H4v10h16z" fill={color}/>
</svg>

}