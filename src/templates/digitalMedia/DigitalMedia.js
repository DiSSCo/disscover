import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './digitalMedia.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Body from './body/Body';
import Footer from 'templates/footer/Footer';

/* Import API */
import GetDigitalMedia from 'api/digitalMedia/getDigitalMedia';
import FilterDigitalMedia from 'api/digitalMedia/FilterDigitalMedia';


const DigitalMedia = () => {
    const params = useParams();

    const [digitalMediaItem, setDigitalMediaItem] = useState();

    useEffect(() => {
        const handle = `${params['prefix']}/${params['suffix']}`;

        GetDigitalMedia(handle, Process);

        function Process(result) {
            const filteredDigitalMediaItem = FilterDigitalMedia(result);
            
            setDigitalMediaItem(filteredDigitalMediaItem);
        }
    }, [params]);

    if (digitalMediaItem) {
        return (
            <div className="h-100">
                <Header />

                <Body digitalMediaItem={digitalMediaItem} />

                <Footer page={'notHome'} />
            </div>
        );
    }
}

export default DigitalMedia;