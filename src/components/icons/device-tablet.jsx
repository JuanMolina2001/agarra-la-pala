export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M6 2H4v20h16V2H6zm12 2v16H6V4h12zm-5 12h-2v2h2v-2z" fill={color}/>
</svg>

}