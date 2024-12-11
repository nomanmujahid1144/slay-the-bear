export const DefaultButton = ({type, text, extras}) => {
    return (
        <button type={type} className={`btn btn-two ${extras} w-100 justify-content-center`}>
            {text}
        </button>
    )
}