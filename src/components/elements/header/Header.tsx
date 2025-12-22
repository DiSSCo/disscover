/* Import Dependencies */
import KeycloakService from "app/Keycloak";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

/* Import Components */
import { Button, DropdownMenu } from "@radix-ui/themes";
import { ChevronDownIcon, ChevronUpIcon, Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";


export const Header = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { url: '/search', label: 'Specimens' },
        { url: '/virtual-collections', label: 'Virtual Collections' },
        ...(KeycloakService.IsLoggedIn() ? [{ url: '/data-export', label: 'Data Export' }] : []),
        { url: '/about', label: 'About' }
    ];

    return (
        <nav>
            <Link to="/">
                <span id="text-logo">DiSSCover</span>
            </Link>

            {/* Desktop navigation */}
            <ul className="desktop-nav">
                {navItems.map((item) => (
                    <li key={item.url}><Button variant="ghost" className="nav-buttons" onClick={() => navigate(item.url)}>{item.label}</Button></li>
                ))}
                {KeycloakService.IsLoggedIn() ?
                    <li>
                        <DropdownMenu.Root onOpenChange={(isOpen) => setIsOpen(isOpen)}>
                            <DropdownMenu.Trigger>
                                <Button variant="outline">
                                    MyDiSSCover
                                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content size="2">
                            <>
                                <DropdownMenu.Item>
                                    <Link to="/profile">Profile</Link>
                                </DropdownMenu.Item>
                                <Button className="login-btn" variant="outline" onClick={() => KeycloakService.Logout()}>Logout</Button>
                            </>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </li>
                : <li><Button variant="outline" onClick={() => KeycloakService.Login()}>Login / Sign-up</Button></li>
                }

            </ul>
            
            {/* Mobile navigation */}
            <div className="mobile-nav">
                <DropdownMenu.Root onOpenChange={(isOpen) => setIsOpen(isOpen)}>
                    <DropdownMenu.Trigger>
                        <Button variant="outline">
                            Menu
                            {isOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content size="2">
                        {navItems.map((item) => (
                            <DropdownMenu.Item key={item.url}>
                                <Link to={item.url}>{item.label}</Link>
                            </DropdownMenu.Item>
                        ))}
                        {KeycloakService.IsLoggedIn() ?
                            <>
                                <DropdownMenu.Item>
                                    <Link to="/profile">Profile</Link>
                                </DropdownMenu.Item>
                                <Button className="login-btn" variant="outline" onClick={() => KeycloakService.Logout()}>Logout</Button>
                            </>
                        : <Button className="login-btn" variant="outline" onClick={() => KeycloakService.Login()}>Login / Sign-up</Button>
                        }
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
        </nav>
    )
}