/* Import Dependencies */
import "@testing-library/react/dont-cleanup-after-each";
import { screen, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
        acceptedIdentificationIndex: 0,
        annotationMode: false,
        digitalSpecimenName: 'Diplodocus Longus',
        SetAnnotationTarget: vi.fn(),
    };

    beforeEach(() => {
        render(
            <AcceptedIdentification 
                acceptedIdentification={mockProps.acceptedIdentification}
                acceptedIdentificationIndex={mockProps.acceptedIdentificationIndex}
                digitalSpecimenName={mockProps.digitalSpecimenName}
                annotationMode={mockProps.annotationMode}
                SetAnnotationTarget={mockProps.SetAnnotationTarget}
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