export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M16 4H8v12h8V4zm-6 10V6h4v8h-4zm10 6v-2H4v2h16z" fill={color}/>
</svg>

}