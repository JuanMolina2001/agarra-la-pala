export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M16 20H8V8h8v12zm-6-10v8h4v-8h-4zm10-6v2H4V4h16z" fill={color}/>
</svg>

}