export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8 4v2h4v2H6v2h6V8h2v2h8v6h-2v-4H4v6h14v-2h2v2h4v2H0v-2h2v-8h2V6h2V4h2z" fill={color}/>
</svg>

}