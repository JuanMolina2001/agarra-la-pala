export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M8 5H6v10h12v-2h2v-2h2V9h-2V7h-2V5H8zm10 2v2h2v2h-2v2H8V7h10zM4 9H2v10h12v-2H4V9z" fill={color}/>
</svg>

}