/* Import Dependencies */
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Hooks */
import { usePagination } from 'app/Hooks';

/* Import Types */
import { DropdownItem, Dict } from "app/Types";

/* Import Components */
import MASJobRecordCard from "./MASJobRecordCard";
import { Paginator } from 'components/elements/Elements';
import { Dropdown } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    digitalObjectId: string,
    GetMASJobRecords: Function
};


/**
 * Component that renders the MAS overview in the MAS menu
 * @param digitalObjectId The identifier of the super class digital object
 * @param GetMASJobRecords Function to fetch the MAS job records of the super class digital object
 * @returns JSX Component
 */
const MASOverview = (props: Props) => {
    const { digitalObjectId, GetMASJobRecords } = props;

    /* Base variables */
    const [masJobRecordStateFilter, setMASJobRecordStateFilter] = useState<string>('');

    /* Hooks */
    const pagination = usePagination({
        pageSize: 25,
        resultKey: 'MASJobRecords',
        params: {
            handle: digitalObjectId,
            state: masJobRecordStateFilter
        },
        triggers: [masJobRecordStateFilter],
        Method: GetMASJobRecords
    });

    /* Construct dropdown items */
    const masJobRecordStateItems: DropdownItem[] = [
        {
            label: 'All',
            value: ''
        },
        {
            label: 'Scheduled',
            value: 'SCHEDULED'
        },
        {
            label: 'Running',
            value: 'RUNNING'
        },
        {
            label: 'Failed',
            value: 'FAILED'
        },
        {
            label: 'Completed',
            value: 'COMPLETED'
        }
    ];

    return (
        <div className="h-100 d-flex flex-column">
            {/* State filter */}
            <Row>
                <Col lg={{ span: 6 }}>
                    <Row>
                        <Col lg="auto"
                            className="pe-0"
                        >
                            <p className="fs-4 fw-lightBold">
                                Filter by state
                            </p>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <Dropdown items={masJobRecordStateItems}
                                selectedItem={masJobRecordStateItems.find(item => item.value === masJobRecordStateFilter)}
                                styles={{
                                    border: true,
                                    borderRadius: '999px',
                                    background: '#ffffff'
                                }}
                                OnChange={(item: DropdownItem) => {
                                    setMASJobRecordStateFilter(item.value);
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* MAS job record cards */}
            <Row className="flex-grow-1 overflow-scroll mt-4">
                <Col>
                    {pagination.records.length ? pagination.records.map((masJobRecord: Dict, index: number) => (
                        <Row key={masJobRecord['ods:ID']}
                            className={index >= 1 ? 'mt-3' : ''}
                        >
                            <Col>
                                <MASJobRecordCard masJobRecord={masJobRecord} />
                            </Col>
                        </Row>
                    ))
                        : <Row>
                            <Col>
                                <p>No MAS Job Records found</p>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
            {/* Paginator */}
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Card />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="d-flex justify-content-center">
                            <Paginator pagination={pagination} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default MASOverview;