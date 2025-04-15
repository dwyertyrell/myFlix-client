


# myFlix Client Application

### Overview

This is the client-side application for myFlix, a web application that allows users to browse movies, view movie details, manage their profiles, and maintain a list of their favourite movies. This React-based **single page application** provides a responsive user-friendly interface (styled with **Bootstrap**)
 interacts with a separate backend **RESTful API** (Node.js/Express) to manage data and user authentication. 

---
#### click here, to view the application: [myFlix](https://voluble-elf-1a3488.netlify.app/)

---
### Features
**Movie Browsing:**

Displays a list of movies, fetched from the backend API.

Each movie is presented as a "MovieCard" with key details.

 **Movie Details:**

Provides a dedicated "MovieView" page accessible via a link from the "MovieCard".

Displays comprehensive information about a selected movie.

 **User Authentication:**

Login: Existing users can log in using their username and password.

Upon successful login, the application receives a JWT token from the backend, which is stored in local storage for subsequent authenticated requests.

Sign Up: New users can register by providing a username, password, email, and date of birth.

Logout: Users can log out, which clears their authentication token from local storage.

**User Profile:**

Users can access their profile page ("ProfileView").

Displays user information.

Allows users to update their information (username, password, email, date of birth).

**Favourite Movies:**

Users can add movies to their list of favourite.

Users can remove movies from their list of favourite.

The favourite movies list is persisted via the backend API.

**Search:**

Users can search for movies by title.

---
### Technical Details
**React:** The application is built using **React.js**.

**React Router:** Uses React Router for navigation between different views.

**React Bootstrap:** Uses React Bootstrap for styling and layout.

**Asynchronous Data Fetching:** Uses fetch to make API requests to the backend.

**Local Storage:** Stores the user's JWT token for maintaining authenticated sessions.

---
### Component Structure:

**MainView:** The main component that orchestrates the application, handling routing, state management, and rendering of different views.

**MovieCard:** Displays a single movie's information in a card format.

**MovieView:** Displays detailed information about a selected movie.

**LoginView:** Handles user login.

**SignupView:** Handles user registration.

**NavigationBar:**  Displays the navigation bar.

**ProfileView:** Displays and manages the user's profile.

**MovieSearch:** Handles the movie search functionality.

Interaction with Backend API
This client-side application relies on a separate backend API to provide the following functionalities:

````GET /movies````: Retrieves a list of all movies.

````GET /movies/:id```` : Retrieves a specific movie by ID.

````POST /users````: Registers a new user.

````POST /login````: Authenticates a user and returns a JWT token.

````GET /users/:username````: Retrieves a user's information.

````PUT /users/:username````: Updates a user's information.

````PUT /users/:username/:movieId````: Adds a movie to a user's list of favourite movies.

````DELETE /users/:username/:movieId````: Removes a movie from a user's list of favourite movies.

---


### Installation

1. **Clone the Repository**
   `git clone https://github.com/JasDevelops/DojoDB-client.git`

2. **Navigate to Project Folder**
   `cd DojoDB-client`

3. **Install Dependencies**
   With npm: `npm install`  
   With yarn: `yarn install`
4. **start the development server**
`parcel src/index.html`




Open the application in your browser: The application will be accessible at http://localhost:3000 (or the port specified in your environment).

---
### Prerequisites
Backend API: This application requires a running instance of the myFlix backend API.  Ensure that the API is set up and accessible before running the client.

Node.js and npm: Node.js and npm (Node Package Manager) are required to install dependencies and run the application.

---

### Important Considerations
API Endpoint: The application is configured to communicate with the backend API at https://secret-eyrie-53650-99dc45662f12.herokuapp.com/.  Ensure that this endpoint is correct and that the API is running at that location.

Error Handling: The application includes basic error handling for API requests (e.g., displaying error messages).  

Security: This application stores the JWT token in local storage.
