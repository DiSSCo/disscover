/* Import Dependencies */
import "@testing-library/react/dont-cleanup-after-each";
import { screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom';

/* Import Store */
import { renderWithProviders } from 'tests/AppRender';

/* Import Components to be tested */
import Home from "components/home/Home";


describe("Home Page Tests", () => {
    beforeAll(() => {
        renderWithProviders('/',
            <Routes>
                <Route path="/"
                    element={<Home />}
                />
            </Routes>
        );
    });

    afterAll(() => {
        cleanup();
    });

    /* Test if Advanced Search options can be toggled */
    it("is able to toggle the advanced search", async () => {
        const user = userEvent.setup();

        const advancedSearchTrigger = screen.getByText("Advanced Search");

        if (advancedSearchTrigger) {
            await waitFor(() => user.click(advancedSearchTrigger));            
        }

        expect(screen.getByRole('advancedSearch')).toHaveClass('active');
    });
});