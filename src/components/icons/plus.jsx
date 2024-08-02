export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7V4z" fill={color}/>
</svg>

}