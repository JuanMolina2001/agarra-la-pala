export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M3 4H1v16h22V4H3zm18 2v12H3V6h18zM7 8H5v5h4v3h2V8H9v3H7V8zm8 0h-2v8h2v-3h2v3h2v-3h-2v-2h2V8h-2v3h-2V8z" fill={color}/>
</svg>

}