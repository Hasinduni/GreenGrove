import React from 'react';
import Hero from '../components/Hero/Hero';
import Menus from '../components/Menus/Menus';
import Banner from '../components/Banners/Banner';
import Banner2 from '../components/Banners/Banner2';
import Banner3 from '../components/Banners/Banner3';
import Footer from '../components/Footer/Footer';


const Home = () => {
  return (
    <>
      <Hero /> 
            {/* Your existing Hero component */}
      <Menus />
      <Banner />
      <Banner2 />
      <Banner3 />
   
    </>
  );
};

export default Home;