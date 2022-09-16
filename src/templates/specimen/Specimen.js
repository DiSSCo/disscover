import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import "./specimen.css";

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
            setSpecimen(location.state.specimen);
        } else if (params['prefix'] && params['suffix']) {
            GetSpecimen(`${params['prefix']}/${params['suffix']}`, Process);
        }

        function Process(result) {
            const filteredSpecimen = FilterSpecimen(result);

            setSpecimen(filteredSpecimen);

            GetSpecimenDigitalMedia(filteredSpecimen['Meta']['id']['value'], ProcessFurther);

            function ProcessFurther(media) {
                if (media) {
                    const completeSpecimen = { ...filteredSpecimen };

                    completeSpecimen['media'] = media;

                    setSpecimen(completeSpecimen);
                }
            }
        }
    }, []);

    function LoadSpecimenVersion(handle, version) {
        GetSpecimen(handle, Process, version);

        function Process(result) {
            const filteredSpecimen = FilterSpecimen(result);

            setSpecimen(filteredSpecimen);

            GetSpecimenDigitalMedia(filteredSpecimen['Meta']['id']['value'], ProcessFurther);

            function ProcessFurther(media) {
                const completeSpecimen = { ...filteredSpecimen };

                completeSpecimen['media'] = media;

                setSpecimen(completeSpecimen);
            }
        }
    }

    if (specimen) {
        return (
            <div className="d-flex flex-column min-vh-100 overflow-hidden">
                <Header />

                <Body specimen={specimen} LoadSpecimenVersion={(handle, version) => LoadSpecimenVersion(handle, version)} />

                <Footer />
            </div>
        );
    }
}

export default Specimen;