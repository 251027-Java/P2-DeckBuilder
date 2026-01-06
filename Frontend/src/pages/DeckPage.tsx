import React, { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaLayerGroup } from "react-icons/fa";

import bg from "../assets/images/background.png";
import logo from "../assets/logo.png";

// sample card images (swap with yours)
import charizard from "../assets/charizard.png";
import oddish from "../assets/oddish.png";
import magikarp from "../assets/magikarp.png";
import combusken from "../assets/combusken.png";
import vulpix from "../assets/vulpix.png";

type CardCategory = "Pokemon" | "Trainer" | "Energy";

type Card = {
  id: string;
  name: string;
  imageUrl: string;
  category: CardCategory;
};

type Deck = {
  id: string;
  name: string;
  cover: string;
  cards: Card[];
};

function StatCard({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string | number;
  colorClass: string;
}) {
  return (
    <div className="glassmorphism p-4 rounded-xl text-center">
      <p className="text-black/60 text-sm">{label}</p>
      <p className={`text-2xl font-extrabold ${colorClass}`}>{value}</p>
    </div>
  );
}

function CardTile({ image, label }: { image: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[210px] h-[290px] rounded-xl bg-white/20 shadow-lg p-3 flex items-center justify-center">
        <img src={image} alt={label} className="w-full h-full object-contain rounded-lg" />
      </div>
      <span className="mt-3 text-[11px] font-extrabold tracking-[0.12em] text-black/70">
        {label}
      </span>
    </div>
  );
}

const DeckPage: React.FC = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const decks: Deck[] = [
    {
      id: "my-deck",
      name: "MY DECK",
      cover: charizard,
      cards: [
        { id: "charizard", name: "Charizard", imageUrl: charizard, category: "Pokemon" },
        { id: "vulpix", name: "Vulpix", imageUrl: vulpix, category: "Pokemon" },
      ],
    },
    {
      id: "deck-2",
      name: "DECK 2",
      cover: oddish,
      cards: [
        { id: "oddish", name: "Oddish", imageUrl: oddish, category: "Pokemon" },
        { id: "magikarp", name: "Magikarp", imageUrl: magikarp, category: "Pokemon" },
        { id: "combusken", name: "Combusken", imageUrl: combusken, category: "Pokemon" },
      ],
    },
  ];

  const deck = decks.find((d) => d.id === deckId);

  const stats = useMemo(() => {
    const cards = deck?.cards ?? [];
    const total = cards.length;
    const pokemon = cards.filter((c) => c.category === "Pokemon").length;
    const trainer = cards.filter((c) => c.category === "Trainer").length;
    const energy = cards.filter((c) => c.category === "Energy").length;
    return { total, pokemon, trainer, energy };
  }, [deck]);

  if (!deck) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Deck not found</h1>
        <button className="underline" onClick={() => navigate("/decks")}>
          Back to Decks
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pb-16"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Pokémon Logo */}
      <div className="flex justify-center pt-10">
        <img src={logo} alt="Pokémon" className="w-[min(700px,85vw)] h-auto" />
      </div>

      <div className="mx-auto w-[min(980px,92vw)] pt-8">
        {/* Top row */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-xl bg-white/60 hover:bg-white/80 shadow flex items-center gap-2"
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate(`/decks/new?deckId=${deck.id}`)}
            className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 shadow"
          >
            Edit Deck
          </button>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3">
            <FaLayerGroup className="text-3xl text-black/70" />
            <h2 className="text-3xl font-extrabold text-black">{deck.name}</h2>
          </div>
          <p className="text-black/70 mt-1">Deck ID: {deck.id}</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard label="Total Cards" value={stats.total} colorClass="text-pokemon-blue" />
          <StatCard label="Pokémon" value={stats.pokemon} colorClass="text-pokemon-red" />
          <StatCard label="Trainers" value={stats.trainer} colorClass="text-pokemon-yellow" />
          <StatCard label="Energy" value={stats.energy} colorClass="text-pokemon-green" />
        </motion.div>

        {/* Cover + Cards */}
        <section className="mt-6">
          <h3 className="text-2xl font-extrabold text-black mb-4">Cards in Deck</h3>

          {deck.cards.length === 0 ? (
            <div className="glassmorphism p-12 rounded-2xl text-center text-black/70">
              This deck is empty. Add some cards in the Deck Builder.
              <div className="mt-4">
                <Link
                  to={`/decks/new?deckId=${deck.id}`}
                  className="inline-block px-5 py-3 rounded-xl bg-black text-white hover:opacity-90"
                >
                  Go to Deck Builder
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex gap-10 flex-wrap">
              {deck.cards.map((c) => (
                <CardTile key={c.id} image={c.imageUrl} label={c.name} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DeckPage;
