
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="https://cdn.prod.website-files.com/66e2b24abe74b03ad57ad2fb%2F66e2b7106304a926c025bd4f_farm-bg-transcode.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col justify-center h-full container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-green-400 mb-6 leading-tight">
            Save The Earth, Sell Us Your Unwanted Chemicals.
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Surplus Chemical Brokers, Since 2001.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium text-center transition-all duration-300 hover:bg-green-700"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <button 
          onClick={handleScrollDown}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors duration-300"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
