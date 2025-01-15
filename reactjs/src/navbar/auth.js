import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes, Route, Link } from 'react-router-dom';

import AuthUser from '../components/AuthUser';

function Auth() {
    const { token, logout } = AuthUser();

    const logoutUser = () => {
        if (token !== undefined) {
            logout();
        }
    };

    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        Navbar
                    </Navbar.Brand>
                    <Nav className="me-auto">
                       
                        <Nav.Link as={Link} to="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/products">
                            Products
                        </Nav.Link>
                        <Nav.Link onClick={logoutUser}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export default Auth;
