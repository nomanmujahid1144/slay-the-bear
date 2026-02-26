interface PostDescriptionProps {
    description?: string;
}

export const PostDescription = ({ description }: PostDescriptionProps) => {
    return <p>{description}</p>;
};