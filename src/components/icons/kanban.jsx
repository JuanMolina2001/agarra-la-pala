export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M21 3H3v18h18V3zM5 19V5h14v14H5zM9 7H7v8h2V7zm2 0h2v4h-2V7zm6 0h-2v10h2V7z" fill={color}/>
</svg>

}