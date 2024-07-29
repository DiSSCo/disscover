/* Import Depdencies */
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node'

/* Import Mock Data */
import DigitalSpecimenMock from 'tests/mock/digitalSpecimen/digitalSpecimen.json';
import SpecimenAnnotationsMock from 'tests/mock/digitalSpecimen/specimenAnnotations.json';
import SpecimenDigitalMediaMock from 'tests/mock/digitalSpecimen/specimenDigitalMedia.json';
import SpecimenVersionsMock from 'tests/mock/digitalSpecimen/specimenVersions.json';
import SpecimenDisciplineMock from 'tests/mock/digitalSpecimen/specimenDiscipline.json';


/**
 * Function to set up a custom mock server for simulating API calls
 */
const Server = setupServer(
    /* Get Digital Specimen by ID */
    http.get('/digital-specimen/20.5000.1025/DW0-BNT-FM0', () => {
        return HttpResponse.json(DigitalSpecimenMock);
    }),
    /* Get Digital Specimen's Annotations by ID */
    http.get('/digital-specimen/20.5000.1025/DW0-BNT-FM0/annotations', () => {
        return HttpResponse.json(SpecimenAnnotationsMock);
    }),
    /* Get Digital Specimen, Digital Media */
    http.get('/digital-specimen/20.5000.1025/DW0-BNT-FM0/digital-media', () => {
        return HttpResponse.json(SpecimenDigitalMediaMock);
    }),
    /* Get Digital Specimen's verions by id */
    http.get('/digital-specimen/20.5000.1025/DW0-BNT-FM0/versions', () => {
        return HttpResponse.json(SpecimenVersionsMock);
    }),
    /* Get Topic Disciplines numbers */
    http.get('/digital-specimen/discipline', () => {
        return HttpResponse.json(SpecimenDisciplineMock);
    })
);

export default Server;