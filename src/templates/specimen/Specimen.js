import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Import Components */
import Header from '../header/Header';
import Body from './body/Body.js';
import Footer from '../footer/Footer';

const Specimen = () => {
    let location = useLocation();

    const [specimen, setSpecimen] = useState();

    useEffect(() => {
        if (location.state) {
            setSpecimen(location.state.data);
        }
    }, []);
 
    if (specimen) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />

                <Body specimen={specimen}/>
            
                <Footer />
            </div>
        );
    }
}

export default Specimen;