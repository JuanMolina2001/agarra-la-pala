export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 10V2H2v10h20V2h-2v8h-4V2h-2v8h-4V2H8v8H4zm9 9v3h-2v-3H8v-2h3v-3h2v3h3v2h-3z" fill={color}/>
</svg>

}