export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M20 6h-4v2h2v2h-2v2h-2v2h-2v2h-2v-2H8v-2H6v-2H4V8H2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v2h2V6h-2z" fill={color}/>
</svg>

}