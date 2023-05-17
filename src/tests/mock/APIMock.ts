/* Import Depdencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node'

/* Import Mock Data */
import SpecimenFullMock from 'tests/mock/specimen/specimenFull.json';
import SpecimenMock from 'tests/mock/specimen/specimen.json';
import SpecimenAnnotationsMock from 'tests/mock/specimen/specimenAnnotations.json';
import SpecimenDigitalMediaMock from 'tests/mock/specimen/specimenDigitalMedia.json';
import SpecimenVersionsMock from 'tests/mock/specimen/specimenVersions.json';
import SpecimenDisciplineMock from 'tests/mock/specimen/specimenDiscipline.json';
import UserMock from 'tests/mock/user/user.json';
import SourceSystemMock from 'tests/mock/sourceSystem/sourceSystem.json';


const Server = setupServer(
    /* Get Full Specimen by id */
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0/full', (_req, res, ctx) => {
        return res(ctx.json(SpecimenFullMock));
    }),
    /* Get Specimen by id */
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0', (_req, res, ctx) => {
        return res(ctx.json(SpecimenMock));
    }),
    /* Get Specimen's Annotations by id */
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0/annotations', (_req, res, ctx) => {
        return res(ctx.json(SpecimenAnnotationsMock));
    }),
    /* Get Specimen Digital Media */
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0/digitalmedia', (_req, res, ctx) => {
        return res(ctx.json(SpecimenDigitalMediaMock));
    }),
    /* Get Specimen's verions by id */
    rest.get('/specimens/20.5000.1025/DW0-BNT-FM0/versions', (_req, res, ctx) => {
        return res(ctx.json(SpecimenVersionsMock));
    }),
    /* Get Specimen Disciplines */
    rest.get('/specimens/discipline', (_req, res, ctx) => {
        return res(ctx.json(SpecimenDisciplineMock));
    }),
    /* Get User */
    rest.get('/users/SubjectId', (_req, res, ctx) => {
        return res(ctx.json(UserMock));
    }),
    /* Get Source System */
    rest.get('https://orchestration.dissco.tech/source-system/sourceSystemId', (_req, res, ctx) => {
        return res(ctx.json(SourceSystemMock));
    })
);

export default Server;