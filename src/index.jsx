import {createRoot} from 'react-dom/client';
import {MainView} from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container'
// import "bootstrap/dist/css/bootstrap.min.css";

import './index.scss';

const MyFlixApplication = () => {
    return (

    <Container >
        <MainView/>;
    </Container>
    
)
};

const container =document.querySelector('#root');
const root = createRoot(container);

root.render(<MyFlixApplication/>);

/* why wrap the app in a Container?
Bootstrap content (UI) is organized within Columns (Col). in order to have these
Columns, we need to have Rows. In order to have Rows, we need to have a Container.
instead of using the <Container> in the return statement of the <MaiView>, we can
wrap the entire component inside a Container, in the root jsx  */

/*to add our own customised react bootstrap into our app, import index.scss and 
remove import "bootstrap/dist/css/bootstrap.min.css";

 */