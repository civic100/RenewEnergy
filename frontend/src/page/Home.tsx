import React from 'react';
import HomeStyle from '../assets/style/Home/Home.module.css'
import SectionHome1 from '../Components/user/Home/SectionHome1';
import SectionHome2 from '../Components/user/Home/SectionHome2';


function Home() {

    return (
       <div className={HomeStyle.container}>

        <div className={HomeStyle.section1}>
            <SectionHome1 />
        </div>

        <div className={HomeStyle.section2}>
            <SectionHome2 />
        </div>
        
       </div>
    );
}

export default Home;
