import React from "react";
import { Link, useNavigate } from "react-router-dom";

import bg from "../assets/images/background.png";
import logo from "../assets/logo.png";

import charizard from "../assets/charizard.png";
import oddish from "../assets/oddish.png";
import magikarp from "../assets/magikarp.png";
import combusken from "../assets/combusken.png";
import vulpix from "../assets/vulpix.png";

import DeckStack from "../components/decks/DeckStack";

/* ---------- Types ---------- */

type Card = {
  id: string;
  imageUrl: string;
};

type Deck = {
  id: string;
  name: string;
  cards: Card[];
};

type CollectionCard = {
  id: string;
  cover: string;
};

/* ---------- Component ---------- */

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  /* Mock deck data (frontend-only for now) */
  const decks: Deck[] = [
    {
      id: "my-deck",
      name: "MY DECK",
      cards: [
        { id: "charizard", imageUrl: charizard },
        { id: "vulpix", imageUrl: vulpix },
      ],
    },
    {
      id: "deck-2",
      name: "DECK 2",
      cards: [
        { id: "oddish", imageUrl: oddish },
        { id: "magikarp", imageUrl: magikarp },
        { id: "combusken", imageUrl: combusken },
      ],
    },
  ];

  const collection: CollectionCard[] = [
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
        {/* ---------- DECKS ---------- */}
        <section className="mt-6">
          <h2 className="text-3xl font-extrabold text-black mb-4">
            DECKS
          </h2>

          <div className="flex gap-12 flex-wrap">
            {decks.map((deck) => (
              <DeckStack
                key={deck.id}
                images={deck.cards.map((c) => c.imageUrl)}
                label={deck.name}
                onClick={() => navigate(`/decks/${deck.id}`)}
              />
            ))}
          </div>
        </section>

        {/* ---------- COLLECTION ---------- */}
        <section className="mt-14">
          <Link to="/collection" className="inline-block mb-4 hover:underline">
            <h2 className="text-3xl font-extrabold text-black">
              COLLECTION
            </h2>
          </Link>

          <div className="flex gap-10 flex-wrap">
            {collection.map((card) => (
              <div key={card.id} className="w-[210px] h-[290px] rounded-xl bg-white/20 shadow-lg p-3 flex items-center justify-center">
                <img
                  src={card.cover}
                  alt={card.id}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
