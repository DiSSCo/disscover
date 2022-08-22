import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import "./specimen.css";

/* Import Components */
import Header from '../header/Header';
import Body from './body/Body';
import Footer from '../footer/Footer';

/* Import API */
import GetSpecimen from '../../api/specimen/GetSpecimen';


const Specimen = () => {
    const location = useLocation();
    const params = useParams();

    const [specimen, setSpecimen] = useState();

    useEffect(() => {
        if (location.state) {
            setSpecimen(location.state.data);
        } else if (params['id']) {
            const specimenId = params['id'];

            GetSpecimen(specimenId, Process);

            function Process(result) {
                setSpecimen(result);
            }
        }
    }, []);

    if (specimen) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />

                <Body specimen={specimen} />

                <Footer />
            </div>
        );
    }
}

export default Specimen;