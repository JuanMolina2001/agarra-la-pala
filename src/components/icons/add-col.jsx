export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2 2h10v20H2v-2h8v-4H2v-2h8v-4H2V8h8V4H2V2zm17 9h3v2h-3v3h-2v-3h-3v-2h3V8h2v3z" fill={color}/>
</svg>

}