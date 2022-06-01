import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Import Components */
import TableRow from './TableRow';
import DefaultTableRow from './DefaultTableRow';

const ResultsTable = (props) => {
    let searchResults = props.searchResults;
    
    let navigate = useNavigate();

    if (!searchResults) {
        searchResults = [];
    }

    function RedirectToSpecimenPage(index) {
        const specimen = searchResults[index];

        navigate('/specimen/' + specimen['@id'], {
            state: {
                data: specimen
            }
        });
    }
    
    return (
        <div className="search_resultsTable">
            <Row className="search_tableHeader">
                <Col md="3">
                    Scientific Name
                </Col>
                <Col md="3">
                    Locality
                </Col>
                <Col md="3">
                    Basis of Record
                </Col>
                <Col md="3">
                    Institution
                </Col>
            </Row>

            <Row className="search_resultsTableContent">
                <Col md="12">
                    {searchResults.length > 0 ? searchResults.map((searchResult, i) => (
                        <TableRow specimen={searchResult} position={i} onClick={(index) => RedirectToSpecimenPage(index)} key={searchResult['@id']} />
                    )) : <DefaultTableRow />}
                </Col>
            </Row>
        </div>
    );
}

export default ResultsTable;