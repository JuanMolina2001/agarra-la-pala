export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M3 2h10v2h8v14H11v-2H5v6H3V2zm2 12h8v2h6V6h-8V4H5v10z" fill={color}/>
</svg>

}