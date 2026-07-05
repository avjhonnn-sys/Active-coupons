import React, { useState, useEffect } from 'react';

export default function CountUp({ end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end <= 0) {
      setCount(0);
      return;
    }
    
    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCount(end);
      return;
    }

    let start = 0;
    const duration = 1000; // ms
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic: progress * (2 - progress)
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * end);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return <span>{count}</span>;
}
