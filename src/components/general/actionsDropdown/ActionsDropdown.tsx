/* Import Dependencies */
import Select from 'react-select';


/* Props typing */
interface Props {
    actions: { value: string, label: string }[],
    Actions: Function
};


const ActionsDropdown = (props: Props) => {
    const { actions, Actions } = props;

    return (
        <Select
            value={{ value: 'Actions', label: 'Actions' }}
            options={actions}
            className="text-white"
            isSearchable={false}
            styles={{
                control: provided => ({
                    ...provided, backgroundColor: '#4d59a2', border: 'none',
                    borderRadius: '999px', fontWeight: '500', fontSize: '15px'
                }),
                menu: provided => ({
                    ...provided, zIndex: 100000, fontSize: '15px', width: 'max-content',
                    position: 'absolute', right: '0', color: '#333333'
                }),
                dropdownIndicator: provided => ({ ...provided, color: 'white', fontSize: '15px' }),
                singleValue: provided => ({
                    ...provided, color: 'white'
                })
            }}
            onChange={(option) => { option?.value && Actions(option.value) }}
        />
    );
}

export default ActionsDropdown;