export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M10 2h4v5h2v2h-2v11h4v-9h2v9h2v2H2v-2h2V8h2v12h6V4h-2V2zM8 6V4h2v2H8zm0 0H6v2h2V6zm10 5h-2V9h2v2zm-8-1H8v2h2v-2zm-2 4h2v2H8v-2z" fill={color}/>
</svg>

}