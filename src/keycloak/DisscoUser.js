import { useLocation } from 'react-router-dom';


const DisscoUser = () => {
    const location = useLocation();
    let disscoUser;

    if (location.state) {
        if (location.state.disscoUser) {
            disscoUser = location.state.disscoUser;

            return disscoUser;
        } else {
            return false;
        }
    }
}

export default DisscoUser;