import React from 'react';
import { motion } from "framer-motion";
import { FadeLeft } from '../../utility/animation';
import Bannerpng from '../../assets/vege.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Banner3 = () => {
  const bgStyle = {
    backgroundImage: `url(${Bannerpng})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  return (
    <section 
      className="py-10 px-4 sm:px-6"
      aria-labelledby="brand-info-heading"
    >
      <div 
        style={bgStyle}
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 md:py-14 rounded-3xl min-h-[500px]"
      >
        {/* Content Section */}
        <div className="bg-green-50/90 py-8 md:py-12 px-6 md:px-10 lg:px-16 rounded-lg md:rounded-l-none md:rounded-r-lg md:ml-0 lg:ml-10 ml-0 backdrop-blur-sm">
          <div className="flex flex-col justify-center h-full">
            <div className="space-y-4 md:space-y-6 max-w-md mx-auto md:mx-0">
              <motion.h1
                variants={FadeLeft(0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-gray-800"
                id="brand-info-heading"
              >
                Fresh & Organic
              </motion.h1>
              
              <motion.p
                variants={FadeLeft(0.5)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="text-gray-600 leading-relaxed text-sm sm:text-base"
              >
               At GreenGrove, we are dedicated to providing farm-fresh, organic produce straight from our fields to your table. Grown with care and free from harmful chemicals, 
               our products ensure a healthy lifestyle while supporting sustainable farming.
                Experience the true taste of nature with GreenGrove! 🌿🚜
              </motion.p>
              
              <motion.div
                variants={FadeLeft(0.7)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="flex justify-center md:justify-start"
              >
                <Link 
                  to="/gallery" // This links to your gallery route
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 w-full md:w-auto text-center block"
                  aria-label="View our farming gallery"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner3;