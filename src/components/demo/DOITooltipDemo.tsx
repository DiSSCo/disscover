/* Import Dependencies */
import { useState, useEffect, useRef } from "react";

/* Import Styles */
import './DOITooltip.css';

/* Import Webroot */
import OrganisationLogo from './webroot/building-columns-solid.svg';
import DOILogo from './webroot/DOI_logo.png';


/* Props Typing */
interface Props {
    doi: string
    children: string | React.ReactElement,
};


const DOITooltipDemo = (props: Props) => {
    const { doi, children } = props;

    /* Hooks */
    const targetRef = useRef<HTMLSpanElement>(null);
    const DOITooltipRef = useRef<HTMLDivElement>(null);

    /* Base variables */
    const [record, setRecord] = useState<any>({});
    const [active, setActive] = useState(false);

    /* Function for fetching DOI details */
    const TriggerTooltip = async () => {
        try {
            const response = await fetch(`https://dev.dissco.tech/handle-manager/api/v1/pids/${doi}`);
            const record = await response.json();
            setActive(true);

            setRecord(record);
        } catch (error) {
            console.warn(error);
        }
    }

    /* Closing the Tooltip when clicked outside of it */
    const UseDOITooltip = () => {
        useEffect(() => {
            const DOITooltipElement = DOITooltipRef.current as HTMLDivElement;

            const handleClickOutside = (event: any) => {
                if (!DOITooltipElement.contains(event.target)) {
                    if (active) {
                        setActive(false);
                    }
                }
            }

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [DOITooltipRef, active]);
    }

    UseDOITooltip();

    /* Set offset styles for DOI Tooltip */
    const offsetStyles = {
        marginTop: targetRef.current ? `${targetRef.current?.offsetTop + 20}px` : '0px',
        marginLeft: targetRef.current ? `${targetRef.current?.offsetLeft}px` : '0px'
    }

    return (
        <>
            <span style={{ color: 'blue', cursor: 'pointer' }} ref={targetRef} onClick={() => TriggerTooltip()}> {children} </span>

            <div id="disscoTooltip" className={`tooltip ${active && 'active'}`} ref={DOITooltipRef} style={offsetStyles}>
                {record.data ?
                    <>
                        {/* Digital Extended Specimen */}
                        <div className="tooltipRow">
                            <div className="widthLeft">
                                <p className="digitalExtendedSpecimenTitle"> DES </p>
                            </div>
                            <div className="widthRight">
                                <p id="tooltipScientificName" className="digitalExtendedSpecimenTitle"> {record.data.attributes.referentName} </p>
                                <p id="tooltipStatus" className="preservedStatus textOverflow"> {`${record.data.attributes.livingOrPreserved}
                            ${record.data.attributes.topicDiscipline.toLowerCase()} specimen`} </p>
                            </div>
                        </div>

                        {/* ID */}
                        <div className="tooltipRow margin">
                            <span className="widthLeft">
                                <p className=""> ID </p>
                            </span>
                            <span className="widIDTitlethRight">
                                <p id="tooltipID" className="IDField"> {record.data.attributes.primarySpecimenObjectId} </p>
                                <p id="tooltipGUID" className="IDField"> (Catalog Record GUID) </p>
                            </span>
                        </div>

                        {/* Organisation */}
                        <div className="tooltipRow margin">
                            <span className="widthLeft">
                                <img src={OrganisationLogo} className="organisationIcon" alt="ORG" />
                            </span>
                            <span className="widthRight">
                                <p id="tooltipOrganisation" className="organisationTitle"> {record.data.attributes.specimenHostName} </p>
                            </span>
                        </div>

                        {/* DOI Logo */}
                        <div className="tooltopRow DOIRow">
                            <img src={DOILogo} alt="DOI Logo" className="DOILogo" />
                        </div>
                    </>
                    :
                    <p> Waiting on data... </p>
                }
            </div>
        </>
    );
}

export default DOITooltipDemo;