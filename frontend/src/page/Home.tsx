import React from 'react';
import HomeStyle from '../assets/style/Home.module.css';
import img1 from '../assets/images/crssl1.jpg';

function Home() {

    return (
       <div className={HomeStyle.container}>
        <div className={HomeStyle.carrousel}>
            <h1>*IMAGENES*</h1>
        </div>
       </div>
    );
}

export default Home;
