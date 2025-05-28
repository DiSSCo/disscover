/* Import Dependencies */
import "@testing-library/react/dont-cleanup-after-each";
import { screen, cleanup } from '@testing-library/react';
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
describe("Specimen Page Tests", () => {
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
});