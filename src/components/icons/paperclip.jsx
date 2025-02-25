export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M5 5h16v10H7V9h10v2H9v2h10V7H5v10h14v2H3V5h2z" fill={color}/>
</svg>

}