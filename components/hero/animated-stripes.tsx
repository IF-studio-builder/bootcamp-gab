"use client";

import { useEffect, useMemo, useRef } from "react";

interface AnimatedStripesProps {
  className?: string;
}

const STRIPE_WIDTH = 8;
const GAP = 6;

export function AnimatedStripes({ className = "" }: AnimatedStripesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | undefined>(undefined);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Générer les positions des stripes
  const stripes = useMemo(() => {
    const totalWidth = STRIPE_WIDTH + GAP;
    const count = Math.ceil(2000 / totalWidth);

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: i * totalWidth,
      basePhase: Math.random() * Math.PI * 2, // Phase aléatoire pour chaque stripe
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation continue pour l'effet de pulsation
  useEffect(() => {
    let time = 0;
    const animate = () => {
      time += 0.016; // ~60fps
      const bars = document.querySelectorAll("[data-audio-bar]");

      bars.forEach((bar, i) => {
        const stripe = stripes[i];
        if (!stripe || !containerRef.current) return;

        const element = bar as HTMLElement;
        const rect = containerRef.current.getBoundingClientRect();

        // Distance de la souris par rapport à la stripe
        const distanceX = Math.abs(mousePosRef.current.x - stripe.x);
        const distanceY = Math.abs(mousePosRef.current.y - rect.height / 2);
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        // Influence de la souris (plus proche = plus fort)
        const mouseInfluence = Math.max(0, 1 - distance / 300);

        // Animation de base (spectre audio)
        const baseHeight =
          20 +
          Math.sin(time * 3 + stripe.basePhase) * 15 +
          Math.sin(time * 5 + stripe.basePhase * 0.5) * 10 +
          Math.sin(time * 7 + stripe.basePhase * 1.5) * 8;

        // Boost par la souris
        const mouseBoost = mouseInfluence * 40;

        // Hauteur finale (entre 10% et 95%)
        const finalHeight = Math.min(95, Math.max(10, baseHeight + mouseBoost));

        // Opacité varie avec la hauteur
        const opacity = 0.15 + mouseInfluence * 0.3;

        element.style.height = `${finalHeight}%`;
        element.style.opacity = `${opacity}`;
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [stripes]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 flex items-end justify-start">
        {stripes.map((stripe) => (
          <div
            key={stripe.id}
            data-audio-bar
            className="absolute bottom-0 transition-all duration-75 ease-out"
            style={{
              left: stripe.x,
              width: STRIPE_WIDTH,
              height: "20%",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
