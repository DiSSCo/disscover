import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import "./specimen.scss";

/* Import Components */
import Header from '../header/Header';
import Body from './body/Body';
import Footer from '../footer/Footer';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';
import FilterSpecimen from 'api/specimen/FilterSpecimen';
import GetSpecimenDigitalMedia from 'api/specimen/GetSpecimenDigitalMedia';


const Specimen = () => {
    const location = useLocation();
    const params = useParams();

    const [specimen, setSpecimen] = useState();

    useEffect(() => {
        if (location.state) {
            if (!location.state.specimen['media']) {
                GetSpecimenDigitalMedia(location.state.specimen['Meta']['id']['value'], (media) => ProcessMedia(media, location.state.specimen));
            } else {
                setSpecimen(location.state.specimen);
            }
        } else if (params['prefix'] && params['suffix']) {
            GetSpecimen(`${params['prefix']}/${params['suffix']}`, ProcessSpecimen);
        }
    }, []);

    function ProcessSpecimen(specimen) {
        const filteredSpecimen = FilterSpecimen(specimen);

        setSpecimen(filteredSpecimen);

        GetSpecimenDigitalMedia(filteredSpecimen['Meta']['id']['value'], (media) => ProcessMedia(media, filteredSpecimen));
    }

    function ProcessMedia(media, filteredSpecimen) {
        if (media) {
            const completeSpecimen = { ...filteredSpecimen };

            completeSpecimen['media'] = media;

            setSpecimen(completeSpecimen);
        }
    }

    function LoadSpecimenVersion(handle, version) {
        GetSpecimen(handle, ProcessSpecimen, version);
    }

    if (specimen) {
        return (
            <div className="d-flex flex-column min-vh-100 overflow-hidden">
                <Header />

                <Body specimen={specimen} LoadSpecimenVersion={(handle, version) => LoadSpecimenVersion(handle, version)} />

                <Footer page={"notHome"} />
            </div>
        );
    }
}

export default Specimen;