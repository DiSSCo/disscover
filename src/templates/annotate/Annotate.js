import './annotate.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Body from './body/Body';
import Footer from 'templates/footer/Footer';


const Annotate = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Body />

            <Footer page={"notHome"} />
        </div>
    )
}

export default Annotate;