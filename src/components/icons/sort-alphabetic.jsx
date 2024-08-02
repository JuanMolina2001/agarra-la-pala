export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M11 2h2v2h-2V2zm0 2v2H9V4h2zm2 0h2v2h-2V4zM9 18v2h2v2h2v-2h2v-2h-2v2h-2v-2H9zM8 8H2v8h2v-2h2v2h2V8zm-2 4H4v-2h2v2zm6-1v-1h2v1h-2zm4-3h-6v8h6V8zm-4 6v-1h2v1h-2zm10-6h-4v8h4v-2h-2v-4h2V8z" fill={color}/>
</svg>

}