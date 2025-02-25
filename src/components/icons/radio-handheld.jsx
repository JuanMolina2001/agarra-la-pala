export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M9 2v5h8v15H7V2h2zm0 7v4h6V9H9zm6 6H9v5h6v-5z" fill={color}/>
</svg>

}