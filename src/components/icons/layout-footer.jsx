export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2 5h20v14H2V5zm2 2v6h16V7H4zm16 8H4v2h16v-2z" fill={color}/>
</svg>

}