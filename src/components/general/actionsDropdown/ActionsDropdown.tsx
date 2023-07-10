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
            value={value ? value : { value: 'Actions', label: 'Actions' }}
            options={actions}
            className="text-white"
            isSearchable={false}
            styles={{
                control: provided => ({
                    ...provided, backgroundColor: backgroundColor ? backgroundColor : '#4d59a2', border: '1px solid #4d59a2',
                    borderRadius: '999px', fontWeight: '500', fontSize: '15px'
                }),
                menu: provided => ({
                    ...provided, zIndex: 100000, fontSize: '15px', width: 'max-content',
                    position: 'absolute', right: '0', color: '#333333'
                }),
                dropdownIndicator: provided => ({ ...provided, color: color ? color : 'white', fontSize: '15px' }),
                singleValue: provided => ({
                    ...provided, color: color ? color : 'white'
                })
            }}
            onChange={(option) => { option?.value && Actions(option.value) }}
        />
    );
}

export default ActionsDropdown;