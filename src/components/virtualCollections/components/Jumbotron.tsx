type Props = {
    virtualCollection: any
}

const Jumbotron = (props: Props) => {
    const { virtualCollection } = props;

    return (
        <div className="mb-4">
            <h1 className="mb-2">{virtualCollection?.attributes?.['ltc:collectionName']}</h1>
            <p>{virtualCollection?.attributes?.['ltc:description']}</p>
        </div>
    );
};

export default Jumbotron;