import React from "react";

import bg from "../assets/bg.png";
import logo from "../assets/pokemon-logo.png";

import charizard from "../assets/cards/charizard.png";
import oddish from "../assets/cards/oddish.png";

import magikarp from "../assets/cards/magikarp.png";
import combusken from "../assets/cards/combusken.png";
import vulpix from "../assets/cards/vulpix.png";

type CardTileProps = {
  image: string;
  label?: string;
  onClick?: () => void;
};

const CardTile: React.FC<CardTileProps> = ({ image, label, onClick }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className="w-[210px] h-[290px] rounded-xl bg-white/20 shadow-lg p-3 flex items-center justify-center hover:scale-[1.02] transition"
      >
        <img
          src={image}
          alt={label ?? "card"}
          className="w-full h-full object-contain rounded-lg"
        />
      </button>

      {label && (
        <span className="mt-3 text-[11px] font-extrabold tracking-[0.12em] text-black/70">
          {label}
        </span>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const decks = [
    { id: "my-deck", name: "MY DECK", cover: charizard },
    { id: "deck-2", name: "DECK 2", cover: oddish },
  ];

  const collection = [
    { id: "magikarp", cover: magikarp },
    { id: "combusken", cover: combusken },
    { id: "vulpix", cover: vulpix },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pb-16"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Pokémon Logo */}
      <div className="flex justify-center pt-10">
        <img
          src={logo}
          alt="Pokémon"
          className="w-[min(700px,85vw)] h-auto"
        />
      </div>

      {/* Page Content */}
      <div className="mx-auto w-[min(980px,92vw)] pt-8">
        {/* DECKS */}
        <section className="mt-6">
          <h2 className="text-3xl font-extrabold text-black mb-4">DECKS</h2>

          <div className="flex gap-12 flex-wrap">
            {decks.map((deck) => (
              <CardTile
                key={deck.id}
                image={deck.cover}
                label={deck.name}
                onClick={() => console.log("Open deck:", deck.id)}
              />
            ))}
          </div>
        </section>

        {/* COLLECTION */}
        <section className="mt-14">
          <h2 className="text-3xl font-extrabold text-black mb-4">
            COLLECTION
          </h2>

          <div className="flex gap-10 flex-wrap">
            {collection.map((card) => (
              <CardTile
                key={card.id}
                image={card.cover}
                onClick={() => console.log("Open card:", card.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
