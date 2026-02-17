'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      // 0. Fade in the whole container
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut"
      });

      // 1. Entrance animation
      gsap.from(".grid-line", {
        opacity: 0,
        duration: 1.5,
        stagger: {
          amount: 0.8,
          from: "center"
        },
        ease: "power2.out"
      });

      // 2. Subtle pulse animation
      gsap.to(".grid-line", {
        strokeOpacity: 0.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: "center",
          each: 0.1
        },
        ease: "sine.inOut"
      });

      // 3. Running Points Logic
      const hLines = Array.from({ length: 21 }).map((_, i) => ({ type: 'h', pos: i * 5 }));
      const vLines = Array.from({ length: 21 }).map((_, i) => ({ type: 'v', pos: i * 5 }));
      const allLines = [...hLines, ...vLines];
      
      // Shuffle helper
      const shuffle = <T,>(array: T[]): T[] => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      let availableLines = shuffle([...allLines]);
      const activeLines = new Set();

      const spawnPoint = () => {
        if (availableLines.length === 0) {
          availableLines = shuffle([...allLines]);
        }

        // Find a line not currently active
        const lineIdx = availableLines.findIndex(l => !activeLines.has(`${l.type}-${l.pos}`));
        if (lineIdx === -1) return; // Should not happen with 42 lines and 3 points

        const line = availableLines.splice(lineIdx, 1)[0];
        const lineKey = `${line.type}-${line.pos}`;
        activeLines.add(lineKey);

        const runner = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        const isH = line.type === 'h';
        
        // Setup runner appearance (the tail is handled by the gradient)
        runner.setAttribute("width", isH ? "15" : "0.15");
        runner.setAttribute("height", isH ? "0.15" : "15");
        runner.setAttribute("fill", `url(#runner-gradient-${isH ? 'h' : 'v'})`);
        runner.setAttribute("opacity", "0");
        svgRef.current?.appendChild(runner);

        const tl = gsap.timeline({
          onComplete: () => {
            runner.remove();
            activeLines.delete(lineKey);
            // Delay next spawn on this specific slot to keep exactly 3 running
            setTimeout(spawnPoint, gsap.utils.random(500, 1500));
          }
        });

        if (isH) {
          // Horizontal movement
          gsap.set(runner, { x: -15, y: line.pos });
          tl.to(runner, { opacity: 0.8, duration: 0.2 })
            .to(runner, { x: 100, duration: gsap.utils.random(2, 4), ease: "none" }, 0)
            .to(runner, { opacity: 0, duration: 0.2 }, "-=0.2");
        } else {
          // Vertical movement
          gsap.set(runner, { x: line.pos, y: -15 });
          tl.to(runner, { opacity: 0.8, duration: 0.2 })
            .to(runner, { y: 100, duration: gsap.utils.random(2, 4), ease: "none" }, 0)
            .to(runner, { opacity: 0, duration: 0.2 }, "-=0.2");
        }
      };

      // Start 3 runners
      for (let i = 0; i < 3; i++) {
        setTimeout(spawnPoint, i * 1000);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ opacity: 0 }}
    >
      <svg 
        ref={svgRef}
        className="grid-svg absolute inset-0 w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="runner-gradient-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="runner-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
          </linearGradient>
        </defs>
        
        <g className="grid-lines">
          {Array.from({ length: 21 }).map((_, i) => {
            const pos = i * 5;
            return (
              <React.Fragment key={`lines-${i}`}>
                <line
                  className="grid-line"
                  x1="0"
                  y1={pos}
                  x2="100"
                  y2={pos}
                  stroke="rgba(15, 23, 42, 0.12)" 
                  strokeWidth="0.08"
                />
                <line
                  className="grid-line"
                  x1={pos}
                  y1="0"
                  x2={pos}
                  y2="100"
                  stroke="rgba(15, 23, 42, 0.12)"
                  strokeWidth="0.08"
                />
              </React.Fragment>
            );
          })}
        </g>
      </svg>
      
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.6) 100%)'
        }}
      />
    </div>
  );
};

export default AnimatedGrid;
