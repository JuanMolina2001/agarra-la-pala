export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 1h-2v2h2v2h-6v2h6v2h-2v2h2V9h2V7h2V5h-2V3h-2V1zm-8 2H2v18h20v-8h-2v6H4V5h7V3zm1 8V9h2v2h-2zm-2 2v-2h2v2h-2zm-2 2v-2h2v2H8zm0 0v2H6v-2h2zm8-2h-2v-2h2v2zm0 0h2v2h-2v-2zM6 7h2v2H6V7z" fill={color}/>
</svg>

}