export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M11 2H9v2H7v2H5v2H1v8h4v2h2v2h2v2h2V2zM7 18v-2H5v-2H3v-4h2V8h2V6h2v12H7zm6-8h2v4h-2v-4zm8-6h-2V2h-6v2h6v2h2v12h-2v2h-6v2h6v-2h2v-2h2V6h-2V4zm-2 4h-2V6h-4v2h4v8h-4v2h4v-2h2V8z" fill={color}/>
</svg>

}