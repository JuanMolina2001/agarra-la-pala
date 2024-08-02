export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 4h8v2h10v14H2V4h2zm16 4H10V6H4v12h16V8zm-6 2h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2z" fill={color}/>
</svg>

}