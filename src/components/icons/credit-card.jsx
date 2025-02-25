export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 4h16v2H4v2h16v4H4v6h16v2H2V4h2zm18 0h-2v16h2V4z" fill={color}/>
</svg>

}