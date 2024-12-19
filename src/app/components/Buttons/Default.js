export const DefaultButton = ({type, text, extras, disabled, loading, loadingText}) => {
    return (
        <button type={type} className={`btn btn-two ${extras} w-100 justify-content-center ${disabled || loading ? 'disabled cursor-not-allowed' : ''}`}>
            {loading ? loadingText : text}
        </button>
    )
}