/* Import Dependencies */
import "@testing-library/react/dont-cleanup-after-each";
import { screen, render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

/* Import Types */
import { Identification } from "app/types/Identification";

/* Import Components to be tested */
import AcceptedIdentification from '../digitalSpecimenOverviewContent/AcceptedIdentification';

/**
 * Description of unit tests to validate the Accepted Identification component
 */
describe("Accepted Identification", () => {
    const mockProps = {
        acceptedIdentification: {
            '@type': 'ods:Identification',
            'dwc:verbatimIdentification': 'Diplodocus Longus, Marsh 1878',
            'ods:isVerifiedIdentification': true,
            'ods:hasTaxonIdentifications': [
                {
                    '@type': 'ods:TaxonIdentification',
                    'dwc:scientificName': 'Diplodocus Longus',
                    'dwc:scientificNameAuthorship': 'Marsh 1878',
                    'dwc:kingdom': 'Animalia',
                    'dwc:phylum': 'Chordata',
                    'dwc:class': 'Dinosauria',
                    'dwc:order': 'Sauropodomorpha',
                    'dwc:family': 'Diplodocidae',
                    'dwc:genus': ''
                }
            ]
        } as Identification,
        digitalSpecimenName: 'Diplodocus Longus',
    };

    beforeEach(() => {
        render(
            <AcceptedIdentification 
                acceptedIdentification={mockProps.acceptedIdentification}
                digitalSpecimenName={mockProps.digitalSpecimenName}
            />
        );
    })

    it('renders the Accepted Identification of a digital specimen', async () => {
        expect(await screen.findByText('Diplodocus Longus')).toBeInTheDocument();
        expect(await screen.findByText('Animalia')).toBeInTheDocument();
        expect(await screen.findByText('Chordata')).toBeInTheDocument();
        expect(await screen.findByText('Dinosauria')).toBeInTheDocument();
        expect(await screen.findByText('Sauropodomorpha')).toBeInTheDocument();
        expect(await screen.findByText('Diplodocidae')).toBeInTheDocument();
    });

    it('renders a rank available in the data even when it does not have a value', async () => {
        expect(await screen.findByText('Genus:')).toBeInTheDocument();
    });
});