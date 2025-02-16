import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

const HeartBlast: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const createHearts = useCallback((e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    // Clean up hearts after animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => !newHearts.includes(heart)));
    }, 1000);
  }, []);

  return (
    <>
      <span
        onClick={createHearts}
        className="ml-2 text-[0.7em] inline-block transform hover:scale-110 transition-all duration-300 cursor-pointer"
        style={{
          color: '#cc1016',
          textShadow: `
            2px 2px 2px rgba(139, 0, 0, 0.3),
            -1px -1px 1px rgba(255, 255, 255, 0.2)
          `,
          filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2))',
        }}
      >
        ❤
      </span>
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              position: 'fixed',
              left: heart.x,
              top: heart.y,
              scale: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              left: heart.x + (Math.random() * 200 - 100),
              top: heart.y + (Math.random() * -200 - 50),
              scale: heart.scale,
              rotate: heart.rotation,
              opacity: [0, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 9999,
              fontSize: '1.5rem',
              color: '#cc1016',
              textShadow: `
                2px 2px 2px rgba(139, 0, 0, 0.3),
                -1px -1px 1px rgba(255, 255, 255, 0.2)
              `,
              filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2))',
            }}
          >
            ❤
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default HeartBlast;
