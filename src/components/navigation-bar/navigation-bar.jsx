import {Navbar, Container, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const NavigationBar = ({users, onLoggedOut}) => {

    return (
            <Navbar bg= 'light' expand='large'>
                <Container>
                        <Navbar.Brand as = {Link} to= '/'>
                            Myflix
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        {/* aria-controls links the toggle button to the collaspe 
                        component*/}
                        <Navbar.Collapse id= 'basic-navbar-nav'> 
                            <Nav className='me-auto'>

                                {!users ? (
                                    <>
                                    <Nav.Link as={Link} to='/login'>login</Nav.Link>
                                    <Nav.Link as={Link} to='/signup'>signup</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                    <Nav.Link as={Link} to='/'>Home</Nav.Link>
                                    <Nav.Link as={Link} to='/login' onClick={onLoggedOut}>
                                    logout 
                                    </Nav.Link>
                                    <Nav.Link as={Link} to={`/users/${encodeURIComponent(users.username)}`}>Profile</Nav.Link>

                                    
                                    </>
                                )  
                                
                                
                                }             
                                </Nav> 

                            </Navbar.Collapse>
                 </Container>
            </Navbar>
    )
}