import React from "react";
import ReactDOM from "react-dom/client";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "@/App";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <App />
        </MotionConfig>
      </LazyMotion>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  </React.StrictMode>,
);
