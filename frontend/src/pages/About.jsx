import React from 'react';
import Banner from '../components/Banners/Banner';

const About = () => {
  return (
    <div className="pt-20"> {/* Padding for fixed navbar */}
      <Banner />            {/* Your existing Banner component */}
    </div>
  );
};

export default About;