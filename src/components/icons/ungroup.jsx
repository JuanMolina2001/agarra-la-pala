export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M7 3H3v4h4V3zm0 14H3v4h4v-4zM17 3h4v4h-4V3zm4 14h-4v4h4v-4zM8 8h2v2H8V8zm4 2h-2v4H8v2h2v-2h4v2h2v-2h-2v-4h2V8h-2v2h-2z" fill={color}/>
</svg>

}