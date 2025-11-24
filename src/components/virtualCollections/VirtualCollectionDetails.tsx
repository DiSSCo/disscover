import { Box, Card, Container, Table } from "@radix-ui/themes";
import { Footer, Header } from "components/elements/Elements";
import Jumbotron from "./components/Jumbotron";
import { useAppSelector, useFetch } from "app/Hooks";
import { getSelectedVirtualCollection, getVirtualCollectionItems } from "redux-store/VirtualCollectionSlice";

// type Props = {
// } 

const VirtualCollectionDetails = () => {

    /* Hooks */
    const fetch = useFetch();

    /* Base variables */

    const selectedVirtualCollection = useAppSelector(getSelectedVirtualCollection);
    const virtualCollectionItems = useAppSelector(getVirtualCollectionItems);
    console.log('selected virtual collection', selectedVirtualCollection);
    console.log('items', virtualCollectionItems);

    /* OnLoad, fetch MAS job records */
    // fetch.Fetch({
    //     params: {
    //         handle: superClass?.['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')
    //     },
    //     Method: GetMas,
    //     Handler: (mass: MachineAnnotationService[]) => {
    //         setMass(mass);
    //     }
    // });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render header*/}
            <Header span={10}
                offset={1}
            />

            <Container>
                {/* TopBar */}

                {/* Jumbotron */}
                <Jumbotron />

                {/* View bar */}

                {/* Digital specimen items */}

                {/* Paginator */}
            </Container>

            {/* Render footer */}
            <Footer span={10}
                offset={1}
            />
        </div>
    );
};

export default VirtualCollectionDetails;