export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8 2H6v4H2v2h14v14h2v-4h4v-2h-4V6H8V2zm0 8H6v8h8v-2H8v-6z" fill={color}/>
</svg>

}