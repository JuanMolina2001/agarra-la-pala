export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M5 3H3v2h2V3zm4 0H7v2h2V3zM7 19h2v2H7v-2zm6 0h-2v2h2v-2zM3 7h2v2H3V7zm18 0h-2v2h2V7zm-2 4h2v2h-2v-2zM5 11H3v2h2v-2zm-2 4h2v2H3v-2zm2 4H3v2h2v-2zm6-16h2v2h-2V3zm6 0h-2v2h2V3zm2 0h2v2h-2V3zm2 14h-6v2h6v-2z" fill={color}/>
</svg>

}