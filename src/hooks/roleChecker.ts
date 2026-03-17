import { useState, useEffect } from 'react';
import KeycloakService from "app/Keycloak";

/**
 * Hook that gives us back either true or false when they have a role or not
 * @param role String with role of the user
 * @returns A boolean that indicates if a user has a specific role or not
 */
export const useHasRole = (role: string) => {
    const [hasRole, setHasRole] = useState(false);

    useEffect(() => {
        const check = KeycloakService.HasRole([role]);
        setHasRole(check);
    }, [role]);

    return hasRole;
};