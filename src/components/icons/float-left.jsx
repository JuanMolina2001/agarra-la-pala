export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 4h6v8H2V4h2zm4 6V6H4v4h4zm14-4H12v2h10V6zm0 4H12v2h10v-2zm0 4v2H2v-2h20zm0 6v-2H2v2h20z" fill={color}/>
</svg>

}