import './annotate.css';

/* Import Components */
import Header from 'templates/header/Header';
import Body from './body/Body';
import Footer from 'templates/footer/Footer';


const Annotate = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Body />

            <Footer />
        </div>
    )
}

export default Annotate;