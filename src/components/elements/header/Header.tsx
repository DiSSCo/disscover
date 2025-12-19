import { Button, DropdownMenu, Text } from "@radix-ui/themes";
import KeycloakService from "app/Keycloak";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const navItems = [
        {
            url: '/search',
            label: 'Specimens'
        },
        {
            url: '/virtual-collections',
            label: 'Virtual Collections'
        },
        {
            url: '/data-export',
            label: 'Data Export'
        },
        {
            url: '/about',
            label: 'About'
        }
    ]

    const handleNavigation = (item: { url: string, label: string }) => {
        navigate(item.url);
    }

    return (
        <nav>
            <Link to="/">
                <Text as="p" weight="bold" size="8" color="indigo">DiSSCover</Text>
            </Link>
            <ul>
                {navItems.map((item) => (
                    <li key={item.url}><Button variant="ghost" onClick={() => handleNavigation(item)}>{item.label}</Button></li>
                ))}
                {KeycloakService.IsLoggedIn() ?
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="outline">
                                MyDiSSCover
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>
                                <Link to="/profile">Profile</Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                            <Button variant="ghost" onClick={() => KeycloakService.Logout()}>Log-out</Button>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                : <Button variant="outline" onClick={() => KeycloakService.Login()}>Login / Sign-up</Button>
                }
                
            </ul>
        </nav>
    )
}