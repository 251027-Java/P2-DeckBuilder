import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/background.png';
import logoImage from '../assets/images/logo.png';

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @keyframes pulse-bg {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
          color: 'white',
        }}
      >
        {/* Pulsing overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(45deg, rgba(239,68,68,0.45), rgba(59,130,246,0.45))',
            animation: 'pulse-bg 8s ease-in-out infinite',
            zIndex: 0,
          }}
        />

        {/* Logo – Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            zIndex: 2,
          }}
        >
          <img
            src={logoImage}
            alt="Pokemon DeckBuilder Logo"
            style={{
              height: '160px', // bigger logo
              objectFit: 'contain',
              filter: 'drop-shadow(0 6px 15px rgba(0,0,0,0.6))',
            }}
          />
        </div>

        {/* Main Content – below logo */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(2rem + 160px + 3rem)', // start below logo
            left: '4rem',
            zIndex: 2,
            maxWidth: '600px',
          }}
        >
          {/* Description */}
          <p
            style={{
              fontSize: '1.3rem',
              lineHeight: 1.6,
              textShadow: '0 2px 6px rgba(0,0,0,0.5)',
              marginBottom: '1rem',
            }}
          >
            Pokémon DeckBuilder is a full-stack Pokémon TCG deck management app that makes it easy to build, organize, and track your card collection. 
            Register an account, search the official Pokémon TCG API, manage your personal inventory, and create tournament-legal decks with real-time validation. 
            You never have to worry about adding cards you don’t own and can focus on crafting the ultimate deck and leveling up your strategy!
          </p>

          {/* Get Started Button – moved higher */}
          <button
            onClick={() => navigate('/login')}
            style={{
              width: 'fit-content',
              padding: '1rem 3rem',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              background: '#ffcb05',
              color: '#1f2937',
              boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              marginTop: '-0.5rem', // move button up
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default StartPage;
