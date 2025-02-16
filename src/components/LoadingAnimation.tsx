import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAnimationProps {
  onLoadingComplete: () => void;
}

const LoadingAnimation = ({ onLoadingComplete }: LoadingAnimationProps) => {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onLoadingComplete, 1000);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
          exit={{
            scale: 5,
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-white text-8xl tracking-tight"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                textShadow: "0 0 20px rgba(255,255,255,0.3)",
                WebkitFontSmoothing: "antialiased",
                letterSpacing: "-0.05em"
              }}
            >
              {count.toString().padStart(3, '0')}
              <span className="text-4xl ml-1" style={{ opacity: 0.8 }}>%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
