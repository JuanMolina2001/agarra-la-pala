export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M20 5H4v2h16V5zm-4 4H8v2h8V9zM4 13h16v2H4v-2zm12 4H8v2h8v-2z" fill={color}/>
</svg>

}