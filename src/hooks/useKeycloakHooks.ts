import { useState, useEffect, useSyncExternalStore } from 'react';
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

/**
 * Hook that gives us back Keycloak feedback on any changes
 * @returns A boolean that indicates whether a user is logged in or not
 */
export const useIsLoggedIn = (): boolean => {
    return useSyncExternalStore(
        KeycloakService.Subscribe,
        KeycloakService.IsLoggedIn
    );
};