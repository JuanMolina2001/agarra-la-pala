export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2 5h20v14H2V5zm2 2v10h2V7H4zm4 0v10h12V7H8z" fill={color}/>
</svg>

}