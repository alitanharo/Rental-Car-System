
import { Navbar, Nav } from 'react-bootstrap';
import Logout from '../components/user/Logout';
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

const NavBar = () => {
    const { user } = useContext(UserContext) || {};
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/"><i>Rental Car System</i></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/pickup">Pick Up </Nav.Link>
                    <Nav.Link href="/return">Return</Nav.Link>
                    <Nav.Link href="/signIn"> Sign In</Nav.Link>
                    {user &&
                        <span> <Logout /> </span>
                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
