export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M6 3h12v18H6V3zm2 2v4h3V5H8zm5 0v4h3V5h-3zm3 6H8v8h8v-8z" fill={color}/>
</svg>

}