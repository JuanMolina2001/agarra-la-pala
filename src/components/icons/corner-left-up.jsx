export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8 18V8H6V6h2V4h2v2h2v2h-2v10h10v2H8v-2zm4-10h2v2h-2V8zM6 8H4v2h2V8z" fill={color}/>
</svg>

}