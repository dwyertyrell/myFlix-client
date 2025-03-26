import {Navbar, Container, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const NavigationBar = ({user, onLoggedOut}) => {
    /*changed the prop into a json object so the username property can be accessed, then converted
    by into a string so we can use it as a url parameter */

    const parsedUser = JSON.parse(user);
    const usernameOfUser = parsedUser.username;
    // const username = JSON.stringify(parsedUsername);
    


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

                                {!user ? (
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
                                    <Nav.Link as={Link} to={`/users/${encodeURIComponent(usernameOfUser)}`}>Profile</Nav.Link>
                                    {/* <Nav.Link as={Link} to={'/users/profile'}>Profile</Nav.Link> */}


                                    </>
                                )  
                                
                                
                                }             
                                </Nav> 

                            </Navbar.Collapse>
                 </Container>
            </Navbar>
    )
}