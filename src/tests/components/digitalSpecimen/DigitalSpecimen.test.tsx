/* Import Dependencies */
import "@testing-library/react/dont-cleanup-after-each";
import { screen, cleanup, fireEvent } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

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
    beforeAll(() => {
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

    /* Test if Specimen data is fetched and rendered */
    it('should open the annotation mode when the user clicks on the annotation icon in Accepted identification panel', async () => {
        expect(screen.getByTestId('identification-annotation-button')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('identification-annotation-button'));
        // Find the button
        // Click on the button
        // Check if Annotation Panel is visible
        // Close panel by clicking on button
    });
});