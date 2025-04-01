import React from 'react';
import { motion } from "framer-motion";
import { FadeUp } from '../../utility/animation';
import BannerPng from '../../assets/Banner.png';

const Banner = () => {
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
      
        {/* Banner Image - Centered with right margin */}
        <motion.div 
          className="flex justify-center md:justify-center mr-10" 
          initial={{ opacity: 0, scale: 1.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img 
            src={BannerPng} 
            alt="Fresh vegetables from GreenGrove" 
            className="w-[300px] md:w-[480px] lg:w-[420px] h-auto object-cover transition-transform hover:scale-105" 
          />
        </motion.div>

        {/* Brand Info Section with left margin */}
        <div className="bg-green-50 py-8 md:py-12 px-6 md:px-10 lg:px-16 rounded-lg md:rounded-l-none md:rounded-r-lg ml-10">
          <div className="flex flex-col justify-center h-full">
            <div className="space-y-4 md:space-y-6 max-w-md mx-auto md:mx-0">
              <motion.h1
                variants={FadeUp(0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-gray-800"
              >
                Brand Info
              </motion.h1>
              
              <motion.p
                variants={FadeUp(0.5)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-gray-600 leading-relaxed text-sm sm:text-base"
              >
                At GreenGrove, we are committed to bringing farm-fresh, high-quality vegetables directly to your doorstep. 
                Our mission is to support local farmers while providing customers with the freshest produce available. 
                We believe in sustainability, transparency, and convenience—ensuring that every vegetable you order is 
                carefully selected and delivered with care.
              </motion.p>
              
              <motion.div
                variants={FadeUp(0.7)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex justify-center md:justify-start"
              >
                <button 
                  className="primary-btn hover:bg-opacity-90 transition-colors bg-green-600 hover:bg-green-700"
                  aria-label="Learn more about GreenGrove"
                >
                  <span>Learn More</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;