/* Import Dependencies */
import { act } from "react-dom/test-utils";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom';
import KeycloakService from "keycloak/Keycloak";
import MockKeycloakService from "tests/MockKeycloak";

/* Import Store */
import { renderWithProviders } from 'tests/AppRender';

/* Import Mock Data */
import SpecimenMock from 'tests/mockData/specimen/specimen.json';
import SpecimenAnnotationsMock from 'tests/mockData/specimen/specimenAnnotations.json';
import SpecimenDigitalMediaMock from 'tests/mockData/specimen/specimenDigitalMedia.json';
import SpecimenVersionsMock from 'tests/mockData/specimen/specimenVersions.json';


/* Import Components */
import Specimen from 'components/specimen/Specimen';


// beforeEach(async () => {
//     await 
// });


/* Mock API Requests */
const server = setupServer(
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0', (_req, res, ctx) => {
        return res(ctx.json(SpecimenMock));
    }),
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0/annotations', (_req, res, ctx) => {
        return res(ctx.json(SpecimenAnnotationsMock));
    }),
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0/digitalmedia', (_req, res, ctx) => {
        return res(ctx.json(SpecimenDigitalMediaMock));
    }),
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0/versions', (_req, res, ctx) => {
        return res(ctx.json(SpecimenVersionsMock));
    })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());


/* Test if Specimen data is fetched and rendered */
it('fetches specimen data', async () => {
    await act(() =>
        renderWithProviders('/ds/20.5000.1025/DW0-BNT-FM0',
            <Routes>
                <Route path="/ds/:prefix/:suffix"
                    element={<Specimen />}
                />
            </Routes>
        )
    );

    expect(screen.getByRole('heading', { name: SpecimenMock.specimenName })).toBeInTheDocument();
});

/* Test if Annotate Modal is toggled when clicked on Specimen property */
it('toggles annotate modal', async () => {
    const user = userEvent.setup();

    const token = await MockKeycloakService();

    const Continue = async () => {
        await act(() =>
            renderWithProviders('/ds/20.5000.1025/DW0-BNT-FM0',
                <Routes>
                    <Route path="/ds/:prefix/:suffix"
                        element={<Specimen />}
                    />
                </Routes>
            )
        );

        const modalTriggerProperty = screen.getByRole('modalTriggerProperty').parentElement;

        if (modalTriggerProperty) {
            await waitFor(() => user.click(modalTriggerProperty));
        }

        expect(screen.getByRole('annotateModalCurrentValue')).toBeInTheDocument();
    }

    KeycloakService.InitKeyCloak(Continue, token);
});