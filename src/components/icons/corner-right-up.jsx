export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M16 18V8h2V6h-2V4h-2v2h-2v2h2v10H4v2h12v-2zM12 8h-2v2h2V8zm6 0h2v2h-2V8z" fill={color}/>
</svg>

}