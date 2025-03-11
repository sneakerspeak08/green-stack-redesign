
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: 471, label: "Chemical formulations created", suffix: "+" },
  { value: 52, label: "Satisfied customers", suffix: "k+" },
  { value: 35, label: "Countries served", suffix: "+" },
  { value: 99, label: "Quality assurance rating", suffix: "%" },
];

const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        const duration = 2000; // Animation duration in ms
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        const valueIncrement = stat.value / totalFrames;
        
        let currentFrame = 0;
        const counter = setInterval(() => {
          currentFrame++;
          const newCounts = [...counts];
          newCounts[index] = Math.min(
            Math.ceil(valueIncrement * currentFrame),
            stat.value
          );
          setCounts(newCounts);
          
          if (currentFrame === totalFrames) {
            clearInterval(counter);
          }
        }, frameDuration);
        
        return () => clearInterval(counter);
      });
    }
  }, [isInView]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-tychem-600">
                    {counts[index]}
                  </span>
                  {stat.suffix && (
                    <span className="text-xl md:text-2xl font-medium text-tychem-600 ml-1">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
