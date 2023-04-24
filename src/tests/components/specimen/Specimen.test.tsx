/* Import Dependencies */
import { act } from 'react-dom/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Routes, Route } from 'react-router-dom';

/* Import Store */
import { renderWithProviders } from 'tests/AppRender';

/* Import Mock Data */
import SpecimenMock from 'tests/mock/specimen/specimen.json';
import SpecimenAnnotationsMock from 'tests/mock/specimen/specimenAnnotations.json';
import SpecimenDigitalMediaMock from 'tests/mock/specimen/specimenDigitalMedia.json';
import SpecimenVersionsMock from 'tests/mock/specimen/specimenVersions.json';
import UserMock from 'tests/mock/user/user.json';
import SourceSystemMock from 'tests/mock/sourceSystem/sourceSystem.json';

/* Import Components to be tested */
import Specimen from 'components/specimen/Specimen';


/* Mock API Requests */
const server = setupServer(
    /* Get Specimen by id */
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0', (_req, res, ctx) => {
        return res(ctx.json(SpecimenMock));
    }),
    /* Get Specimen's Annotations by id */
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0/annotations', (_req, res, ctx) => {
        return res(ctx.json(SpecimenAnnotationsMock));
    }),
    /* Get Specimen's Digital Media by id */
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0/digitalmedia', (_req, res, ctx) => {
        return res(ctx.json(SpecimenDigitalMediaMock));
    }),
    /* Get Specimen's verions by id */
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0/versions', (_req, res, ctx) => {
        return res(ctx.json(SpecimenVersionsMock));
    }),
    rest.get('/users/SubjectId', (_req, res, ctx) => {
        return res(ctx.json(UserMock));
    }),
    rest.get('/source-systems/sourceSystemId', (_req, res, ctx) => {
        return res(ctx.json(SourceSystemMock));
    }),
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
});