export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M18 2h2v20H4V6h2v14h12V4H8V2h10zM8 4H6v2h2V4zm6 2h2v4h-2V6zm-2 0h-2v4h2V6z" fill={color}/>
</svg>

}