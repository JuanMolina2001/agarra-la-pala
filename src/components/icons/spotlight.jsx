export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M5 2h16v20H3V2h2zm14 18V4H5v16h14zM13 6H7v2h6V6zm-6 4h10v8H7v-8z" fill={color}/>
</svg>

}