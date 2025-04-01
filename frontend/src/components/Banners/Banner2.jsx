import React from 'react';
import { motion } from "framer-motion";
import { FadeUp } from '../../utility/animation';
import plate from '../../assets/salad.png'; // Fixed import syntax

const Banner2 = () => {
  return (
    <section 
      className="py-10 px-4 sm:px-6 overflow-hidden"
      aria-labelledby="brand-info-heading"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 md:py-24">
        
        {/* Content Section - Now appears first (left) */}
        <div className="bg-green-50 py-8 md:py-12 px-6 md:px-10 lg:px-16 rounded-lg md:rounded-r-none md:rounded-l-lg md:mr-0 lg:mr-10 mr-0">
          <div className="flex flex-col justify-center h-full">
            <div className="space-y-4 md:space-y-6 max-w-md mx-auto md:mx-0">
              <motion.h1
                variants={FadeUp(0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px" }} // Added margin
                className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-gray-800"
                id="brand-info-heading"
              >
                Online Vegetable Store
              </motion.h1>
              
              <motion.p
                variants={FadeUp(0.5)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="text-gray-600 leading-relaxed text-sm sm:text-base"
              >
                 Download now and enjoy farm-fresh goodness with just a tap!
              </motion.p>
              
              <motion.div
                variants={FadeUp(0.7)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="flex justify-center md:justify-start"
              >
                <button 
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 w-full md:w-auto"
                  aria-label="Learn more about GreenGrove"
                >
                  Download The App
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Image Section - Now appears second (right) */}
        <div className='flex justify-center md:justify-start md:pl-10'> {/* Adjusted padding */}
          <motion.img 
            initial={{ opacity: 0, x: -200, rotate: -75 }} // Adjusted direction
            whileInView={{ 
              opacity: 1, 
              x: 0, 
              rotate: 0,
              transition: { 
                type: "spring",
                damping: 15,
                stiffness: 100,
                delay: 0.2
              }
            }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }} // Safer margin
            src={plate}
            alt="Fresh vegetables plate"
            className="w-[300px] md:w-[420px] lg:w-[480px] h-auto object-contain drop-shadow" // Changed to contain
            loading="lazy"
            onError={(e) => e.target.src = 'https://via.placeholder.com/500x500'} // Fallback
          />
        </div>

      </div>
    </section>
  );
};

export default Banner2;
