export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2 5h20v14H2V5zm2 2v4h16V7H4zm16 6H4v4h16v-4z" fill={color}/>
</svg>

}