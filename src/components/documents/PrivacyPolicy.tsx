/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from './documents.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';


const PrivacyPolicy = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container className={styles.documentContent}>
                <Row className="h-100 overflow-scroll">
                    <Col md={{ span: 8, offset: 2 }}>
                        {/* Title */}
                        <Row className="mt-5">
                            <Col className="mt-4">
                                <h1 className="fs-2 c-primary">Privacy</h1>
                            </Col>
                        </Row>

                        {/* Document Content */}
                        <Row>
                            <Col>
                                {/* Sections */}
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Description of the Service</h4>
                                        <p className="fs-4">
                                            DiSSCover (hereinafter referred to as: “the service”) provides an interface for Digital Specimen search and annotation.
                                            It uses the DiSSCo Login service for authentication. This privacy notice describes how we, the Naturalis Biodiversity Center,
                                            The Netherlands (hereinafter referred to as "we" or "the Data Controller"), collect and process data by which you can be
                                            personally identified (“Personal Data”) when you use the service.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Data controller</h4>
                                        <p className="fs-4">
                                            Naturalis Biodiversity Center <br />
                                            Darwinweg 2 <br />
                                            2333 CR Leiden <br />
                                            The Netherlands
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Data controller’s data protection officer</h4>
                                        <p className="fs-4">
                                            Hans Dautzenberg <br />
                                            Naturalis Biodiversity Center <br />
                                            Darwinweg 2 <br />
                                            2333 CR Leiden <br />
                                            The Netherlands <br />
                                            E-mail: info@dissco.eu
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Jurisdiction and supervisory authority</h4>
                                        <p className="fs-4">
                                            Jurisdiction: NL, The Netherlands <br /> <br />
                                            Supervisory authority: Dutch Data Protection Authority.
                                            They can be contacted at https://autoriteitpersoonsgegevens.nl/en/contact-dutch-dpa/contact-us
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Personal data processed</h4>
                                        <p className="fs-4">
                                            The Login service may process the following personal data:
                                        </p> <br />
                                        <p className="fs-4 fw-bold"> Identification data: </p>
                                        <ul className="fs-4">
                                            <li> Name </li>
                                            <li>
                                                Identification numbers (as provided by identity providers like a home institution,
                                                or identifiers from third parties like ORCID)
                                            </li>
                                            <li> E-mail address </li>
                                            <li> Affiliation </li>
                                            <li> Country </li>
                                            <li> IP address </li>
                                        </ul>

                                        <p className="fs-4 fw-bold"> Behavioural data: </p>
                                        <ul className="fs-4">
                                            <li> Usage data (websites, services, social media) </li>
                                            <li> Login timestamps </li>
                                        </ul>

                                        <p className="fs-4 fw-bold"> Collaboration data: </p>
                                        <ul className="fs-4">
                                            <li> Membership information on roles, groups and communities </li>
                                        </ul>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Purpose of the processing of personal data</h4>
                                        <p className="fs-4"> The purpose of the collection, processing and use of the personal data mentioned above is: </p> <br />

                                        <ul className="fs-4">
                                            <li>
                                                To provide the service functions, i.e. to identify, authenticate and authorise users for
                                                accessing DiSSCo or third party services as a member of one or more groups or communities
                                                identified by the DiSSCo Login Service
                                            </li>
                                            <li> To monitor and maintain service stability, performance and security </li>
                                            <li> To understand scientific user groups and demographics for DiSSCo services </li>
                                        </ul>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Legal basis</h4>
                                        <p className="fs-4">
                                            The legal basis for processing personal data is: Legitimate interests pursued by the controller or by a
                                            third party according to Art. 6 (1) (f) GDPR.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Third parties to whom personal data is disclosed</h4>
                                        <p className="fs-4">
                                            Personal data will not be used beyond the original purpose of their acquisition. If a forwarding
                                            to third parties should be necessary to answer an inquiry or to carry out a service, the approval
                                            of the data subject is considered to have been given by entering in a contract when using the respective
                                            function or service. In particular, the data you provide to us will not be used for advertising purposes.

                                            <br />

                                            For the purpose given in this privacy policy, personal data may be passed to the following third parties:
                                        </p>
                                        <br />

                                        <p className="fs-4 fw-bold"> Within the EU / EEA: </p>
                                        <ul className="fs-4">
                                            <li> GRNET (resource provider, data processor) </li>
                                            <li> External service providers (integrated with the service) </li>
                                            <li> Community and/or Group managers </li>
                                            <li> European Commission project partners and officers </li>
                                            <li>
                                                The records of your use and technical log files produced by the service components may be shared for
                                                security incident response purposes with other authorised participants in the academic and research
                                                distributed digital infrastructures via secured mechanisms, only for the same purposes and only as far
                                                as necessary to provide the incident response capability where doing so is likely to assist in the
                                                investigation of suspected misuse of Infrastructure resources.
                                            </li>
                                        </ul>

                                        <p className="fs-4 fw-bold"> Outside the EU / EEA: </p>
                                        <ul className="fs-4">
                                            <li> Other service providers (integrated with DiSSCo Login) </li>
                                            <li> Group managers </li>
                                        </ul>

                                        <p className="fs-4">
                                            Any data transfer to a third country outside the EU or the EEA only takes place under the conditions contained
                                            in Chapter V of the GDPR and in compliance with the provisions of this privacy policy and any related policies
                                            adopted by the Naturalis Biodiversity Center.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Your rights</h4>
                                        <p className="fs-4">
                                            You can exercise the following rights at any time by contacting our data protection officer using the contact
                                            details provided in the Data Protection Officer section:
                                        </p>
                                        <ul className="fs-4">
                                            <li> Information about your data stored with us and their processing </li>
                                            <li> Correction of incorrect personal data </li>
                                            <li> Deletion of your data stored by us </li>
                                            <li> Restriction of data processing, if we are not yet allowed to delete your data due to legal obligations </li>
                                            <li> Objection to the processing of your data by us </li>
                                            <li> Data portability </li>
                                        </ul>

                                        <p className="fs-4"> To access your profile information, you can go to your user profile page. </p> <br />
                                        <p className="fs-4">
                                            To access and rectify the data released by your home organisation (e.g. your university, research institute or
                                            any other identity provider), you should contact them.
                                        </p> <br />
                                        <p className="fs-4">
                                            You can complain at any time to the supervisory data protection authority (DPA) responsible for you. Your responsible
                                            DPA depends on your country and state of residence, of your workplace or of the presumed violation. A list of the
                                            supervisory authorities with addresses can be found at

                                            <span className="c-accent">
                                                <a href="https://edpb.europa.eu/about-edpb/board/members_en">
                                                    {` https://edpb.europa.eu/about-edpb/board/members_en`}
                                                </a>
                                            </span>.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Data retention and deletion</h4>
                                        <p className="fs-4">
                                            Your personal data associated with your account is kept as long as your DiSSCo account is active. Your
                                            account can be deactivated on request. <br /> <br />
                                            The records of your use and technical log files produced by the service components will be deleted or anonymised
                                            after, at most, 18 months.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">Security</h4>
                                        <p className="fs-4">
                                            We take appropriate technical and organisational measures to ensure data security and the protection against
                                            accidental or unlawful destruction, accidental loss, alteration, unauthorised disclosure or access. 
                                        </p> <br />
                                        <p className="fs-4">
                                            A comprehensive overview of the technical and organisational measures taken by the Naturalis Biodiversity
                                            Center can be downloaded from

                                            <span className="c-accent">
                                                <a href="https://www.dissco.eu/privacy-policy/">
                                                    {` https://www.dissco.eu/privacy-policy/`}
                                                </a>
                                            </span>.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="mt-4 mb-4">
                                    <Col>
                                        <h4 className="fs-3">Additional Policies</h4>
                                        <p className="fs-4">
                                            Your  personal  data  will  be  protected  according  to  the

                                            <span className="c-accent text-decoration-underline">
                                                <a href="https://www.geant.net/uri/dataprotection-code-of-conduct/v1">
                                                    {` Code  of  Conduct  for Service  Providers`}
                                                </a>
                                            </span>

                                            ,  a  common standard  for  the  research  and  higher  education sector to protect your privacy
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default PrivacyPolicy;