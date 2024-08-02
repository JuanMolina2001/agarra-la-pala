export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M20 2H2v20h2V4h16v12H6v2H4v2h2v-2h16V2h-2z" fill={color}/>
</svg>

}