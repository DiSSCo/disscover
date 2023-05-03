/* Import Dependencies */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSpecimen, getSpecimenVersion, setSpecimenVersion } from 'redux/specimen/SpecimenSlice';

/* Import API */
import GetSpecimenVersions from 'api/specimen/GetSpecimenVersions';


const VersionSelect = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen)
    const version = useAppSelector(getSpecimenVersion);
    const [versions, setVersions] = useState<number[]>([]);

    /* OnLoad: Fetch Specimen versions */
    useEffect(() => {
        GetSpecimenVersions(specimen.id).then((versions) => {
            if (versions) {
                versions.sort((a, b) => (a - b));

                setVersions(versions);
            }
        });
    }, [specimen]);

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
                <Select 
                    value={{ value: version, label: `Version ${version}` }}
                    options={selectOptions}
                    styles={{ control: provided => ({ ...provided, backgroundColor: '#A1D8CA', border: 'none', borderRadius: '999px', fontWeight: '500'}),
                        menu: provided => ({ ...provided, zIndex: 100000 }),
                        dropdownIndicator: provided => ({ ...provided, color: '#333333'})
                    }}
                    onChange={(option) => { option?.value && dispatch(setSpecimenVersion(option.value)) }}
                />
            </Col>
        </Row>
    );
}

export default VersionSelect;