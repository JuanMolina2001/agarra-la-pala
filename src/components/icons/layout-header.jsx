export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2 19h20V5H2v14zm2-2v-6h16v6H4zm16-8H4V7h16v2z" fill={color}/>
</svg>

}