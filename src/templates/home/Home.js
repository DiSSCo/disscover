/* Import Components */
import Header from "../header/Header.js";
import Body from "./body/Body.js";
import Footer from "../footer/Footer.js";


const Home = () => {
    return (
        <div>
            <Header />

            <Body />

            <Footer home={'home'} />
        </div>
    );
}

export default Home;