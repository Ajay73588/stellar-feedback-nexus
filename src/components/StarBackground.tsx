
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const StarBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const starCount = Math.floor((width * height) / 10000); // Responsive star count
    
    // Clear existing stars
    container.innerHTML = '';
    
    // Create stars
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      });
    }
    
    // Add stars to the DOM
    stars.forEach(star => {
      const element = document.createElement('div');
      element.className = 'star';
      element.style.width = `${star.size}px`;
      element.style.height = `${star.size}px`;
      element.style.left = `${star.x}%`;
      element.style.top = `${star.y}%`;
      element.style.opacity = star.opacity.toString();
      element.style.setProperty('--duration', `${star.duration}s`);
      element.style.setProperty('--delay', `${star.delay}s`);
      container.appendChild(element);
    });
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        const newStarCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
        if (container.childNodes.length !== newStarCount) {
          // Recreate stars if window size changes significantly
          container.innerHTML = '';
          
          const newStars: Star[] = [];
          for (let i = 0; i < newStarCount; i++) {
            newStars.push({
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: Math.random() * 2 + 1,
              opacity: Math.random() * 0.7 + 0.3,
              duration: Math.random() * 4 + 2,
              delay: Math.random() * 5,
            });
          }
          
          newStars.forEach(star => {
            const element = document.createElement('div');
            element.className = 'star';
            element.style.width = `${star.size}px`;
            element.style.height = `${star.size}px`;
            element.style.left = `${star.x}%`;
            element.style.top = `${star.y}%`;
            element.style.opacity = star.opacity.toString();
            element.style.setProperty('--duration', `${star.duration}s`);
            element.style.setProperty('--delay', `${star.delay}s`);
            container.appendChild(element);
          });
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={containerRef} className="star-container" />;
};

export default StarBackground;
