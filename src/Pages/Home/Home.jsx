import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import StudySessionSection from "./StudySession/StudySessionSection";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | ThinkSync</title>
            </Helmet>
            <Banner></Banner>
            <StudySessionSection></StudySessionSection>
        </div>
    );
};

export default Home;