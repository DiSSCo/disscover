/* Import Dependencies */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import PIDSearch from "./PIDSearch";
import PhysicalIDSearch from "./PhysicalIDSearch";
import CollectionFacilitySearch from './CollectionFacilitySearch';
import VirtualCollectionSearch from './VirtualCollectionSearch';


/* Props Typing */
interface Props {
    HideAdvancedSearch: Function
};


const AdvancedSearch = (props: Props) => {
    const { HideAdvancedSearch } = props;
    
    /* Class Names for Tabs */
    const classTabsList = classNames({
        "tabsList": true
    });

    const classTab = classNames({
        'react-tabs__tab tab mt-2': true,
    });

    return (
        <Row className="pe-3 pb-md-5">
            <Col className="pb-md-4">
                <Row>
                    <Col>
                        <h2 className="fs-3"> Search by ID or collection </h2>
                    </Col>
                    <Col className="col-md-auto">
                        <FontAwesomeIcon icon={faX}
                            className="c-primary c-pointer"
                            onClick={() => HideAdvancedSearch()}
                        />
                    </Col>
                </Row>

                {/* Tabs with different Search options */}
                <Tabs>
                    <TabList className={classTabsList}>
                        <Tab className={classTab} selectedClassName="active"> Digital Specimen ID  </Tab>
                        <Tab className={classTab} selectedClassName="active"> Physical Specimen ID </Tab>
                        <Tab className={classTab} selectedClassName="active"> Collection facility </Tab>
                        <Tab className={classTab} selectedClassName="active"> Virtual collection </Tab>
                    </TabList>

                    {/* Search by Digital Specimen */}
                    <TabPanel className="pt-2">
                        <PIDSearch />
                    </TabPanel>

                    {/* Search by Physical Specimen */}
                    <TabPanel>
                        <PhysicalIDSearch />
                    </TabPanel>

                    {/* Search by Collection Facility */}
                    <TabPanel>
                        <CollectionFacilitySearch />
                    </TabPanel>

                    {/* Search by Virtual Collection */}
                    <TabPanel>
                        <VirtualCollectionSearch />
                    </TabPanel>
                </Tabs>
            </Col>
        </Row>
    );
}

export default AdvancedSearch;