export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 2h-8v2H9v2h2V4h8v2h2V4h-2V2zm-8 6h2v2h-2V8zm6 0V6h-4v2h4zm0 0h2v2h-2V8zm-1 2h-2v2H2v10h20V12h-6v-2zm4 4v6H4v-6h16zm-2 2h-2v2h2v-2zm-6 0h2v2h-2v-2z" fill={color}/>
</svg>

}