/* Import Dependencies */
import "@testing-library/react/dont-cleanup-after-each";
import { screen, cleanup, fireEvent, within } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

/* Import Store */
import { renderWithProviders } from 'tests/AppRender';

/* Import Mock Data */
import SpecimenMock from 'tests/mock/digitalSpecimen/digitalSpecimenComplete.json';

/* Import Components to be tested */
import DigitalSpecimen from 'components/digitalSpecimen/DigitalSpecimen';


/**
 * Description of tests to validate the Digital Specimen component
 */
describe("General Digital Specimen Page Tests", () => {
    beforeEach(() => {
        renderWithProviders('/ds/20.5000.1025/DW0-BNT-FM0',
            <Routes>
                <Route path="/ds/:prefix/:suffix/:version?"
                    element={<DigitalSpecimen />}
                />
            </Routes>
        );
    });

    afterAll(() => {
        cleanup();
    });

    /* Test if Specimen data is fetched and rendered */
    it('fetches specimen data onload', async () => {
        expect(await screen.findByRole('heading', { name: SpecimenMock.data.attributes.digitalSpecimen['ods:specimenName'] })).toBeInTheDocument();
    });

    /* Test if annotation panel opens when clicking on the identificationAnnotationButton */
    it('opens the annotation panel when clicking the identification annotation button', async () => {
        // Find the unique heading for the section
        const heading = await screen.findByText('Accepted Identification');

        // Find the closest 'Card' ancestor element
        const identificationCard = heading.closest('.card');

        // If the card is found, search for the button within it
        if (identificationCard) {
            const annotationButton = within(identificationCard as HTMLElement).findByText('Annotate');
            fireEvent.click(await annotationButton);
        }

        // Find annotation target
        const annotationTarget = await screen.findByText('Annotate Taxon Identifications');

        // Check if annotation panel is visible
        expect(annotationTarget).toBeVisible();
    });

    /* Test if annotation panel opens when clicking on the georeferenceAnnotationButton */
    it('opens the annotation panel when clicking the georeference annotation button', async () => {
        // Find the unique heading for the section
        const heading = await screen.findByText('Geographical Map');

        // Find the closest 'Card' ancestor element
        const identificationCard = heading.closest('.card');

        // If the card is found, search for the button within it
        if (identificationCard) {
            const annotationButton = within(identificationCard as HTMLElement).findByText('Annotate');
            fireEvent.click(await annotationButton);
        }

        // Find annotation target
        const annotationTarget = await screen.findByText('Annotate Georeference');

        // Check if annotation panel is visible
        expect(annotationTarget).toBeVisible();
    });
});