import React, { useState, useEffect } from 'react';
import Register from '../components/auth/Register';
import backgroundImage from '../assets/images/background.png';
import pokeballIcon from '../assets/images/pokeballIcon.png';
import pikachuIcon from '../assets/images/pikachu.png';
import bulbasaurIcon from '../assets/images/bulbasaur.png';
import eeveeIcon from '../assets/images/eevee.png';
import gengarIcon from '../assets/images/gengar.png';
import lugiaIcon from '../assets/images/lugia.png';

interface PokeballPosition {
  x: number;
  y: number;
}

const RegisterPage: React.FC = () => {
  const [pokeballPaths, setPokeballPaths] = useState<PokeballPosition[][]>([]);

  const generateRandomPath = () => {
    const path: PokeballPosition[] = [];
    const numPoints = 4 + Math.floor(Math.random() * 3); // 4-6 waypoints
    
    for (let i = 0; i < numPoints; i++) {
      path.push({
        x: Math.random() * 150 - 75, // -75vw to 75vw
        y: Math.random() * 100 - 50, // -50vh to 50vh
      });
    }
    
    // Move off-screen before resetting
    const exitDirection = Math.random();
    if (exitDirection < 0.25) {
      // Exit top
      path.push({ x: Math.random() * 100 - 50, y: -120 });
    } else if (exitDirection < 0.5) {
      // Exit right
      path.push({ x: 120, y: Math.random() * 100 - 50 });
    } else if (exitDirection < 0.75) {
      // Exit bottom
      path.push({ x: Math.random() * 100 - 50, y: 120 });
    } else {
      // Exit left
      path.push({ x: -120, y: Math.random() * 100 - 50 });
    }
    
    // Return to start (will be instant as it's the last keyframe)
    path.push({ x: 0, y: 0 });
    return path;
  };

  useEffect(() => {
    // Generate initial paths for 6 pokeballs
    const initialPaths = Array.from({ length: 6 }, () => generateRandomPath());
    setPokeballPaths(initialPaths);

    // Regenerate random paths every 20 seconds
    const interval = setInterval(() => {
      const newPaths = Array.from({ length: 6 }, () => generateRandomPath());
      setPokeballPaths(newPaths);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const generateKeyframes = (path: PokeballPosition[], index: number) => {
    const keyframes = path.map((point, i) => {
      const percent = (i / (path.length - 1)) * 100;
      return `${percent}% { transform: translate(${point.x}vw, ${point.y}vh); }`;
    }).join('\n          ');
    
    return `@keyframes randomFloat-${index} {\n          ${keyframes}\n        }`;
  };
  return (
    <>
      <style>{`
        ${pokeballPaths.map((path, i) => generateKeyframes(path, i)).join('\n        ')}
        @keyframes pulse-bg {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes orb-wander-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          20% { transform: translate(35vw, 25vh) scale(1.4); opacity: 0.65; }
          40% { transform: translate(-15vw, 45vh) scale(1.1); opacity: 0.5; }
          60% { transform: translate(50vw, -10vh) scale(1.3); opacity: 0.6; }
          80% { transform: translate(-30vw, 15vh) scale(1.2); opacity: 0.55; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
        }
        @keyframes orb-wander-2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          25% { transform: translate(-40vw, -20vh) scale(1.5); opacity: 0.7; }
          50% { transform: translate(30vw, 35vh) scale(1.2); opacity: 0.55; }
          75% { transform: translate(45vw, -25vh) scale(1.35); opacity: 0.65; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
        }
        @keyframes orb-wander-3 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.3; }
          33% { transform: translate(25vw, -30vh) scale(1.25) rotate(120deg); opacity: 0.6; }
          66% { transform: translate(-35vw, 20vh) scale(1.4) rotate(240deg); opacity: 0.5; }
          100% { transform: translate(0, 0) scale(1) rotate(360deg); opacity: 0.3; }
        }
        @keyframes spark-diagonal-1 {
          0% { opacity: 0; transform: translate(-120vw, -50vh) scaleX(0.7) rotate(-15deg); }
          50% { opacity: 0.9; transform: translate(0, 0) scaleX(1.3) rotate(-15deg); }
          100% { opacity: 0; transform: translate(120vw, 50vh) scaleX(0.7) rotate(-15deg); }
        }
        @keyframes spark-diagonal-2 {
          0% { opacity: 0; transform: translate(-100vw, 40vh) scaleX(0.8) rotate(25deg); }
          50% { opacity: 0.85; transform: translate(0, 0) scaleX(1.2) rotate(25deg); }
          100% { opacity: 0; transform: translate(100vw, -40vh) scaleX(0.8) rotate(25deg); }
        }
        @keyframes spark-wave {
          0% { opacity: 0; transform: translate(-110vw, 0) scaleX(0.9) rotate(5deg); }
          50% { opacity: 0.8; transform: translate(10vw, -15vh) scaleX(1.4) rotate(5deg); }
          100% { opacity: 0; transform: translate(130vw, 0) scaleX(0.9) rotate(5deg); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      
      <div 
        style={{ 
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated pulsing overlay */}
        <div 
          style={{ 
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(45deg, rgba(239, 68, 68, 0.5) 0%, transparent 50%, rgba(59, 130, 246, 0.5) 100%)',
            animation: 'pulse-bg 8s ease-in-out infinite',
            zIndex: 0,
          }} 
        />

        {/* Multiple Floating Pokéballs - Random Paths */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.15 }}>
          {pokeballPaths.length > 0 && [
            { startLeft: '10%', startTop: '20%', icon: pikachuIcon, alt: 'Pikachu', size: 200 },
            { startLeft: '80%', startTop: '70%', icon: bulbasaurIcon, alt: 'Bulbasaur', size: 200 },
            { startLeft: '20%', startTop: '60%', icon: eeveeIcon, alt: 'Eevee', size: 200 },
            { startLeft: '90%', startTop: '30%', icon: gengarIcon, alt: 'Gengar', size: 200 },
            { startLeft: '5%', startTop: '80%', icon: lugiaIcon, alt: 'Lugia', size: 200 },
            { startLeft: '70%', startTop: '15%', icon: pokeballIcon, alt: 'Pokeball', size: 100 },
          ].map((config, i) => (
            <img
              key={i}
              src={config.icon}
              alt={config.alt}
              style={{
                position: 'absolute',
                width: `${config.size}px`,
                height: `${config.size}px`,
                left: config.startLeft,
                top: config.startTop,
                animation: `randomFloat-${i} 20s linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Register Component */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Register />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
