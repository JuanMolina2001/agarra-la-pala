export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm6 2h8v6h-8V8zm2 2v2h4v-2h-4z" fill={color}/>
</svg>

}