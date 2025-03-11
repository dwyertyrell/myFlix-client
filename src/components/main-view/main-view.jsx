import {useState, useEffect} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import {LoginView} from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row"; 
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


export const MainView = () => {
  
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token')
  const [users, setUsers] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null );
  

  useEffect(() => {
    if(!token) {
      return; 
    }

    fetch('https://secret-eyrie-53650-99dc45662f12.herokuapp.com/movies',
      {
        headers: {Authorization: `Bearer ${token}`}
      }).then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map(movie => {
          return {
            id: movie._id,
            image: movie.image,
            title: movie.title,
            director: movie.director.name || movie.director.bio,
            genre: movie.genre.title,
            description: movie.description
          };
        });
          setMovies(moviesFromApi)
      }).catch((e) => {
            console.error('something wrong happened while fetching movie data')
          });

  }, [token]);

    const handleLogIn = (user, token) => {
      setUsers(user);
      setToken(token);      
    }
  
    return (
        <Row className='justify-content-md-center'>
          
          {!users ? (
            
            <Col md={4} style={{border:' 2px solid green'}}>
              <LoginView onLoggedIn={handleLogIn} /> 
              <SignupView />
            </Col>
            
          ) : selectedMovie ? (
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          ) : movies.length === 0 ? (
            <div>the list is empty</div>
          ) : (
            <>
            <Button
                variant='secondary'
                className=' w-100 '
                onClick={() => {
                  setUsers(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                log out
              </Button>
              {movies.map((movie) => (
                <Col md={3}  key={movie.id} className='mb-5'>
                {/*key attribute need to be added to the grid system's container 
                element of the component being rendered */}
                <MovieCard 
                 
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
                </Col>
              ))}
              
            </>
          )}
        </Row>
    );
  }

/* React Bootstrap Grid System:
this frid system on React Bootstrap uses flexbox. 
the three main React Bootstrap components being used here are:

<Container></Container>: used usually to cover the whole width of the screen.
<Row></Row>: controls the vertical layout inside the <Container> component.
<col></Col>: controls the horizontal layout with <Row> component. 
            A <Col></Col> is where the actual UI resides
            

Bootstrap follows an invisible grid where each row can have up to 12 individual 
columns lined up across (left to right).
can put anything in these: text, components, jsx, etx... 

import the <Comtainer> Bootstrap component into index.jsx file-
we want the entire <MainView> component to be wrapped in a <Container> of the 
root component in index.jsx.

UI needs to be wrapped within the Col, in order to have these Cols
you must have Rows. and in order to have rows you need to have a Container.

---the <Container> itself has it's own predefined styling. so adding this into the 
app without Rows or Cols, will still change the styling of the app.

useful to temporaily add a boder styling to the <Container> to see its movement
during development.





adding Rows:
MainView currently has a few if statements. 
these if-statement syntax cannot be added in the return statement of 
the final rendering. 
So we can either: wrap every piece of jsx with a row element, or chain each one 
in a large ternary statement in the final return statement .

in Conclusion we do this with a ternary operator if it's an if-else statement.
Or a Logical AND operator if it's just an if-statement.

before:

  if(!users) { 
    
   return (
    <>
   <LoginView onLoggedIn= {handleLogIn}/>
   or
    <SignupView/>
    </>
  )
  }

  if(selectedMovie) {
    return <MovieView 
    movie={selectedMovie}
    //setting the setSelectedMovie to null, removes the currently selected Movie,
     //for the user to use the function again for a different movie 
     onBackClick={()=> setSelectedMovie(null)}
     />
   }
 
     if (movies.length === 0) {
         return <div>the list is empty</div>
     } 
     
       return (
         <Container className= 'container'>
           <button onClick={()=> {
             setUsers(null);
             setToken(null);
             localStorage.clear();
             }} >log out</button>
           
           {movies.map((movie) => {
             return <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie)=> {
               setSelectedMovie(newSelectedMovie);
              }}
              />
 
           })}
         </Container> 
       )}


after:

     return (
      <Container>
        <Row className='justify-content-md-center'>
          
          {!users ? (
            
            <Col md={4} style={{border:' 2px solid green'}}>
              <LoginView onLoggedIn={handleLogIn} /> 
              <SignupView />
            </Col>
            
          ) : selectedMovie ? (
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          ) : movies.length === 0 ? (
            <div>the list is empty</div>
          ) : (
            <>
            <button
                onClick={() => {
                  setUsers(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                log out
              </button>
              {movies.map((movie) => (
                <Col md={3}  key={movie.id} className='mb-5'>
                // key attribute need to be added to the grid system's container 
                // element of the component being rendered 
                <MovieCard 
                 
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
                </Col>
              ))}
              
            </>
          )}
        </Row>
      </Container>
    );
  }

everything is being conditionally rendered using ternary statements

now, since the if-statements are removed, and their logic are elsewhere, the 
MainView component now only has one return statement that has a Row as the root  
element.

 






adding a Col Bootstrap Component:

UI content goes inside <Col> when using grid in Bootstrap.
since <MainView> is the content, it needs to be enclosed in <Col>.

(need to make sure Col is import the module)

to specify how many twelfths of the <Rol> a <Col> can occupy, use the attribute md:
 {movies.map((movie) => (
                <Col md={6}>
                <MovieCard 
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
                </Col>


the 8 md breakpoint is used. if the screen is less than 768px, each column will 
take full width no matter how many shares (twelfths) it's been assigned.

to centre the columns within a row using Bootstrap utility classes:
use the className='justify-content-md-center'. to see the centering, style the
border of the <Col> 


id attribute is far more accurate to target styling on a react component. 
        because the className value are used for React bootstrap's predefined 
        stylings.

when placing the UI in <Col>, sometimes this container has to be styled to get 
the styling to the UI (the component being rendered). 
{movies.map((movie) => (
  <Col md={3}  key={movie.id} className=''>
  // key attribute need to be added to the grid system's container 
  // element of the component being rendered 
  <MovieCard 
    
    movie={movie}
    onMovieClick={(newSelectedMovie) => {
      setSelectedMovie(newSelectedMovie);
    }}
  />
  </Col>

the MovieCard components look bunched together. use the className value 'mb-x' to
apply 'margin-bottom' (mb) and x is any given number representing the size of the
space.

also apply classNmae='w-100' to the <img/> element in MovieView for styling
width of 100%

"A good rule of thumb when using an external framework to style your app is to 
avoid writing custom CSS wherever possible. For instance, rather than writing 
SCSS to define your layout, try to find an existing component to position your 
elements."










Customizing React Bootstrap:

customizing colors, sizes and other behaviours for your component is easy since 
Bootstrap has built in scss variables.

to enable customisation, need to change the way we import Bootstrap.

 before, we are importing via bootstrap/dist/css/bootstrap.min.css

 this is a production ready file which doesn't support customisation. 
 this file is directly being imported into index.jsx 
 (this import is in MovieView instead of MainView or index.scss. mistake?). 
 instead, import the Sass file into index.scss:
 
 @import '~bootstrap/scss/bootstrap.scss';

 let's say you want to change the built-in variables 'primary' and 'body-bg' 
 colors. add the following to index.scss before the @import statement, 
 and then remove import "bootstrap/dist/css/bootstrap.min.css" from index.jsx :

 $primary: SeaGreen;
$body-bg: Honeydew;

@import '~bootstrap/scss/bootstrap.scss';



*/