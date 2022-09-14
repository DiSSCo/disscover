import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';


const Navigation = (props) => {
    const home = props.home;

    return (
        <>
            <Col className={`col-md-auto navItem position-relative ${home}`}>
                <Link to="/">
                    <div>
                        Home
                    </div>
                </Link>
            </Col>
            <Col className={`col-md-auto navItem position-relative ${home}`}>
                <Link to="/search">
                    <div>
                        Search
                    </div>
                </Link>
            </Col>
            <Col className={`col-md-auto navItem position-relative ${home}`}>
                <Link to="/annotate">
                    <div>
                        Annotate
                    </div>
                </Link>
            </Col>
        </>
    );
}

export default Navigation;