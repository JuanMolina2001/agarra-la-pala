export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M11 2h2v8h2v2h-2v2h-2v-2H9v-2h2V2zm-2 8H7V8h2v2zm6 0V8h2v2h-2zm5 6H4v2h16v-2zm-4 4H8v2h8v-2z" fill={color}/>
</svg>

}