import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import bg from "../../assets/images/background.png";
import logo from "../../assets/logo.png";

// OPTIONAL: import your card images if you want to show them
import magikarp from "../../assets/magikarp.png";
import combusken from "../../assets/combusken.png";
import vulpix from "../../assets/vulpix.png";

type Card = {
  id: string;
  name: string;
  imageUrl: string;
  rarity?: string; // "Common", "Uncommon", "Rare", "Rare Holo", "Ultra Rare", etc.
};

function normalizeRarity(r?: string) {
  const v = (r ?? "").trim();
  return v.length ? v : "Unknown";
}

function isRarePlus(rarity: string) {
  const r = rarity.toLowerCase();
  return (
    r.includes("rare") ||
    r.includes("ultra") ||
    r.includes("secret") ||
    r.includes("holo") ||
    r.includes("illustration") ||
    r.includes("hyper") ||
    r.includes("double rare")
  );
}

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

function CardTile({
  image,
  label,
}: {
  image: string;
  label: string;
}) {
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

const CollectionView: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // ✅ TEMP local data (swap with real data later)
  const cards: Card[] = [
    { id: "magikarp", name: "Magikarp", imageUrl: magikarp, rarity: "Common" },
    { id: "combusken", name: "Combusken", imageUrl: combusken, rarity: "Uncommon" },
    { id: "vulpix", name: "Vulpix", imageUrl: vulpix, rarity: "Rare" },
  ];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cards.filter((c) => !q || c.name.toLowerCase().includes(q));
  }, [cards, search]);

  const stats = useMemo(() => {
    const total = cards.length;
    const unique = new Set(cards.map((c) => c.id)).size;

    const rarityCounts: Record<string, number> = {};
    let rarePlus = 0;

    for (const c of cards) {
      const r = normalizeRarity(c.rarity);
      rarityCounts[r] = (rarityCounts[r] ?? 0) + 1;
      if (isRarePlus(r)) rarePlus += 1;
    }

    let mostCommonRarity = "—";
    let max = 0;
    for (const [r, count] of Object.entries(rarityCounts)) {
      if (count > max) {
        max = count;
        mostCommonRarity = r;
      }
    }

    return { total, unique, rarePlus, mostCommonRarity };
  }, [cards]);

  const isEmpty = cards.length === 0;

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
      <div className="mx-auto w-[min(980px,92vw)] pt-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-black mb-4">COLLECTION</h2>
        <p className="text-black/70 mb-6">
          View and manage your Pokemon card collection
        </p>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glassmorphism p-4 rounded-xl mb-6 flex flex-wrap gap-4"
        >
          <div className="flex-1 min-w-[200px] relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your collection..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-black/10 bg-white/70 focus:bg-white outline-none transition-all"
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
            onClick={() => console.log("filters later")}
          >
            <FaFilter />
            <span>Filter</span>
          </button>
        </motion.div>

        {/* Rarity Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard label="Total Cards" value={stats.total} colorClass="text-pokemon-blue" />
          <StatCard label="Unique Cards" value={stats.unique} colorClass="text-pokemon-red" />
          <StatCard label="Rare+ Cards" value={stats.rarePlus} colorClass="text-pokemon-yellow" />
          <StatCard
            label="Most Common Rarity"
            value={stats.mostCommonRarity}
            colorClass="text-pokemon-green"
          />
        </motion.div>

        {/* Content */}
        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="glassmorphism p-12 rounded-2xl text-center"
          >
            <h3 className="text-xl font-extrabold text-black/70 mb-2">
              Your Collection is Empty
            </h3>
            <p className="text-black/60 mb-6">Start adding cards to build your collection!</p>
            <button
              type="button"
              onClick={() => navigate("/decks/new")}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              Browse Cards
            </button>
          </motion.div>
        ) : (
          <section className="mt-6">
            <h3 className="text-2xl font-extrabold text-black mb-4">
              Your Cards ({filtered.length})
            </h3>

            <div className="flex gap-10 flex-wrap">
              {filtered.map((c) => (
                <CardTile key={c.id} image={c.imageUrl} label={`${c.name} • ${normalizeRarity(c.rarity)}`} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CollectionView;
