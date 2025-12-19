/* Import Dependencies */
import { Container, Row, Col } from "react-bootstrap";

/* Import Styles */
import styles from './staticPage.module.scss';

/* Import Components */
import { Footer } from "components/elements/Elements";


/* Source Material type */
type SourceMaterial = {
    title: string,
    paragraphs: {
        title?: string,
        text?: string,
        links?: {
            [textFragment: string]: string | undefined
        }
        bullets?: string[],
        bulletsLinks?: {
            [bulletIndex: number]: {
                [textFragment: string]: string | undefined
            }
        }
        logo?: string
    }[]
};

/* Props type */
type Props = {
    sourceMaterial: SourceMaterial
};


/**
 * Component that renders the base template for a static page
 * @returns JSX Component
 */
const StaticPage = (props: Props) => {
    const { sourceMaterial } = props;

    return (
        <div className="h-100 d-flex flex-column">
            {/* Static page body */}
            <Container fluid className="flex-grow-1 overflow-hidden">
                <Row className="h-100">
                    <Col lg={{ span: 6, offset: 3 }}
                        className="h-100 py-5 overflow-scroll"
                    >
                        {/* Based upon source material, render this static page's contents */}
                        <h2>
                            {sourceMaterial.title}
                        </h2>
                        {sourceMaterial.paragraphs.map((paragraph, index) => {
                            const key = `paragraph_${index}`;

                            return (
                                <Row key={key}
                                    className="mt-4"
                                >
                                    <Col>
                                        {/* Paragraph title */}
                                        {paragraph.title &&
                                            <Row className="mb-2">
                                                <Col>
                                                    <h3 className="fs-3">
                                                        {paragraph.title}
                                                    </h3>
                                                </Col>
                                            </Row>
                                        }
                                        {/* Logo and paragraph text */}
                                        <Row>
                                            {paragraph.logo &&
                                                <Col lg="auto">
                                                    <img src={`/webroot/${paragraph.logo}`}
                                                        alt={paragraph.logo}
                                                        className={styles.logo}
                                                    />
                                                </Col>
                                            }
                                            <Col>
                                                {paragraph.text &&
                                                    <p className="fs-4">
                                                        {paragraph.text.split(' ').map((textSegment, subIndex) => {
                                                            const key = `${textSegment}_${index}_${subIndex}_${Math.random()}`;

                                                            if (textSegment === '<br') {
                                                                return <br key={key} />;
                                                            } else if (paragraph.links && textSegment in paragraph.links) {
                                                                return <a key={key}
                                                                    href={paragraph.links[textSegment]}
                                                                    target="_blank"
                                                                    rel="noreferer"
                                                                    className="tc-accent"
                                                                >
                                                                    {`${textSegment} `}
                                                                </a>;
                                                            } else if (textSegment !== '/>') {
                                                                return <span key={key}>
                                                                    {`${textSegment} `}
                                                                </span>;
                                                            }
                                                        })}
                                                    </p>
                                                }
                                            </Col>
                                        </Row>
                                        {/* Paragraph bullets */}
                                        {paragraph.bullets &&
                                            <Row className="mt-3">
                                                <Col>
                                                    <ul className="fs-4">
                                                        {paragraph.bullets.map((bullet, subIndex) => {
                                                            const key = `bullet_${index}_${subIndex}_${Math.random()}`;

                                                            return (
                                                                <li key={key}>
                                                                    {bullet.split(' ').map(bulletSegment => {
                                                                        const key = `${bulletSegment}_${index}_${subIndex}_${Math.random()}`;

                                                                        if (paragraph.bulletsLinks && bulletSegment in paragraph.bulletsLinks[subIndex]) {
                                                                            return <a key={key}
                                                                                href={paragraph.bulletsLinks[subIndex][bulletSegment]}
                                                                                target="_blank"
                                                                                rel="noreferer"
                                                                                className="tc-accent"
                                                                            >
                                                                                {`${bulletSegment} `}
                                                                            </a>;
                                                                        } else {
                                                                            return <span key={key}>
                                                                                {`${bulletSegment} `}
                                                                            </span>;
                                                                        }
                                                                    })}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </Col>
                                            </Row>
                                        }
                                    </Col>
                                </Row>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default StaticPage;