// @ts-nocheck
/* Import Dependencies */
import { useEffect, useState, useCallback, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { Dict } from 'app/Types';

/* Import Styles */
import styles from './graphs.module.scss';

/* Import Webroot */
import DiSSCoLogo from 'webroot/img/dissco-logo-web.svg';


/* Props Typing */
interface Props {
    target: DigitalSpecimen,
    relations: {
        id: string,
        name: string
    }[]
};


const RelationalGraph = (props: Props) => {
    const { target, relations } = props;

    /* Hooks */
    const graphRef = useRef(null);
    const detailsBlockRef = useRef<HTMLDivElement>(null);

    /* Base variables */
    const [nodeTracker, setNodeTracker] = useState({
        [target['ods:id']]: {
            id: target['ods:id'],
            name: target['ods:specimenName'],
            color: '#4d59a2'
        }
    });
    const [linkTracker, setLinkTracker] = useState<Dict>({});
    const [canvas, setCanvas] = useState<Dict>();
    const [detailsNode, setDetailsNode] = useState<Dict>();

    /* Ref for graph canvas parent */
    const MakeCanvas = useCallback((col: Dict) => {
        if (col && !canvas) {
            const newCanvas = {
                width: col.getBoundingClientRect().width,
                height: col.getBoundingClientRect().height
            }

            setCanvas(newCanvas);
        }
    }, []);

    /* Hook for clicking outside of details block */
    const UseDetailsBlock = () => {
        useEffect(() => {
            const detailsBlockElement = detailsBlockRef.current as HTMLDivElement;

            const handleClickOutside = (event: Dict) => {
                if (!detailsBlockElement.contains(event.target)) {
                    if (detailsNode) {
                        setDetailsNode(false);
                    }
                }
            }

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [detailsBlockRef, detailsNode])
    }

    UseDetailsBlock();

    /* OnLoad: Create nodes and links between Enity Relationships */
    useEffect(() => {
        /* For each observed taxon, add to graph data */
        if (relations.length > 0) {
            const copyNodeTracker = { ...nodeTracker };
            const copyLinkTracker = { ...linkTracker };

            relations.forEach((relation) => {
                copyNodeTracker[relation.id] = {
                    id: relation.id,
                    name: relation.name,
                    color: '#51a993'
                };

                copyLinkTracker[`${relation.id}-${target['ods:id']}`] = {
                    source: relation.id,
                    target: target['ods:id']
                };
            });

            setNodeTracker(copyNodeTracker);
            setLinkTracker(copyLinkTracker);
        }
    }, [relations]);

    /* Prepare graph nodes and links */
    const nodes: Dict[] = [];

    Object.entries(nodeTracker).forEach((value) => {
        nodes.push(value[1]);
    });

    const links: Dict[] = [];

    Object.entries(linkTracker).forEach((value) => {
        links.push(value[1]);
    });

    const graphData = {
        nodes: nodes,
        links: links
    };

    /* Set Zoom */
    if (graphRef.current) {
        graphRef.current.zoom(5);
    }

    /* ClassNames */
    const classDetailsBlock = classNames({
        [`${styles.relationalGraphDetailsBlock} bottom-0 end-0`]: true,
        'opacity-0': !detailsNode
    });

    return (
        <Row className="h-100 w-100 py-4">
            <Col className="h-100 w-100 mx-3 bg-white overflow-hidden position-relative" ref={MakeCanvas}>
                {canvas &&
                    <ForceGraph2D
                        ref={graphRef}
                        graphData={graphData}
                        height={canvas['height']}
                        width={canvas['width']}
                        onNodeClick={(node) => setDetailsNode(node)}
                        onBackgroundClick={() => setDetailsNode()}
                        rendererConfig={{
                            centerAt: [(canvas['height'] / 2), (canvas['width'] / 2)],
                            pauseAnimation: true
                        }}
                        nodeCanvasObjectMode={() => "after"}
                        nodeCanvasObject={(node, ctx, globalScale) => {
                            const label = node.name;
                            const fontSize = 10 / globalScale;
                            ctx.font = `${fontSize}px Sans-Serif`;
                            ctx.textAlign = node.isClusterNode ? "center" : "left";
                            ctx.textBaseline = "middle";
                            ctx.fillStyle = 'black';

                            if (node.isClusterNode) {
                                ctx.fillText(label, node.x as number, node.y as number);
                            } else {
                                ctx.fillText(label, node.x as number - 4, node.y as number);
                            }
                        }}
                        nodeRelSize={8}
                        enableNodeDrag={false}
                    />
                }

                {/* Details Block */}
                <div ref={detailsBlockRef}
                    className={`${classDetailsBlock} position-absolute bgc-white b-primary z-1 rounded-c overflow-hidden d-flex flex-column`}
                >
                    <Row>
                        <Col>
                            <div className="bgc-primary px-3 py-2">
                                <p className="fs-3 textOverflow fw-lightBold c-white"> {detailsNode?.name} </p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="flex-grow-1">
                        <Col>
                            <p className="fs-4 px-3 py-2">
                                <a href={detailsNode?.id} target="_blank">
                                    Link to source
                                </a>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <img src={DiSSCoLogo}
                                alt="DiSSCo logo"
                                className="mx-5 my-2"    
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default RelationalGraph;