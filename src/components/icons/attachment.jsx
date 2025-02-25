export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 5v14H5V3h14v18H9V7h6v10h-2V9h-2v10h6V5H7z" fill={color}/>
</svg>

}