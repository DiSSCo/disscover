// @ts-nocheck

/* Impot Dependencies */
import { useEffect } from 'react';
import CytoscapeComponent from '../../../../node_modules/react-cytoscapejs/src/index';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

/* Import Sources */
import OrganisationLogos from 'sources/organisationLogos.json';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    target: DigitalSpecimen,
    relations: {
        id: string,
        name: string,
        annotation?: boolean
    }[]
};


const Cytoscape = (props: Props) => {
    const { target, relations } = props;

    /* Hooks */
    let cy: cytoscape.Core;

    /* Base variables */
    const elements: cytoscape.ElementDefinition[] = [];
    const organisationLogos: { [ror: string]: { name: string, logo: string | string[] } } = { ...OrganisationLogos };

    /* Function to try and find logo to display in node */
    const FindLogo = ({ id, name }) => {
        let logo: JSX.Element;

        /* Grab organisation id if is organisation link */
        switch (name) {
            case 'hasOrganisationId':
                if (id.replace('https://ror.org/', '') in organisationLogos) {
                    const organisationLogo = organisationLogos[organisationId].logo;

                    if (Array.isArray(organisationLogo)) {
                        logo = organisationLogo[0];
                    } else {
                        logo = organisationLogo;
                    }
                }

                break;
            case 'hasSourceSystemId':
                logo = <FontAwesomeIcon icon={faDatabase} />

                break;
            default:
                break;
        }

        return logo
    }

    /* Push target as center piece to graph */
    elements.push({
        data: {
            id: 'test',
            label: target['ods:specimenName']
        },
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
                'background-image': logo,
                ...(relation.annotation && { 'background-color': '#28bacb' })
            }
        });

        /* Add link to node */
        elements.push({
            data: {
                id: `${relation.id}_${index}`,
                source: 'test',
                target: relation.id,
                label: relation.name
            }
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
        }
    ];

    /* Listener for Node click */
    useEffect(() => {
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
        <CytoscapeComponent cy={(cyRef) => { cy = cyRef }}
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
}

export default Cytoscape;