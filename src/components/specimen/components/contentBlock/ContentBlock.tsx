/* Import Dependencies */
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from "redux/specimen/SpecimenSlice";

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

/* Import Components */
import SpecimenOverview from './SpecimenOverview';
import OriginalData from './OriginalData';
import AnnotationsOverview from './AnnotationsOverview';
import DigitalMedia from './DigitalMedia';
import MIDSOverview from './MIDSOverview';


/* Props Typing */
interface Props {
    versions: number[],
    LoadSpecimenVersion: Function
};


const ContentBlock = (props: Props) => {
    const { versions, LoadSpecimenVersion } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    /* Handling version dropdown with custom hook */
    const [versionDropdown, setVersionDropdown] = useState(false);
    const versionDropdownRef = useRef<HTMLButtonElement>(null);

    const activeClass = classNames({
        [`${styles.active}`]: versionDropdown
    });

    const UseVersionTabs = () => {
        useEffect(() => {
            function handleClickOutside(event: Dict) {
                if (versionDropdownRef.current) {
                    if (!versionDropdownRef.current.contains(event.target)) {
                        if (versionDropdown && !event.target.className.includes(styles.versionOption)) {
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
        <Row className="h-100">
            <Col className="h-100">
                <Row>
                    <Col>
                        <Row className="position-relative">
                            <Col md={{ span: 2, offset: 10 }} className={`${styles.versionBlock} ${activeClass}`}>
                                {(versions.length > 1) ?
                                    <Row>
                                        <button
                                            className={`${styles.versionOption} ${styles.chosen}`}
                                            type="button"
                                            onClick={() => setVersionDropdown(!versionDropdown)}
                                            ref={versionDropdownRef}
                                        >
                                            {`Version ${specimen.version}`}
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                className={`${styles.versionOptionIcon} ${activeClass} position-absolute mx-4`}
                                            />
                                        </button>
                                    </Row>
                                    : <Row>
                                        <button className={`${styles.versionOption} chosen w-100`}>
                                            {`Version ${specimen.version}`}
                                        </button>
                                    </Row>
                                }

                                <div className={`${styles.versionOptions} ${activeClass}`}>
                                    {(versions.length > 1) && versions.map((key) => {
                                        if (key !== specimen.version) {
                                            return (
                                                <Row key={key}>
                                                    <div
                                                        className={`${styles.versionOption} b-none bg-white text-center`}
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
                <Row className={`${styles.contentBlock}`}>
                    <Col className="h-100">
                        <Tabs defaultActiveKey="digitalSpecimen" className={`${styles.tabs}`}>
                            <Tab eventKey="digitalSpecimen" title="Digital Specimen" className="h-100 pt-4">
                                <SpecimenOverview />
                            </Tab>
                            <Tab eventKey="originalData" title="Original Data">
                                <OriginalData />
                            </Tab>
                            <Tab eventKey="annotations" title="Annotations">
                                <AnnotationsOverview />
                            </Tab>
                            <Tab eventKey="digitalMedia" title="Digital Media">
                                <DigitalMedia />
                            </Tab>
                            <Tab eventKey="mids" title="MIDS Terms">
                                <MIDSOverview />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ContentBlock;