export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 4h4v2H4v8h4v2H2V4h2zm6 0h10v2h-8v12h8v2H10V4zm12 0h-2v16h2V4zm-7 4h2v2h-2V8zm3 4h-4v4h4v-4zM8 18H4v2h4v-2z" fill={color}/>
</svg>

}