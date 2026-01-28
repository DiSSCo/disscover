/* Import dependencies */
import { format } from "date-fns";

/* Import components */
import { Badge, Card } from "@radix-ui/themes";

/* Import styling */
import './VirtualCollectionsOverview.scss';

/* Import hooks */
import { useVirtualCollections } from "hooks/useVirtualCollections";


/**
 * Base component that renders the Virtual Collections page
 * @returns JSX Component
 */
const VirtualCollections = () => {
    /* Calling the Virtual Collections hook */
    const { data, isLoading, isError } = useVirtualCollections();

    /* This will become more generic after migrating more services */
    if (isLoading) return <main><p>Retrieving the Virtual Collections...</p></main>;
    if (isError) return <main><p>Something went wrong with fetching the Virtual Collections. Please try again later.</p></main>;

    return (
        <>
            <header>
                <h1>Virtual Collections</h1>
                <p className="subtitle">DiSSCover Virtual Collections showcase a diverse range of specimens from across Europe, presented in curated galleries. </p>
            </header>
            <main>
                <div className="gallery-container">
                    {data?.map((collection: any) => {
                        return (
                            <Card variant="surface" className="gallery-card" key={collection.id}>
                                <Badge color="yellow" variant="solid">{collection.attributes['ltc:basisOfScheme']}</Badge>
                                <p>{collection.attributes['ltc:collectionName']}</p>
                                <span id="updated-date">Updated: {collection.attributes['schema:dateModified'] ? format(collection.attributes['schema:dateModified'], 'yyyy-MM-dd') : 'Unknown'}</span>
                            </Card>
                        )
                    })}
                </div>
            </main>
        </>
    );
};

export default VirtualCollections;