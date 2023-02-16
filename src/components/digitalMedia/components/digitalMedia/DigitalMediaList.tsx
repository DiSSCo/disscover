/* Import Dependencies */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Types */
import { DigitalMedia } from 'global/Types';

/* Import Components */
import DigitalMediaListItem from './DigitalMediaListItem';

/* Import API */
import GetSpecimenDigitalMedia from 'api/specimen/GetSpecimenDigitalMedia';


const DigitalMediaList = () => {
    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const [specimenDigitalMedia, setSpecimenDigitalMedia] = useState<DigitalMedia[]>([]);

    /* Search and fetch all other Digital Media items from target specimen */
    useEffect(() => {
        GetSpecimenDigitalMedia(digitalMedia.digitalSpecimenId).then((specimenDigitalMedia) => {
            if (specimenDigitalMedia) {
                setSpecimenDigitalMedia(specimenDigitalMedia);
            }
        });
    }, [digitalMedia]);

    /* View will be set by an Array containing Components */
    const digitalMediaItems: React.ReactElement[] = [];

    if (specimenDigitalMedia) {
        specimenDigitalMedia.forEach((specimenDigitalMedia) => {
            /* ClassName for Digital Media List Item */
            const classDigitalMediaListItem = classNames({
                'border border-white': true,
                'position-relative': (digitalMedia.id === specimenDigitalMedia.id)
            });

            digitalMediaItems.push(
                <Row key={specimenDigitalMedia.id}>
                    <Col className={classDigitalMediaListItem}>
                        <DigitalMediaListItem specimenDigitalMedia={specimenDigitalMedia} />

                        {(digitalMedia.id === specimenDigitalMedia.id) &&
                            <div className="position-absolute bg-dark w-100 h-100 start-0 top-0 opacity-50" />
                        }
                    </Col>
                </Row>
            );
        });
    }

    return (
        <> {digitalMediaItems} </>
    );
}

export default DigitalMediaList;