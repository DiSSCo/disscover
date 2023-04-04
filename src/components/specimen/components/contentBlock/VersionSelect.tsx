/* Import Dependencies */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSpecimen, setSpecimenVersion } from 'redux/specimen/SpecimenSlice';

/* Import API */
import GetSpecimenVersions from 'api/specimen/GetSpecimenVersions';


const VersionSelect = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const [versions, setVersions] = useState<number[]>([]);

    /* OnLoad: Fetch Specimen versions */
    useEffect(() => {
        GetSpecimenVersions(specimen.id).then((versions) => {
            if (versions) {
                versions.sort((a, b) => (a - b));

                setVersions(versions);
            }
        });
    }, []);

    /* Construct Select options */
    const selectOptions: { value: number, label: string }[] = [];

    versions.forEach((version) => {
        selectOptions.push({
            value: version,
            label: `Version ${version}`
        })
    });

    return (
        <Row>
            <Col>
                <Select defaultValue={{ value: specimen.version, label: `Version ${specimen.version}` }}
                    options={selectOptions}
                    onChange={(option) => { option?.value && dispatch(setSpecimenVersion(option.value)) }}
                />
            </Col>
        </Row>
    );
}

export default VersionSelect;