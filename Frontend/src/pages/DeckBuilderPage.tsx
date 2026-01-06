import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSave, FaSearch, FaPlus } from "react-icons/fa";

import bg from "../assets/images/background.png";
import logo from "../assets/logo.png";

type Card = {
  id: string;
  name: string;
  imageUrl: string;
  type?: string;
  category?: "Pokemon" | "Trainer" | "Energy";
};

type Deck = {
  id: string;
  name: string;
  cardCount?: number;
};

const API_BASE = "http://localhost:8080";   //should connect to api gateway

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative z-10 w-[min(520px,92vw)] rounded-2xl bg-white shadow-2xl p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-black/10 hover:bg-black/15"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

const DeckBuilderPage: React.FC = () => {
  // --- UI state (from your version) ---
  const [deckName, setDeckName] = useState("");

  // --- data state (from my first version) ---
  const [cards, setCards] = useState<Card[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string>("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const [showNewDeck, setShowNewDeck] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  // --- load cards & decks ---
  useEffect(() => {
    (async () => {
      setBusy("loading");
      setError(null);
      try {
        const [cardsRes, decksRes] = await Promise.all([
          fetch(`${API_BASE}/api/cards`),
          fetch(`${API_BASE}/api/decks`),
        ]);

        if (!cardsRes.ok) throw new Error(`Cards failed: ${cardsRes.status}`);
        if (!decksRes.ok) throw new Error(`Decks failed: ${decksRes.status}`);

        const cardsData: Card[] = await cardsRes.json();
        const decksData: Deck[] = await decksRes.json();

        setCards(cardsData);
        setDecks(decksData);

        // default select first deck (optional)
        if (!selectedDeckId && decksData.length > 0) {
          setSelectedDeckId(decksData[0].id);
        }
      } catch (e: any) {
        setError(e?.message ?? "Load failed");
      } finally {
        setBusy(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- filtering ---
  const uniqueTypes = useMemo(() => {
    const s = new Set(cards.map((c) => c.type).filter(Boolean) as string[]);
    return Array.from(s).sort();
  }, [cards]);

  const filteredCards = useMemo(() => {
    const s = search.trim().toLowerCase();
    return cards.filter((c) => {
      const matchesSearch = !s || c.name.toLowerCase().includes(s);
      const matchesType = !typeFilter || c.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [cards, search, typeFilter]);

  // --- actions ---
  async function createDeck() {
    if (!newDeckName.trim()) return;
    setBusy("createDeck");
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/decks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newDeckName.trim() }),
      });
      if (!res.ok) throw new Error(`Create deck failed: ${res.status}`);

      const created: Deck = await res.json();
      setDecks((prev) => [created, ...prev]);
      setSelectedDeckId(created.id);
      setDeckName(created.name);
      setNewDeckName("");
      setShowNewDeck(false);
    } catch (e: any) {
      setError(e?.message ?? "Failed to create deck");
    } finally {
      setBusy(null);
    }
  }

  async function addCardToDeck(cardId: string) {
    if (!selectedDeckId) {
      setError("Select a deck first (or create one).");
      return;
    }
    setBusy("addToDeck");
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/decks/${selectedDeckId}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId }),
      });
      if (!res.ok) throw new Error(`Add to deck failed: ${res.status}`);
      setActiveCard(null);
    } catch (e: any) {
      setError(e?.message ?? "Failed to add to deck");
    } finally {
      setBusy(null);
    }
  }

  async function addCardToCollection(cardId: string) {
    setBusy("addToCollection");
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/collection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId }),
      });
      if (!res.ok) throw new Error(`Add to collection failed: ${res.status}`);
      setActiveCard(null);
    } catch (e: any) {
      setError(e?.message ?? "Failed to add to collection");
    } finally {
      setBusy(null);
    }
  }

  function saveDeck() {
    // depends on how your backend saves decks (PUT /decks/:id or POST /decks)
    // leaving as a stub so you don’t accidentally call the wrong endpoint
    console.log("Save deck clicked:", { selectedDeckId, deckName });
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pb-16"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Logo (dashboard-style) */}
      <div className="flex justify-center pt-8">
        <img src={logo} alt="Pokemon Deck Builder" className="w-[min(720px,90vw)] h-auto" />
      </div>

      <div className="mx-auto w-[min(1200px,94vw)] pt-4">
        <h2 className="text-4xl font-extrabold text-black mb-4">DECK BUILDER</h2>

        {error && (
          <div className="mb-4 rounded-xl bg-red-100 text-red-900 px-4 py-3">
            {error}
          </div>
        )}

        {/* Header row (your framer-motion header) */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex flex-wrap gap-3 justify-between items-center"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/60 hover:bg-white transition-colors shadow"
              >
                <FaArrowLeft className="text-gray-700" />
              </motion.button>
            </Link>

            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              placeholder="Enter deck name..."
              className="text-2xl font-extrabold bg-white/0 border-b-2 border-dashed border-black/25 focus:border-black outline-none px-2 py-1"
            />

            <button
              type="button"
              onClick={() => setShowNewDeck(true)}
              className="px-4 py-2 rounded-xl bg-black text-white font-bold hover:opacity-90 shadow"
            >
              + New Deck
            </button>

            <div className="flex items-center gap-2">
              <span className="font-bold text-black">Deck:</span>
              <select
                className="rounded-xl px-3 py-2 bg-white/70 shadow"
                value={selectedDeckId}
                onChange={(e) => setSelectedDeckId(e.target.value)}
              >
                <option value="">Select a deck</option>
                {decks.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-xl px-3 py-2 bg-white/70 shadow"
            >
              <option value="">All Types</option>
              {uniqueTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            onClick={saveDeck}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <FaSave />
            <span>Save Deck</span>
          </motion.button>
        </motion.div>

        {/* Panels (your original layout, but with real data + dashboard vibe) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card Search Panel */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-extrabold mb-4 text-black">All Cards</h3>

            <div className="relative mb-4">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for Pokemon cards..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 bg-white/70 focus:bg-white outline-none transition-all"
              />
            </div>

            {busy === "loading" ? (
              <div className="text-black/70">Loading cards...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 min-h-[420px]">
                {filteredCards.length === 0 ? (
                  <div className="col-span-full flex items-center justify-center text-black/60">
                    <p>No cards match your filters.</p>
                  </div>
                ) : (
                  filteredCards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setActiveCard(card)}
                      className="rounded-xl bg-white/35 hover:bg-white/55 transition p-2 shadow"
                      title="Click for actions"
                    >
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-[190px] object-contain"
                      />
                      <div className="mt-1 text-sm font-bold truncate text-black">
                        {card.name}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </motion.div>

          {/* Deck Panel */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-extrabold text-black">Your Decks</h3>
              <span className="text-sm text-black/70">
                {decks.length} deck{decks.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {decks.length === 0 ? (
                <div className="text-black/70">No decks yet. Create one.</div>
              ) : (
                decks.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setSelectedDeckId(d.id);
                      setDeckName(d.name);
                    }}
                    className={`text-left px-3 py-2 rounded-xl transition ${
                      selectedDeckId === d.id
                        ? "bg-black text-white"
                        : "bg-white/55 hover:bg-white/70 text-black"
                    }`}
                  >
                    <div className="font-bold">{d.name}</div>
                    {typeof d.cardCount === "number" && (
                      <div className="text-xs opacity-80">{d.cardCount} cards</div>
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="mt-5 min-h-[220px] border-2 border-dashed border-black/15 rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-black/60">
                <FaPlus className="text-3xl mx-auto mb-2" />
                <p>Click a card to add it to a deck or collection</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Card Action Modal */}
      {activeCard && (
        <Modal title={activeCard.name} onClose={() => setActiveCard(null)}>
          <div className="flex gap-4">
            <img
              src={activeCard.imageUrl}
              alt={activeCard.name}
              className="w-[170px] h-[240px] object-contain rounded-xl bg-black/5 p-2"
            />
            <div className="flex-1">
              <div className="text-sm text-black/70">
                Choose what you want to do with this card.
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  disabled={busy === "addToDeck"}
                  onClick={() => addCardToDeck(activeCard.id)}
                  className="px-4 py-2 rounded-xl bg-black text-white font-bold disabled:opacity-60"
                >
                  Add to selected deck
                </button>

                <button
                  type="button"
                  disabled={busy === "addToCollection"}
                  onClick={() => addCardToCollection(activeCard.id)}
                  className="px-4 py-2 rounded-xl bg-white/80 font-bold hover:bg-white"
                >
                  Add to my collection
                </button>

                {!selectedDeckId && (
                  <div className="mt-2 text-xs text-red-700">
                    No deck selected — select or create a deck first.
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* New Deck Modal */}
      {showNewDeck && (
        <Modal title="Create New Deck" onClose={() => setShowNewDeck(false)}>
          <div className="flex flex-col gap-3">
            <input
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              placeholder="Deck name (e.g., Fire Aggro)"
              className="rounded-xl px-4 py-2 bg-black/5"
            />
            <button
              type="button"
              onClick={createDeck}
              disabled={busy === "createDeck"}
              className="px-4 py-2 rounded-xl bg-black text-white font-bold disabled:opacity-60"
            >
              Create
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeckBuilderPage;
