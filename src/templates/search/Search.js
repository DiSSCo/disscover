/* Import Components */
import Header from "../header/Header";
import Body from "./body/Body";
import Footer from "../footer/Footer";

const Search = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Body />

            <Footer />
        </div>
    );
}

export default Search;