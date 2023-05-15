/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import API */
import GetSpecimenVersions from 'api/specimen/GetSpecimenVersions';


const VersionSelect = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const [versions, setVersions] = useState<number[]>([]);

    /* OnLoad: Fetch Specimen versions */
    useEffect(() => {
        GetSpecimenVersions(specimen.id.replace('https://hdl.handle.net/', '')).then((versions) => {
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
                    value={{ value: specimen.version, label: `Version ${specimen.version}` }}
                    options={selectOptions}
                    styles={{
                        control: provided => ({
                            ...provided, backgroundColor: '#A1D8CA', border: 'none', borderRadius: '999px',
                            fontWeight: '500', fontSize: '15px'
                        }),
                        menu: provided => ({ ...provided, zIndex: 100000, fontSize: '15px' }),
                        dropdownIndicator: provided => ({ ...provided, color: '#333333', fontSize: '15px' })
                    }}
                    onChange={(option) => { option?.value && navigate(`/ds/${specimen.id.replace('https://hdl.handle.net/', '')}/${option.value}`)}}
                />
            </Col>
        </Row>
    );
}

export default VersionSelect;