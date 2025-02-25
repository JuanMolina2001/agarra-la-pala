export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M6 4H4v12h16V4H6zm12 2v8H6V6h12zm4 12H2v2h20v-2z" fill={color}/>
</svg>

}