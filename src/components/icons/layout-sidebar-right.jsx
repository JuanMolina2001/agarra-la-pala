export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M22 5H2v14h20V5zm-2 2v10h-2V7h2zm-4 0v10H4V7h12z" fill={color}/>
</svg>

}