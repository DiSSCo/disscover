/* Import Dependencies */
import KeycloakService from "app/Keycloak";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

/* Import Components */
import { Button, DropdownMenu, Popover } from "@radix-ui/themes";
import { ChevronDownIcon, ChevronUpIcon, Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

/* Import Styles */
import './Header.scss';


export const Header = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const navItems = [
        { url: '/search', label: 'Specimens' },
        { url: '/virtual-collections', label: 'Virtual Collections' },
        ...(KeycloakService.IsLoggedIn() ? [{ url: '/data-export', label: 'Data Export' }] : []),
        { url: '/about', label: 'About' }
    ];

    /* Reusable dropdown content for the MyDiSSCover functionality */
    const loggedInDropdownContent = () => {
        return (
            <DropdownMenu.Root onOpenChange={(dropDownOpen) => setDropDownOpen(dropDownOpen)}>
                <DropdownMenu.Trigger>
                    <Button variant="outline">
                        MyDiSSCover
                        {dropDownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="2">
                <>
                    <DropdownMenu.Item>
                        <Link to="/profile">Profile</Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                        <button className="login-btn" onClick={() => KeycloakService.Logout()}>Logout</button>
                    </DropdownMenu.Item>
                </>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        )
    }

    return (
        <nav>
            <Link to="/">
                <span id="text-logo-disscover">DiSSCover</span>
            </Link>

            {/* Desktop navigation */}
            <ul className="desktop-nav">
                {navItems.map((item) => (
                    <li key={item.url}><Button variant="ghost" className="nav-buttons" onClick={() => navigate(item.url)}>{item.label}</Button></li>
                ))}
                {KeycloakService.IsLoggedIn() ?
                    <li>
                        {loggedInDropdownContent()}
                    </li>
                : <li><Button variant="outline" onClick={() => KeycloakService.Login()}>Login / Sign-up</Button></li>
                }

            </ul>
            
            {/* Mobile navigation */}
            <div className="mobile-nav">
                <Popover.Root onOpenChange={(popoverOpen) => setPopoverOpen(popoverOpen)}>
                    <Popover.Trigger>
                        <Button variant="outline">
                            Menu
                            {popoverOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <ul className="mobile-nav-items">
                            {navItems.map((item) => (
                                <li key={item.url}><Button variant="ghost" onClick={() => navigate(item.url)}>{item.label}</Button></li>
                            ))}
                        </ul>

                        {KeycloakService.IsLoggedIn() ?
                            loggedInDropdownContent()
                            : <Button variant="outline" onClick={() => KeycloakService.Login()}>Login / Sign-up</Button>
                            }

                    </Popover.Content>
                </Popover.Root>
            </div>
        </nav>
    )
}