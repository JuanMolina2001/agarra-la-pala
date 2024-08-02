export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 4h18v7h-4v5H4V4zm14 5h2V6h-2v3zm-2-3h-4v2h2v4H8V8h2V6H6v8h10V6zm3 12v2H3v-2h16z" fill={color}/>
</svg>

}