import { motion } from "framer-motion";

export const BackgroundGradient = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dot grid — moved from sections to global for performance */}
      <div className="about-dot-grid fixed inset-0 opacity-40" />

      <motion.div
        animate={{
          x: [0, 15, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <div className="absolute top-[10%] left-[5%] w-[32rem] h-[32rem] rounded-full blur-[80px] opacity-[0.06] bg-[hsl(212,90%,50%)]" />
        <div className="absolute bottom-[10%] right-[5%] w-[28rem] h-[28rem] rounded-full blur-[80px] opacity-[0.04] bg-[hsl(190,80%,55%)]" />
      </motion.div>
    </div>
  );
};
