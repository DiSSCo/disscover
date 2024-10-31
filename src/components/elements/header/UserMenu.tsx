/* Import Dependencies */
import { useNavigate } from "react-router-dom";

/* Import Utilities */
import KeycloakService from "app/Keycloak";

/* Import Types */
import { DropdownItem } from "app/Types";

/* Import Components */
import { Dropdown } from "../customUI/CustomUI";


/**
 * Local component file for rendering the user menu in the header
 * @returns JSX Component
 */
const UserMenu = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const items: DropdownItem[] = [
        {
            label: 'Profile',
            value: 'profile',
            action: () => navigate('/profile')
        }, {
            label: 'Log-out',
            value: 'log-out',
            action: () => KeycloakService.Logout()
        }
    ];

    /* Create user tag */
    const userTag: string = `${KeycloakService.GetParsedToken()?.given_name?.[0]}. ${KeycloakService.GetParsedToken()?.family_name}`;

    return (
        <div>
            <Dropdown items={items}
                placeholder={userTag}
                styles={{
                    border: false
                }}
            />
        </div>
    );
};

export default UserMenu;