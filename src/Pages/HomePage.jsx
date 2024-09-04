import React from 'react';
import { Header, LearnersTake, Hero, Hot,Courses, Categories,Partners, Popular, Footer, Comments } from '../Components';

const HomePage = () => {
    return (
        <div className="m-0 p-0"> {/* Ensure no margin or padding on the container */}
            <Header /> {/* Ensure Header has no margin or padding */}
            <Hero />
            <Partners />
            <Courses />
            <Categories/>
            <Hot/>
            <LearnersTake />
            <Comments/>
            <Footer />
        
        </div>
    );
};

export default HomePage;
