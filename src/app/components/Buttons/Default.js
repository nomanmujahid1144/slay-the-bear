export const DefaultButton = ({type, text}) => {
    return (
        <button type={type} className="btn btn-two w-100 justify-content-center">
            {text}
        </button>
    )
}