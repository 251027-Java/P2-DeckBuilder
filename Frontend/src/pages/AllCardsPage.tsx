import React, { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

import bg from "../assets/images/background.png";
import logo from "../assets/logo.png";

// Your existing card images
import charizard from "../assets/charizard.png";
import oddish from "../assets/oddish.png";
import magikarp from "../assets/magikarp.png";
import combusken from "../assets/combusken.png";
import vulpix from "../assets/vulpix.png";

type CardType = "Fire" | "Water" | "Grass" | "Electric" | "Psychic" | "Other";
type Rarity = "Common" | "Uncommon" | "Rare" | "Unknown";

type Card = {
  id: string;
  name: string;
  imageUrl: string;
  type: CardType;
  rarity: Rarity;
};

function CardTile({ card }: { card: Card }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[210px] h-[290px] rounded-xl bg-white/20 shadow-lg p-3 flex items-center justify-center">
        <img
          src={card.imageUrl}
          alt={card.name}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      <span className="mt-3 text-[11px] font-extrabold tracking-[0.12em] text-black/70">
        {card.name.toUpperCase()}
      </span>

      <span className="mt-1 text-[10px] font-bold tracking-[0.08em] text-black/50">
        {card.type} • {card.rarity}
      </span>
    </div>
  );
}

const AllCardsPage: React.FC = () => {
  const cards: Card[] = [
    { id: "charizard", name: "Charizard", imageUrl: charizard, type: "Fire", rarity: "Rare" },
    { id: "oddish", name: "Oddish", imageUrl: oddish, type: "Grass", rarity: "Common" },
    { id: "magikarp", name: "Magikarp", imageUrl: magikarp, type: "Water", rarity: "Common" },
    { id: "combusken", name: "Combusken", imageUrl: combusken, type: "Fire", rarity: "Uncommon" },
    { id: "vulpix", name: "Vulpix", imageUrl: vulpix, type: "Fire", rarity: "Common" },
  ];

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<CardType | "All">("All");
  const [rarityFilter, setRarityFilter] = useState<Rarity | "All">("All");

  const filteredCards = useMemo(() => {
    const q = search.trim().toLowerCase();

    return cards.filter((c) => {
      const matchesSearch = !q || c.name.toLowerCase().includes(q);
      const matchesType = typeFilter === "All" || c.type === typeFilter;
      const matchesRarity = rarityFilter === "All" || c.rarity === rarityFilter;

      return matchesSearch && matchesType && matchesRarity;
    });
  }, [cards, search, typeFilter, rarityFilter]);

  const types: (CardType | "All")[] = ["All", "Fire", "Water", "Grass", "Electric", "Psychic", "Other"];
  const rarities: (Rarity | "All")[] = ["All", "Common", "Uncommon", "Rare", "Unknown"];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pb-16"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Pokémon Logo */}
      <div className="flex justify-center pt-10">
        <img src={logo} alt="Pokémon" className="w-[min(700px,85vw)] h-auto" />
      </div>

      {/* Page Content */}
      <div className="mx-auto w-[min(1100px,92vw)] pt-8">
        <h2 className="text-4xl font-extrabold font-brand tracking-tight text-black mb-2">
          ALL CARDS
        </h2>
        <p className="text-black/70 mb-6">Search and filter all available cards.</p>

        {/* Search + Filters */}
        <div className="glassmorphism p-4 rounded-xl mb-8 flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[240px] relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cards..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-black/10 bg-white/70 focus:bg-white outline-none transition"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-black/70">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as CardType | "All")}
              className="px-3 py-2 rounded-lg bg-white/70 border border-black/10"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Rarity Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-black/70">Rarity:</span>
            <select
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value as Rarity | "All")}
              className="px-3 py-2 rounded-lg bg-white/70 border border-black/10"
            >
              {rarities.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Count */}
          <div className="ml-auto font-bold text-black/70">
            Showing {filteredCards.length} / {cards.length}
          </div>
        </div>

        {/* Card Grid */}
        {filteredCards.length === 0 ? (
          <div className="glassmorphism p-12 rounded-2xl text-center text-black/70">
            No cards match your search/filters.
          </div>
        ) : (
          <div className="flex flex-wrap gap-10">
            {filteredCards.map((card) => (
              <CardTile key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCardsPage;
