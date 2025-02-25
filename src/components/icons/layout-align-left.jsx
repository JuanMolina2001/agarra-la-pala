export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M20 16V8H8v8h12zm-10-6h8v4h-8v-4zM4 20h2V4H4v16z" fill={color}/>
</svg>

}