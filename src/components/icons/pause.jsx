export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M10 4H5v16h5V4zm9 0h-5v16h5V4z" fill={color}/>
</svg>

}