import {Navbar, Container, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export const NavigationBar = ({user, onLoggedOut}) => {

// user prop was parsed while adding {user} as a piece of state in MainView

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
                                    <Nav.Link as={Link} to={`/users/${encodeURIComponent(user.username)}`}>Profile</Nav.Link>
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

NavigationBar.propTypes = {
user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }),    
    onLoggedOut: PropTypes.func.isRequired,
  };