import React from 'react';
import Login from '../components/auth/Login';
import backgroundImage from '../assets/images/background.png';

const LoginPage: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes float-1 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          20% { transform: translate(45vw, -25vh) rotate(45deg) scale(1.15); }
          40% { transform: translate(70vw, 15vh) rotate(90deg) scale(0.95); }
          60% { transform: translate(50vw, 40vh) rotate(180deg) scale(1.1); }
          80% { transform: translate(20vw, 20vh) rotate(270deg) scale(0.9); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }
        @keyframes float-2 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(-30vw, 35vh) rotate(-60deg) scale(1.2); }
          50% { transform: translate(40vw, -15vh) rotate(120deg) scale(0.85); }
          75% { transform: translate(-10vw, 25vh) rotate(240deg) scale(1.05); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }
        @keyframes float-3 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          30% { transform: translate(55vw, 30vh) rotate(90deg) scale(1.1); }
          60% { transform: translate(-25vw, -20vh) rotate(180deg) scale(0.9); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }
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

        {/* Large Floating Pokéballs - Moving Randomly Across Screen */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.15 }}>
          {[
            { anim: 'float-1', dur: 20, delay: 0 },
            { anim: 'float-2', dur: 18, delay: 2 },
            { anim: 'float-3', dur: 22, delay: 4 },
            { anim: 'float-1', dur: 24, delay: 6 },
            { anim: 'float-2', dur: 19, delay: 8 },
            { anim: 'float-3', dur: 21, delay: 10 },
          ].map((config, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '8px solid white',
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 3) * 30}%`,
                animation: `${config.anim} ${config.dur}s ease-in-out infinite`,
                animationDelay: `${config.delay}s`,
              }}
            >
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '8px',
                background: 'white',
                transform: 'translateY(-50%)',
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '32px',
                height: '32px',
                background: 'white',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                border: '4px solid #374151',
              }} />
            </div>
          ))}
        </div>

        {/* Glowing Energy Orbs - Wandering Randomly */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.45)',
            filter: 'blur(75px)',
            zIndex: 1,
            animation: 'orb-wander-1 16s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '10%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.45)',
            filter: 'blur(75px)',
            zIndex: 1,
            animation: 'orb-wander-2 20s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '55%',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'rgba(34, 197, 94, 0.45)',
            filter: 'blur(75px)',
            zIndex: 1,
            animation: 'orb-wander-3 24s ease-in-out infinite',
          }}
        />

        {/* Login Component */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Login />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
