/* Props Typing */
interface Props {
    viewToggle: string,
    SetViewToggle: Function
}


const ToggleButton = (props: Props) => {
    const { viewToggle, SetViewToggle } = props;

    return (
        <button className="position-absolute end-0 accentButton px-3 py-1 z-1 m-3"
            onClick={() => {
                if (viewToggle === 'graph') {
                    SetViewToggle('table');
                } else {
                    SetViewToggle('graph');
                }
            }}
        >
            {(viewToggle === 'graph') ? 'Table view' : 'Graph view'}
        </button>
    );
}

export default ToggleButton;