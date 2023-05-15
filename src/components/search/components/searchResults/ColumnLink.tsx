/* Props Typing */
interface Props {
    link: string,
    text: string
};


const ColumnLink = (props: Props) => {
    const { link, text } = props;

    return (
        <a href={link} target="_blank" rel="noreferrer"> {text} </a>
    );
}

export default ColumnLink;