export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8 3h8v4h6v6h-2V9H4v10h10v2H2V7h6V3zm6 2h-4v2h4V5zm2 12h6v2h-6v-2z" fill={color}/>
</svg>

}