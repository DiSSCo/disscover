/* Import Dependencies */
import "@testing-library/react/dont-cleanup-after-each";
import { screen, cleanup } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

/* Import Store */
import { renderWithProviders } from 'tests/AppRender';

/* Import Mock Data */
import VirtualCollectionMock from 'tests/mock/virtualCollections/virtualCollections.json';

/* Import Components to be tested */
import VirtualCollections from 'components/virtualCollections/VirtualCollections';


/**
 * Description of tests to validate the Virtual Collections component
 */
describe("General Virtual Collections Page Tests", () => {
    beforeEach(() => {
        renderWithProviders('/virtual-collections',
            <Routes>
                <Route path="/virtual-collections"
                    element={<VirtualCollections />}
                />
            </Routes>
        );
    });

    afterAll(() => {
        cleanup();
    });

    /* Test if virtual collection data is fetched and rendered */
    it('fetches virtual collection data onload', async () => {
        expect(await screen.findByRole('heading', { name: 'Virtual Collections' })).toBeInTheDocument();
    });
    it('fetches virtual collection data', async () => {
        // expect(await screen.findByText(VirtualCollectionMock.data[0].attributes['ltc:collectionName']));
        // expect(await screen.findByDisplayValue(VirtualCollectionMock.data[0].attributes['ltc:collectionName']));
        expect(await screen.findByRole('textbox', { name: VirtualCollectionMock.data[0].attributes['ltc:collectionName']})).toBeInTheDocument()
    });
});