/* Import Dependencies */
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Specimen, DigitalMedia } from 'global/Types';


/* Props Typing */
interface Props {
    target: Specimen | DigitalMedia,
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
        /* Construct new url */
        let path = location.pathname;

        if (Number(path.at(-1)) && path.at(-2) === '/') {
            path = path.slice(0, -2);
        }

        path = path.concat(`/${version}`);

        navigate(path);
    }

    return (
        <Row>
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
                    onChange={(option) => { option?.value && ChangeVersion(option.value) }}
                />
            </Col>
        </Row>
    );
}

export default VersionSelect;