export default ({color, height, width, className}) => {
    return <svg height={height} width={width} className={className} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M14 2h8v20H12V2h2zm6 2h-6v16h6V4zM10 20H4v-6h6v-2H6v-2H4V8h2V6h2V4h2V2H8v2H6v2H4v2H2v2h2v2H2v10h8v-2zm8-4h-2v2h2v-2z" fill={color}/>
</svg>

}