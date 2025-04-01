import React from 'react';
import { motion } from 'framer-motion';
import { IoBagHandleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import HeroPng from '../../assets/plate.png';
import LeafPng from '../../assets/leaf.png';
import { 
  FadeUp, 
  FadeLeft, 
  FadeRight,
  ScaleUp
} from '../../utility/animation';

const Hero = () => {
  return (
    <section className="relative pl-10 md:pl-20 pr-10 md:pr-20 bg-gray-50 overflow-hidden">
      {/* Main container */}
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
        {/* Text content - Left side */}
        <div className="flex flex-col justify-center px-7 py-8 md:py-0 md:px-0 relative z-10 space-y-4 lg:max-w-[400px] text-center md:text-left">
          <motion.h1
            variants={FadeRight(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl font-semibold text-gray-800"
          >
            Healthy
          </motion.h1>

          <motion.h1
            variants={FadeRight(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl lg:text-6xl font-bold leading-tight xl:leading-none font-averia"
          >
            Fresh <span className="text-yellow-500">Vegetables!</span>
          </motion.h1>

          <motion.p
            variants={FadeUp(0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl tracking-wide"
          >
            Order Now For Fresh Healthy Life
          </motion.p>

          <motion.p
            variants={FadeUp(0.6)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-400"
          >
            Fresh, organic vegetables for a healthier lifestyle! 
            Start your day with farm-fresh greens, packed with nutrients and flavor. 
            Order now and enjoy 20% off on your first purchase!
          </motion.p>

          <motion.div
            variants={FadeUp(0.7)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center md:justify-start"
          >
            <Link 
              to="/products"
              className="primary-btn flex items-center gap-2" 
              aria-label="Order vegetables now"
            >
              <IoBagHandleOutline />
              <span>Order Now</span>
            </Link>
          </motion.div>
        </div>

        {/* Image content - Right side */}
        <motion.div
          variants={ScaleUp(0.8)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center items-center mt-4 md:mt-0 md:justify-end relative"
        >
          <img 
            src={HeroPng} 
            alt="Fresh vegetables plate" 
            className="w-[300px] md:w-[550px] lg:w-[650px] drop-shadow-lg relative z-10"
          />

          {/* Floating leaf decoration */}
          <motion.img
            src={LeafPng}
            variants={FadeLeft(1.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            alt="Leaf decoration"
            className="absolute top-14 md:top-0 right-1/2 blur-sm opacity-80 rotate-[40deg] w-full md:max-w-[300px]"
          />
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <motion.div
        variants={FadeUp(1.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-0"
      />
    </section>
  );
};

export default Hero;