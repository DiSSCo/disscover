/* Import Dependencies */
import Select from 'react-select';


/* Props typing */
interface Props {
    value?: { value: string, label: string },
    actions: { value: string, label: string }[],
    Actions: Function,
    color?: string,
    backgroundColor?: string
};


const ActionsDropdown = (props: Props) => {
    const { value, actions, Actions, backgroundColor, color } = props;

    return (
        <Select
            value={value ?? { value: 'Actions', label: 'Actions' }}
            options={actions}
            className="text-white"
            isSearchable={false}
            styles={{
                control: provided => ({
                    ...provided, backgroundColor: backgroundColor ?? '#4d59a2', border: '1px solid #4d59a2', minHeight: 'auto',
                    borderRadius: '999px', fontWeight: '500', fontSize: '0.875rem', paddingLeft: '0.5rem', paddingRight: '0.5rem', paddingTop: '0.25rem', paddingBottom: '0.25rem'
                }),
                menu: provided => ({
                    ...provided, zIndex: 100000, fontSize: '0.875rem', width: 'max-content',
                    position: 'absolute', right: '0', color: '#333333'
                }),
                dropdownIndicator: provided => ({ ...provided, color: color ?? 'white', fontSize: '0.875rem' }),
                singleValue: provided => ({
                    ...provided, color: color ?? 'white'
                }),
                valueContainer: provided => ({ ...provided, padding: '0px' }),
                clearIndicator: provided => ({ ...provided, padding: '0px' }),
                indicatorsContainer: provided => ({ ...provided, height: '1.5rem' }),
                input: provided => ({ ...provided, margin: '0px' }),
                indicatorSeparator: provided => ({ ...provided, display: 'none' })
            }}
            onChange={(option) => { option?.value && Actions(option.value) }}
        />
    );
}

export default ActionsDropdown;