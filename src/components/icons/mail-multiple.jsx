export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M24 2H4v16h20V2zM6 16V4h16v12H6zM2 7H0v15h19v-2H2V7zm8-1H8v2h2v2h2v2h4v-2h2V8h2V6h-2v2h-2v2h-4V8h-2V6z" fill={color}/>
</svg>

}