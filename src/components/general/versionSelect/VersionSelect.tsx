/* Import Dependencies */
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen, DigitalMedia } from 'app/Types';


/* Props Typing */
interface Props {
    target: DigitalSpecimen | DigitalMedia,
    versions: number[]
};


const VersionSelect = (props: Props) => {
    const { target, versions } = props;

    /* Hooks */
    const navigate = useNavigate();
    const location = useLocation();

    /* Construct Select options */
    const selectOptions: { value: number, label: string }[] = [];

    versions.forEach((version) => {
        selectOptions.push({
            value: version,
            label: `Version ${version}`
        })
    });

    /* Function for changing the Version */
    const ChangeVersion = (version: number) => {
        /* Check if version is not already selected */
        if (version !== target.version) {
            /* Construct new url */
            let path = location.pathname;
            let lastDash = path.lastIndexOf('/') + 1;

            if (Number(path.at(lastDash))) {
                path = path.slice(0, lastDash - 1);
            }

            path = path.concat(`/${version}`);

            navigate(path);
        }
    }

    return (
        <Row className="versionSelect">
            <Col>
                <Select
                    value={{ value: target.version, label: `Version ${target.version}` }}
                    options={selectOptions}
                    styles={{
                        control: provided => ({
                            ...provided, backgroundColor: '#A1D8CA', border: 'none', borderRadius: '999px',
                            fontWeight: '500', fontSize: '15px'
                        }),
                        menu: provided => ({ ...provided, zIndex: 100000, fontSize: '15px' }),
                        dropdownIndicator: provided => ({ ...provided, color: '#333333', fontSize: '15px' })
                    }}
                    onChange={(option) => { option?.value && ChangeVersion(option.value as number) }}
                />
            </Col>
        </Row>
    );
}

export default VersionSelect;