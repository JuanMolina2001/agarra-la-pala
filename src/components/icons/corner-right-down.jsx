export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M16 6v10h2v2h-2v2h-2v-2h-2v-2h2V6H4V4h12v2zm-4 10h-2v-2h2v2zm6 0h2v-2h-2v2z" fill={color}/>
</svg>

}