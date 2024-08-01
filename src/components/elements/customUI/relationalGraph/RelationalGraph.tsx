//@ts-nocheck

/* Impot Dependencies */
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';

/* Import Hooks */
import { useTrigger } from 'app/Hooks';

/* Import Sources */
import OrganisationLogos from 'sources/organisationLogos/organisationLogos.json';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    centerPiece: {
        id: string,
        label: string
    },
    relations: {
        id: string,
        name: string,
        annotation?: boolean
    }[]
};


/**
 * Component that renders a relational graph using connect dots and lines, based upon the Cytoscape library
 * @param centerPiece A disctionary containing an id and label key for identifying the center piece of the relational graph
 * @param relations 
 * @returns JSX Component
 */
const RelationalGraph = (props: Props) => {
    const { centerPiece, relations } = props;

    /* Hooks */
    const trigger = useTrigger();
    let cy: cytoscape.Core;

    /* Base variables */
    const elements: cytoscape.ElementDefinition[] = [];
    const organisationLogos: { [ror: string]: { name: string, logo: string | string[] } } = { ...OrganisationLogos };

    /* Function to try and find logo to display in node */
    const FindLogo = ({ id, name }: { id: string, name: string }) => {
        let logo: JSX.Element | string = '';

        /* Grab organisation id if is organisation link */
        switch (name) {
            case 'hasOrganisationId':
                if (id.replace('https://ror.org/', '') in organisationLogos) {
                    const organisationLogo = organisationLogos[id.replace('https://ror.org/', '')].logo;

                    if (Array.isArray(organisationLogo)) {
                        logo = organisationLogo[0];
                    } else {
                        logo = organisationLogo;
                    }
                }

                break;
            case 'hasSourceSystemId':
                logo = <FontAwesomeIcon icon={faDatabase} />;

                break;
            default:
                logo = '';
        };

        return logo;
    };

    /* Push super class as center piece to graph */
    elements.push({
        data: centerPiece,
        classes: 'targetNode',
        style: {
            'background-color': '#4d59a2'
        }
    });

    /* For each relation, push node to elements array */
    relations.forEach((relation, index) => {
        const logo = FindLogo(relation);

        elements.push({
            data: {
                id: relation.id,
                label: relation.name
            },
            style: {
                'background-color': '#A1D8CA',
                ...(relation.annotation && { 'background-color': '#28bacb' }),
                'background-image': logo
            }
        });

        /* Add link to node */
        elements.push({
            data: {
                id: `${relation.id}_${index}`,
                source: centerPiece.id,
                target: relation.id,
                label: relation.name
            },
            classes: "label"
        });
    });

    const stylesheet = [
        {
            selector: 'node',
            style: {
                width: '100%',
                height: '100%'
            }
        },
        {
            selector: 'edge',
            style: {
                label: 'data(label)',
                'font-size': '10rem'
            }
        },
        {
            selector: '.targetNode',
            style: {
                label: 'data(label)'
            }
        },
        {
            selector: '.label',
            style: {
                'color': '#333333',
                'font-weight': 'bold',
                'text-background-color': '#ffffff',
                'text-background-opacity': 0.6,
                'text-background-padding': '4px'
            }
        }
    ];

    /* Trigger that activates when a node is clicked on */
    trigger.SetTrigger(() => {
        /* First remove all current listeners */
        cy.removeAllListeners();

        /* Pan and fit */
        cy.fit();

        /* Then add node onclick listener */
        cy.on('click', 'node', (event) => {
            const node = event.target['_private'].data;

            if (node.id) {
                window.open(node.id, '_blank');
            }
        });

        /* Listener for when adding or removing nodes */
        cy.on('add remove', 'node', () => {
            const layout = cy.layout({
                name: 'concentric',
                minNodeSpacing: 100
            });

            layout.run();

            cy.fit();
        });
    }, [cy]);

    return (
        <CytoscapeComponent
            cy={(cyRef) => { cy = cyRef }}
            elements={elements}
            style={{
                width: '100%',
                height: '100%'
            }}
            stylesheet={stylesheet}
            pan={{ x: 150, y: 150 }}
            layout={{
                name: 'concentric',
                minNodeSpacing: 100
            }}
        />
    );
};

export default RelationalGraph;