export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 0h16v20H5V0h2zm14 18V2H7v16h14zM9 4h10v2H9V4zm10 4H9v2h10V8zM9 12h7v2H9v-2zm10 10H3V4H1v20h18v-2z" fill={color}/>
</svg>

}