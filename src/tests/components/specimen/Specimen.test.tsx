/* Import Dependencies */
import "@testing-library/react/dont-cleanup-after-each";
import { screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom';

/* Import Store */
import { renderWithProviders } from 'tests/AppRender';

/* Import Mock Data */
import SpecimenMock from 'tests/mock/specimen/specimen.json';

/* Import Components to be tested */
import Specimen from 'components/specimen/Specimen';


describe("Specimen Page Tests", () => {
    beforeAll(() => {
        renderWithProviders('/ds/20.5000.1025/DW0-BNT-FM0',
            <Routes>
                <Route path="/ds/:prefix/:suffix/:version?"
                    element={<Specimen />}
                />
            </Routes>
        );
    });

    afterAll(() => {
        cleanup();
    });

    /* Test if Specimen data is fetched and rendered */
    it('fetches specimen data onload', async () => {
        expect(screen.getByRole('heading', { name: SpecimenMock.data.attributes.specimenName })).toBeInTheDocument();
    });

    /* Test if Annotate Modal is toggled when clicked on Specimen property */
    it('is able to toggle the annotate modal', async () => {
        const user = userEvent.setup();

        const modalTrigger = screen.getByRole('modalTrigger').parentElement;

        if (modalTrigger) {
            await waitFor(() => user.click(modalTrigger));
        }

        expect(screen.getByRole('annotateModalCurrentValue')).toBeInTheDocument();
    })
});