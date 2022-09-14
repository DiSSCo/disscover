import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './annotate.css';

/* Import components */
import Header from 'templates/header/Header';
import Body from './body/Body';
import Footer from 'templates/footer/Footer';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';
import FilterSpecimen from 'api/specimen/FilterSpecimen';


const Annotate = () => {
    const location = useLocation();;
    const params = useParams();

    let mode = 'annotate';
    let mids = false;

    if (location['state']) {
        if (location['state']['mode']) {
            mode = location['state']['mode'];
        }
        if (location['state']['mids']) {
            mids = location['state']['mids'];
        }
    }

    const [specimen, setSpecimen] = useState();

    if (!specimen) {
        if (location.state) {
            if (location.state.version) {
                if (location.state.specimen['Meta']['version']['value'] !== location.state.version) {
                    GetSpecimen(location.state.specimen['Meta']['id']['value'], Process);
                }
            } else {
                setSpecimen(location.state.specimen);
            }
        } else if (params['prefix'] && params['suffix']) {
            GetSpecimen(`${params['prefix']}/${params['suffix']}`, Process);
        }

        function Process(result) {
            const specimen = FilterSpecimen(result);

            setSpecimen(specimen);
        }
    } else {
        return (
            <div className="d-flex flex-column min-vh-100" style={{ overflow: 'clip' }}>
                <Header />

                <Body specimen={specimen} mode={mode} mids={mids} />

                <Footer />
            </div>
        );
    }
}

export default Annotate;