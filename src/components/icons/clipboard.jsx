export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M10 2h6v2h4v18H4V4h4V2h2zm6 4v2H8V6H6v14h12V6h-2zm-2 0V4h-4v2h4z" fill={color}/>
</svg>

}