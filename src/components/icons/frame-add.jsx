export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2 3h20v18H2V3zm18 16V7H4v12h16zm-7-7h3v2h-3v3h-2v-3H8v-2h3V9h2v3z" fill={color}/>
</svg>

}