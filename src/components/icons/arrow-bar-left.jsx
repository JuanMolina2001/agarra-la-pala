export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M6 4v16H4V4h2zm14 7v2h-8v2h-2v-2H8v-2h2V9h2v2h8zm-8-2V7h2v2h-2zm0 6h2v2h-2v-2z" fill={color}/>
</svg>

}