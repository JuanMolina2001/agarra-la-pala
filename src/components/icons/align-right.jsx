export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M4 5h16v2H4V5zm8 4h8v2h-8V9zm-8 4v2h16v-2H4zm8 4h8v2h-8v-2z" fill={color}/>
</svg>

}