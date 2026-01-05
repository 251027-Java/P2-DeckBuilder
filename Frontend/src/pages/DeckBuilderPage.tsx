import React, { useEffect, useMemo, useState } from "react";
import bg from "../assets/bg.png";
import logo from "../assets/logo.png";

// If you already made apiGet, use it. Otherwise use fetch directly.
// import { apiGet } from "../api/client";

type Card = {
  id: string;
  name: string;
  imageUrl: string; // backend should return a full URL or a /public path
  type?: string;
  rarity?: string;
};

type Deck = {
  id: string;
  name: string;
  cardCount?: number;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-extrabold tracking-tight text-black mb-4">
      {children}
    </h2>
  );
}

function CardTile({
  card,
  onClick,
}: {
  card: Card;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[190px] h-[270px] rounded-xl bg-white/20 shadow-lg p-3 flex items-center justify-center hover:scale-[1.02] transition"
      title={card.name}
    >
      <img
        src={card.imageUrl}
        alt={card.name}
        className="w-full h-full object-contain rounded-lg"
      />
    </button>
  );
}

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
      {/* overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close modal"
      />
      {/* modal */}
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

export default function DeckBuilderPage() {

  //allows for dynamic changes
  const [cards, setCards] = useState<Card[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string>("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [showNewDeck, setShowNewDeck] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");

  const [error, setError] = useState<string | null>(null);  //error
  const [busy, setBusy] = useState<string | null>(null); //loading


  async function loadAll() {
    setBusy("loading");
    setError(null);
    try {
      const [cardsRes, decksRes] = await Promise.all([
        fetch("http://localhost:8080/api/cards"),
        fetch("http://localhost:8080/api/decks"),
      ]);

      if (!cardsRes.ok) throw new Error(`Cards failed: ${cardsRes.status}`);
      if (!decksRes.ok) throw new Error(`Decks failed: ${decksRes.status}`);

      const cardsData: Card[] = await cardsRes.json();
      const decksData: Deck[] = await decksRes.json();

      setCards(cardsData);
      setDecks(decksData);
      if (!selectedDeckId && decksData.length > 0) setSelectedDeckId(decksData[0].id);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load data");
    } finally {
      setBusy(null);
    }
  }

  async function createDeck() {
    if (!newDeckName.trim()) return;
    setBusy("createDeck");
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/api/decks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newDeckName.trim() }),
      });
      if (!res.ok) throw new Error(`Create deck failed: ${res.status}`);

      const created: Deck = await res.json();
      setDecks((prev) => [created, ...prev]);
      setSelectedDeckId(created.id);
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
      const res = await fetch(
        `http://localhost:8080/api/decks/${selectedDeckId}/cards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cardId }),
        }
      );
      if (!res.ok) throw new Error(`Add to deck failed: ${res.status}`);
      // optionally refresh deck count here
    } catch (e: any) {
      setError(e?.message ?? "Failed to add to deck");
    } finally {
      setBusy(null);
      setActiveCard(null);
    }
  }

  async function addCardToCollection(cardId: string) {
    setBusy("addToCollection");
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/collection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId }),
      });
      if (!res.ok) throw new Error(`Add to collection failed: ${res.status}`);
    } catch (e: any) {
      setError(e?.message ?? "Failed to add to collection");
    } finally {
      setBusy(null);
      setActiveCard(null);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCards = useMemo(() => {
    const s = search.trim().toLowerCase();
    return cards.filter((c) => {
      const matchesSearch = !s || c.name.toLowerCase().includes(s);
      const matchesType = !typeFilter || (c.type ?? "") === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [cards, search, typeFilter]);

  const uniqueTypes = useMemo(() => {
    const set = new Set(cards.map((c) => c.type).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [cards]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pb-16"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* top logo */}
      <div className="flex justify-center pt-8">
        <img src={logo} alt="Pokémon" className="w-[min(520px,80vw)] h-auto" />
      </div>

      <div className="mx-auto w-[min(1200px,94vw)] pt-6">
        <SectionTitle>DECK BUILDER</SectionTitle>

        {error && (
          <div className="mb-4 rounded-xl bg-red-100 text-red-900 px-4 py-3">
            {error}
          </div>
        )}

        {/* Controls row */}
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <button
            type="button"
            onClick={() => setShowNewDeck(true)}
            className="px-4 py-2 rounded-xl bg-black text-white font-bold hover:opacity-90"
          >
            + New Deck
          </button>

          <div className="flex items-center gap-2">
            <span className="font-bold text-black">Deck:</span>
            <select
              className="rounded-xl px-3 py-2 bg-white/70"
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

          <div className="flex-1 min-w-[240px]" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cards..."
            className="w-[min(360px,90vw)] rounded-xl px-4 py-2 bg-white/70"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl px-3 py-2 bg-white/70"
          >
            <option value="">All Types</option>
            {uniqueTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Main layout: left deck list + right gallery */}
        <div className="flex gap-6 flex-wrap">
          {/* Left panel */}
          <div className="w-[min(320px,94vw)] rounded-2xl bg-white/25 shadow-lg p-4">
            <div className="font-extrabold text-lg text-black">Your Decks</div>
            <div className="mt-3 flex flex-col gap-2">
              {decks.length === 0 ? (
                <div className="text-black/70">No decks yet. Create one.</div>
              ) : (
                decks.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDeckId(d.id)}
                    className={`text-left px-3 py-2 rounded-xl ${
                      selectedDeckId === d.id
                        ? "bg-black text-white"
                        : "bg-white/60 hover:bg-white/75"
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

            <div className="mt-5 text-xs text-black/70">
              Tip: click a card to add it to your deck or collection.
            </div>
          </div>

          {/* Right panel: Card gallery */}
          <div className="flex-1 min-w-[320px]">
            <div className="rounded-2xl bg-white/18 shadow-lg p-4">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <div className="font-extrabold text-lg text-black">
                  All Cards
                </div>
                {busy === "loading" && (
                  <div className="text-black/70">Loading...</div>
                )}
              </div>

              <div className="flex gap-4 flex-wrap">
                {filteredCards.map((card) => (
                  <CardTile
                    key={card.id}
                    card={card}
                    onClick={() => setActiveCard(card)}
                  />
                ))}
              </div>

              {filteredCards.length === 0 && (
                <div className="mt-4 text-black/70">No cards match your filters.</div>
              )}
            </div>
          </div>
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
              </div>

              {!selectedDeckId && (
                <div className="mt-3 text-xs text-red-700">
                  No deck selected — create or select one to add cards to a deck.
                </div>
              )}
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
}
