export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 2H2v10h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h-2v-2h-2V8h-2V6h-2V4h-2V2zm0 2v2h2v2h2v2h2v2h2v2h-2v2h-2v2h-2v2h-2v-2h-2v-2H8v-2H6v-2H4V4h8zM6 6h2v2H6V6z" fill={color}/>
</svg>

}