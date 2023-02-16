/* Import Dependencies */
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from "redux/specimen/SpecimenSlice";

/* Import Types */
import { Dict } from 'global/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrog, faChevronDown, faMagnifyingGlass, faLandmark } from '@fortawesome/free-solid-svg-icons'


/* Props Typing */
interface Props {
    versions: number[],
    LoadSpecimenVersion: Function
};


const SpecimenInfo = (props: Props) => {
    const { versions, LoadSpecimenVersion } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    /* Handling version dropdown with custom hook */
    const [versionDropdown, setVersionDropdown] = useState(false);
    const versionDropdownRef = useRef<HTMLButtonElement>(null);

    const activeClass = classNames({
        'active': versionDropdown
    });

    const UseVersionTabs = () => {
        useEffect(() => {
            function handleClickOutside(event: Dict) {
                if (versionDropdownRef.current) {
                    if (!versionDropdownRef.current.contains(event.target)) {
                        if (versionDropdown && !event.target.className.includes('specimen_versionOption')) {
                            setVersionDropdown(false);
                        }
                    }
                }
            }

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [versionDropdownRef, versionDropdown])
    }

    UseVersionTabs();

    return (
        <>
            <Row>
                <Col md={{ span: 11 }} className="specimen_fixedTitleBlock position-fixed z-2">
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <Row>
                                <Col md={{ span: 8 }} className="specimen_fixedTitleBlockMargin">
                                    <Row>
                                        <Col md={{ span: 10 }} className="specimen_titleBlock bg-white border-b-1-primary-dark">
                                            <Row>
                                                <Col md={{ span: 1 }}
                                                    className="specimen_basisOfRecordSymbolBlock border-l-2-primary-dark border-t-2-primary-dark
                                                        border-r-2-primary-dark br-tl text-center"
                                                >
                                                    <i className="icon">
                                                        <FontAwesomeIcon icon={faFrog} />
                                                    </i>
                                                </Col>
                                                <Col className="specimen_titleBlockSub col-md-auto border-t-2-primary-dark border-r-2-primary-dark br-tr">
                                                    <h2 className="specimen_title fw-bold"> {specimen.specimenName} </h2>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={{ span: 2 }}>
                                            <Row className="position-relative">
                                                <Col md={{ span: 12 }} className={`specimen_versionBlock ${activeClass}`}>
                                                    {(versions.length > 1) ?
                                                        <Row>
                                                            <button
                                                                className="specimen_versionOption chosen"
                                                                type="button"
                                                                onClick={() => setVersionDropdown(!versionDropdown)}
                                                                ref={versionDropdownRef}
                                                            >
                                                                {`Version ${specimen.version}`}
                                                                <FontAwesomeIcon
                                                                    icon={faChevronDown}
                                                                    className={`specimen_versionOptionIcon ${activeClass} position-absolute mx-4`}
                                                                />
                                                            </button>
                                                        </Row>
                                                        : <Row>
                                                            <button className="specimen_versionOption chosen w-100">
                                                                {`Version ${specimen.version}`}
                                                            </button>
                                                        </Row>
                                                    }

                                                    <div className={`specimen_versionOptions ${activeClass}`}>
                                                        {(versions.length > 1) && versions.map((key) => {
                                                            if (key !== specimen.version) {
                                                                return (
                                                                    <Row key={key}>
                                                                        <div
                                                                            className="specimen_versionOption b-none bg-white text-center"
                                                                            onClick={() => { LoadSpecimenVersion(key); setVersionDropdown(false); }}
                                                                        >
                                                                            {`Version ${key}`}
                                                                        </div>
                                                                    </Row>
                                                                );
                                                            }
                                                        })}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col >
            </Row>
            <Row>
                <Col md={{ span: 11 }} className="mt-4">
                    <Row className="h-100 mt-3">
                        <Col md={{ span: 6 }}>
                            <Row className="h-100">
                                <Col md={{ span: 12 }} className="specimen_detailSpecimen px-3 pt-2 position-relative">
                                    <Row>
                                        <Col md={{ span: 12 }} className="specimen_detailSub">
                                            <Row>
                                                <Col>
                                                    <p className="specimen_detailTitle fw-bold"> Specimen information </p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p>
                                                        Specimen type: {specimen.type}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="specimen_detailSpecimenBackdrop" />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={{ span: 6 }}>
                            <Row className="h-100">
                                <Col md={{ span: 12 }} className="specimen_detailOrganisation bg-primary-light px-3 pt-2 position-relative">
                                    <Row>
                                        <Col md={{ span: 12 }} className="specimen_detailSub">
                                            <Row>
                                                <Col md={{ span: 12 }}>
                                                    <p className="specimen_detailTitle fw-bold"> Publishing organisation information </p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p>
                                                        Publisher: {specimen.organizationId}
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <p>
                                                        Collection: {specimen.physicalSpecimenCollection}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <FontAwesomeIcon icon={faLandmark} className="specimen_detailSpecimenBackdrop" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="specimen_detailLinksBlock">
                        <Col md={{ span: 11 }} className="specimen_detailLinks border-l-1-primary-dark mb-4 mt-4 pt-2">
                            <Row>
                                <Col>
                                    <p>
                                        <span className="fw-bold"> Source: </span>
                                        {` ${specimen.sourceSystemId}`}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p>
                                        <span className="fw-bold"> Provider URL: </span>
                                        {` ${specimen.organizationId}`}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </>
    );
}

export default SpecimenInfo;