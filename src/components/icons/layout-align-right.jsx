export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 8v8h12V8H4zm10 6H6v-4h8v4zm6-10h-2v16h2V4z" fill={color}/>
</svg>

}