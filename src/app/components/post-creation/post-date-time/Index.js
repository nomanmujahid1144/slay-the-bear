export const DateTime = ({date, time}) => {
    return (
        <div className="blog-post-meta">
            <ul className="list-wrap">
                {date !== '' && (
                    <li>
                        <i className="flaticon-calendar" />
                        {date}
                    </li>
                )}
                {time !== '' && (
                    <li>
                        <i className="flaticon-history" />
                        {time}
                    </li>
                )}
            </ul>
        </div>
    )
}