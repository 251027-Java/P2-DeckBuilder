import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaPlus, FaTrash } from "react-icons/fa";

import bg from "../assets/images/background.png";
import logo from "../assets/logo.png";
import { deckService } from "../services/deckService";

// Helper function to generate image URL from card ID
// Card IDs are like "base1-1", image URLs are like "https://images.pokemontcg.io/base1/1.png"
function getCardImageUrl(cardId: string): string {
  const parts = cardId.split('-');
  if (parts.length >= 2) {
    const setId = parts[0];
    const cardNumber = parts.slice(1).join('-'); // Handle IDs like "base1-1-alt"
    return `https://images.pokemontcg.io/${setId}/${cardNumber}.png`;
  }
  // Fallback if ID format is unexpected
  return '';
}

type Card = {
  id: string;
  name: string;
  rarity: string;
  cardType: string; // Backend returns 'cardType'
  setId: string;
  setName?: string; // Set name from backend
  imageUrl?: string; // generate this on frontend
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
  // Get deckId from URL params
  const { deckId } = useParams<{ deckId?: string }>();
  
  // --- UI state (from your version) ---
  const [deckName, setDeckName] = useState("");

  // --- data state (from my first version) ---
  const [cards, setCards] = useState<Card[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string>("");
  
  // Cards currently in the selected deck
  const [deckCards, setDeckCards] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 24;

  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  const [showNewDeck, setShowNewDeck] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");

  // Confirmation modals
  const [showDeleteDeckConfirm, setShowDeleteDeckConfirm] = useState(false);
  const [cardToRemove, setCardToRemove] = useState<{cardId: string, cardName: string, currentQuantity: number} | null>(null);
  const [quantityToRemove, setQuantityToRemove] = useState(1);

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const navigate = useNavigate();

  // --- load cards & decks ---
  useEffect(() => {
    (async () => {
      setBusy("loading");
      setError(null);
      try {
        const [cardsRes, decksData, setsRes] = await Promise.all([
          fetch(`http://localhost:8081/card`),
          deckService.getDecks(),
          fetch(`http://localhost:8081/set`),
        ]);

        if (!cardsRes.ok) throw new Error(`Cards failed: ${cardsRes.status}`);
        if (!setsRes.ok) throw new Error(`Sets failed: ${setsRes.status}`);

        const cardsData: Card[] = await cardsRes.json();
        const setsData: any[] = await setsRes.json();
        
        // Create a map of setId -> setName for quick lookup
        const setMap = new Map(setsData.map(set => [set.id, set.name]));
        
        // Add imageUrl and setName to each card
        const cardsWithImages = cardsData.map(card => ({
          ...card,
          imageUrl: getCardImageUrl(card.id),
          setName: setMap.get(card.setId) || card.setId, // Fallback to setId if name not found
        }));

        setCards(cardsWithImages);
        
        // Convert backend deck format to local format
        const localDecks: Deck[] = decksData.map(d => ({
          id: String(d.deckId),
          name: d.name,
          cardCount: 0 // TODO: load actual card count
        }));
        setDecks(localDecks);

        // If we have a deckId from URL params, load that deck
        if (deckId) {
          const foundDeck = localDecks.find(d => d.id === deckId);
          if (foundDeck) {
            setSelectedDeckId(deckId);
            setDeckName(foundDeck.name);
          }
        } else if (localDecks.length > 0) {
          // Otherwise, default select first deck (optional)
          setSelectedDeckId(localDecks[0].id);
          setDeckName(localDecks[0].name);
        }
      } catch (e: any) {
        setError(e?.message ?? "Load failed");
      } finally {
        setBusy(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId]);

  // Load deck cards when selected deck changes
  useEffect(() => {
    if (!selectedDeckId) {
      setDeckCards([]);
      return;
    }
    
    (async () => {
      try {
        const response = await fetch(`http://localhost:8081/deck-card/deck/${selectedDeckId}`);
        if (response.ok) {
          const cards = await response.json();
          setDeckCards(cards);
        } else {
          setDeckCards([]);
        }
      } catch (e) {
        console.error("Failed to load deck cards:", e);
        setDeckCards([]);
      }
    })();
  }, [selectedDeckId]);

  // --- filtering ---
  const uniqueTypes = useMemo(() => {
    const s = new Set(cards.map((c) => c.cardType).filter(Boolean) as string[]);
    return Array.from(s).sort();
  }, [cards]);

  const filteredCards = useMemo(() => {
    const s = search.trim().toLowerCase();
    return cards.filter((c) => {
      const matchesSearch = !s || c.name.toLowerCase().includes(s);
      const matchesType = !typeFilter || c.cardType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [cards, search, typeFilter]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, typeFilter]);

  // Paginated cards
  const paginatedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;
    return filteredCards.slice(startIndex, endIndex);
  }, [filteredCards, currentPage]);

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);

  // Calculate deck statistics
  const deckStats = useMemo(() => {
    const stats = {
      total: 0,
      pokemon: 0,
      trainer: 0,
      energy: 0,
      supporter: 0,
      item: 0,
      stadium: 0
    };

    deckCards.forEach(deckCard => {
      const quantity = deckCard.quantity || 1;
      stats.total += quantity;

      const cardType = deckCard.cardType?.toLowerCase() || '';
      
      if (cardType.includes('pokémon') || cardType.includes('pokemon')) {
        stats.pokemon += quantity;
      } else if (cardType.includes('energy')) {
        stats.energy += quantity;
      } else if (cardType.includes('supporter')) {
        stats.supporter += quantity;
      } else if (cardType.includes('item')) {
        stats.item += quantity;
      } else if (cardType.includes('stadium')) {
        stats.stadium += quantity;
      } else if (cardType.includes('trainer')) {
        stats.trainer += quantity;
      }
    });

    return stats;
  }, [deckCards]);

  // --- actions ---
  async function createDeck() {
    if (!newDeckName.trim()) return;
    setBusy("createDeck");
    setError(null);
    try {
      const created = await deckService.createDeck(newDeckName.trim(), "");
      
      // Convert to local format
      const localDeck: Deck = {
        id: String(created.deckId),
        name: created.name,
        cardCount: 0
      };
      
      setDecks((prev) => [localDeck, ...prev]);
      setSelectedDeckId(localDeck.id);
      setDeckName(localDeck.name);
      setNewDeckName("");
      setShowNewDeck(false);
    } catch (e: any) {
      setError(e?.message ?? "Failed to create deck");
    } finally {
      setBusy(null);
    }
  }

  async function addCardToDeck(cardId: string, quantity: number) {
    if (!selectedDeckId) {
      setError("Select a deck first (or create one).");
      return;
    }

    // Check if adding this quantity would exceed 4 copies
    const existingCard = deckCards.find(dc => dc.cardId === cardId);
    const currentQuantity = existingCard?.quantity || 0;
    const newTotal = currentQuantity + quantity;
    
    if (newTotal > 4) {
      setError(`Cannot add ${quantity} copies. Maximum of 4 per card. Currently have ${currentQuantity}.`);
      setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
      return;
    }

    setBusy("addToDeck");
    setError(null);
    try {
      // Backend expects: POST /deck-card?deckId={deckId}&cardId={cardId}&quantity={quantity}
      const response = await fetch(
        `http://localhost:8081/deck-card?deckId=${selectedDeckId}&cardId=${cardId}&quantity=${quantity}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      
      if (!response.ok) throw new Error(`Add to deck failed: ${response.status}`);
      
      setActiveCard(null);
      setQuantityToAdd(1); // Reset quantity
      
      // Reload deck cards to show the newly added card
      const deckResponse = await fetch(`http://localhost:8081/deck-card/deck/${selectedDeckId}`);
      if (deckResponse.ok) {
        const cards = await deckResponse.json();
        setDeckCards(cards);
      }
    } catch (e: any) {
      setError(e?.message ?? "Failed to add to deck");
    } finally {
      setBusy(null);
    }
  }

  async function incrementCardInDeck(cardId: string, cardName: string, currentQuantity: number) {
    if (!selectedDeckId) {
      setError("Select a deck first");
      return;
    }

    if (currentQuantity >= 4) {
      setError(`Cannot add more copies of ${cardName}. Maximum of 4 copies reached.`);
      return;
    }

    setBusy("addToDeck");
    setError(null);
    try {
      const newQuantity = currentQuantity + 1;
      
      const deckResponse = await fetch(
        `http://localhost:8081/deck-card?deckId=${selectedDeckId}&cardId=${cardId}&quantity=${newQuantity}`,
        { method: 'POST' }
      );
      
      if (deckResponse.ok) {
        // Reload deck cards to reflect the change
        const cardsResponse = await fetch(`http://localhost:8081/deck-card/deck/${selectedDeckId}`);
        if (!cardsResponse.ok) throw new Error('Failed to reload deck');
        const cards = await cardsResponse.json();
        setDeckCards(cards);
      }
    } catch (e: any) {
      setError(e?.message ?? "Failed to add card to deck");
    } finally {
      setBusy(null);
    }
  }

  async function saveDeck() {
    // Note: Backend doesn't have an update endpoint yet
    // For now, just show a message
    if (!selectedDeckId) {
      setError("Please select a deck first");
      return;
    }
    
    if (!deckName.trim()) {
      setError("Deck name cannot be empty");
      return;
    }

    // Show message that changes are auto-saved (or need backend implementation)
    const messageDiv = document.createElement('div');
    messageDiv.className = 'fixed top-20 right-4 bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg z-50';
    messageDiv.textContent = 'ℹ️ Deck changes are automatically tracked';
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
  }

  async function deleteDeck() {
    if (!selectedDeckId) {
      setError("Please select a deck to delete");
      return;
    }

    setShowDeleteDeckConfirm(true);
  }

  async function confirmDeleteDeck() {
    if (!selectedDeckId) return;

    setBusy("deleteDeck");
    setError(null);
    setShowDeleteDeckConfirm(false);

    try {
      await deckService.deleteDeck(Number(selectedDeckId));
      
      // Remove from local state
      setDecks(prev => prev.filter(d => d.id !== selectedDeckId));
      setSelectedDeckId("");
      setDeckName("");
      setDeckCards([]);

      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50';
      successDiv.textContent = '✓ Deck deleted successfully!';
      document.body.appendChild(successDiv);
      setTimeout(() => successDiv.remove(), 3000);
    } catch (e: any) {
      setError(e?.message ?? "Failed to delete deck");
    } finally {
      setBusy(null);
    }
  }

  function removeCardFromDeck(cardId: string) {
    const card = deckCards.find(dc => dc.cardId === cardId);
    if (!card) return;
    
    setCardToRemove({
      cardId: cardId,
      cardName: card.cardName,
      currentQuantity: card.quantity
    });
    setQuantityToRemove(card.quantity === 1 ? 1 : 1); // Default to 1
  }

  async function confirmRemoveCard() {
    if (!cardToRemove || !selectedDeckId) return;
    
    setBusy("removeCard");
    setError(null);

    try {
      const newQuantity = cardToRemove.currentQuantity - quantityToRemove;
      
      if (newQuantity <= 0) {
        // Remove the card entirely
        const response = await fetch(`http://localhost:8081/deck-card?deckId=${selectedDeckId}&cardId=${cardToRemove.cardId}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to remove card: ${response.status} - ${errorText}`);
        }
      } else {
        // Update the quantity
        const response = await fetch(
          `http://localhost:8081/deck-card?deckId=${selectedDeckId}&cardId=${cardToRemove.cardId}&quantity=${newQuantity}`,
          { method: 'POST' }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to update card quantity: ${response.status} - ${errorText}`);
        }
      }
      
      // Reload deck cards
      const cardsResponse = await fetch(`http://localhost:8081/deck-card/deck/${selectedDeckId}`);
      if (!cardsResponse.ok) throw new Error('Failed to reload deck');
      const cards = await cardsResponse.json();
      setDeckCards(cards);

      // Close modal and reset
      setCardToRemove(null);
      setQuantityToRemove(1);
    } catch (e: any) {
      setError(e?.message ?? "Failed to remove card");
    } finally {
      setBusy(null);
    }
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

        {/* Header row */}
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

            {selectedDeckId ? (
              <div className="text-2xl font-extrabold text-black px-2 py-1">
                {deckName}
              </div>
            ) : (
              <div className="text-2xl font-extrabold text-black/50 px-2 py-1">
                Select or create a deck
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={deleteDeck}
              disabled={!selectedDeckId || busy === "deleteDeck"}
              whileHover={{ scale: selectedDeckId ? 1.03 : 1 }}
              whileTap={{ scale: selectedDeckId ? 0.97 : 1 }}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold shadow-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTrash />
              <span>{busy === "deleteDeck" ? "Deleting..." : "Delete Deck"}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Your Decks Section - Moved to Top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-extrabold text-black">Your Decks</h3>
            <button
              type="button"
              onClick={() => setShowNewDeck(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white font-bold hover:opacity-90 shadow transition"
            >
              <FaPlus className="text-sm" />
              New Deck
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {decks.length === 0 ? (
              <div className="col-span-full text-center text-black/70 py-8">
                No decks yet. Click "New Deck" to create one.
              </div>
            ) : (
              decks.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setSelectedDeckId(d.id);
                    setDeckName(d.name);
                    navigate(`/decks/${d.id}`);
                  }}
                  className={`text-left px-4 py-3 rounded-xl transition-all shadow ${
                    selectedDeckId === d.id
                      ? "bg-black text-white ring-2 ring-black scale-105"
                      : "bg-white/70 hover:bg-white hover:shadow-lg text-black"
                  }`}
                >
                  <div className="font-bold truncate">{d.name}</div>
                  <div className="text-xs opacity-80 mt-1">
                    {selectedDeckId === d.id ? `${deckCards.length} cards` : 'Click to edit'}
                  </div>
                </button>
              ))
            )}
          </div>
        </motion.div>

        {/* Deck Contents Section - Moved to Top */}
        {selectedDeckId && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-extrabold text-black">Cards in Deck</h3>
              <span className="text-sm text-black/70">
                {deckCards.length} card{deckCards.length === 1 ? "" : "s"}
              </span>
            </div>

            {/* Deck Statistics */}
            {deckCards.length > 0 && (
              <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-md">
                  <span className="text-base font-medium text-gray-600 mb-2">Total Cards</span>
                  <span className="text-4xl font-bold text-blue-600">{deckStats.total}</span>
                </div>
                {deckStats.pokemon > 0 && (
                  <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-md">
                    <span className="text-base font-medium text-gray-600 mb-2">Pokémon</span>
                    <span className="text-4xl font-bold text-red-500">{deckStats.pokemon}</span>
                  </div>
                )}
                {deckStats.trainer > 0 && (
                  <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-md">
                    <span className="text-base font-medium text-gray-600 mb-2">Trainers</span>
                    <span className="text-4xl font-bold text-amber-500">{deckStats.trainer}</span>
                  </div>
                )}
                {deckStats.supporter > 0 && (
                  <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-md">
                    <span className="text-base font-medium text-gray-600 mb-2">Supporter</span>
                    <span className="text-4xl font-bold text-green-500">{deckStats.supporter}</span>
                  </div>
                )}
                {deckStats.item > 0 && (
                  <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-md">
                    <span className="text-base font-medium text-gray-600 mb-2">Item</span>
                    <span className="text-4xl font-bold text-purple-500">{deckStats.item}</span>
                  </div>
                )}
                {deckStats.energy > 0 && (
                  <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-md">
                    <span className="text-base font-medium text-gray-600 mb-2">Energy</span>
                    <span className="text-4xl font-bold text-black">{deckStats.energy}</span>
                  </div>
                )}
                {deckStats.stadium > 0 && (
                  <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-md">
                    <span className="text-base font-medium text-gray-600 mb-2">Stadium</span>
                    <span className="text-4xl font-bold text-orange-500">{deckStats.stadium}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="max-h-[300px] overflow-y-auto border-2 border-dashed border-black/15 rounded-xl p-3">
              {deckCards.length === 0 ? (
                <div className="text-center text-black/60 py-8">
                  <FaPlus className="text-3xl mx-auto mb-2" />
                  <p>No cards in this deck yet</p>
                  <p className="text-xs mt-1">Search and click cards below to add them</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {deckCards.map((deckCard, idx) => (
                    <div
                      key={`${deckCard.cardId}-${idx}`}
                      className="group relative bg-white/40 rounded-lg hover:bg-white/60 transition p-2"
                    >
                      <img
                        src={getCardImageUrl(deckCard.cardId)}
                        alt={deckCard.cardName}
                        className="w-full h-32 object-contain rounded"
                      />
                      <div className="mt-1">
                        <div className="font-semibold text-xs truncate text-black">
                          {deckCard.cardName}
                        </div>
                        <div className="text-xs text-black/60 truncate">
                          {deckCard.cardType}
                        </div>
                      </div>
                      <div className="absolute top-1 right-1 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded">
                        x{deckCard.quantity}
                      </div>
                      
                      {/* Add button */}
                      {deckCard.quantity < 4 && (
                        <button
                          onClick={() => incrementCardInDeck(deckCard.cardId, deckCard.cardName, deckCard.quantity)}
                          disabled={busy === "addToDeck"}
                          className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                          title="Add one more copy"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      )}
                      
                      {/* Remove button */}
                      <button
                        onClick={() => removeCardFromDeck(deckCard.cardId)}
                        disabled={busy === "removeCard"}
                        className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                        title="Remove from deck"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Panels (card search) */}
        <div className="w-full">
          {/* Card Search Panel */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg"
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
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[420px]">
                  {paginatedCards.length === 0 ? (
                    <div className="col-span-full flex items-center justify-center text-black/60">
                      <p>No cards match your filters.</p>
                    </div>
                  ) : (
                    paginatedCards.map((card) => (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => {
                          setActiveCard(card);
                          setQuantityToAdd(1); // Reset quantity when opening modal
                        }}
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

                {/* Pagination Controls */}
                {filteredCards.length > CARDS_PER_PAGE && (
                  <div className="mt-4 flex items-center justify-end">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-black text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-black font-semibold">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-black text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Card Action Modal */}
      {activeCard && (() => {
        const existingCard = deckCards.find(dc => dc.cardId === activeCard.id);
        const currentQuantity = existingCard?.quantity || 0;
        const isAtLimit = currentQuantity >= 4;
        
        return (
          <Modal title={activeCard.name} onClose={() => setActiveCard(null)}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Card Image */}
              <div className="flex-shrink-0">
                <img
                  src={activeCard.imageUrl}
                  alt={activeCard.name}
                  className="w-full md:w-[220px] h-auto object-contain rounded-xl shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 p-3"
                />
              </div>

              {/* Card Details & Actions */}
              <div className="flex-1 flex flex-col">
                {/* Card Info Section */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-black">{activeCard.cardType}</h3>
                      <p className="text-sm text-gray-600">{activeCard.rarity}</p>
                    </div>
                    <div className="flex items-center justify-center text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      <span>Set: {activeCard.setName || activeCard.setId}</span>
                    </div>
                  </div>
                  
                  {currentQuantity > 0 && (
                    <div className="mt-3 p-3 rounded-lg bg-blue-50 border-l-4 border-blue-500">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">In Your Deck</span>
                        <span className="text-lg font-bold text-blue-700">{currentQuantity} / 4</span>
                      </div>
                      <div className="mt-1 w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentQuantity / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Section */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Add to Deck</h4>
                    
                    {/* Quantity Selector */}
                    <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Select Quantity</label>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md">
                          Available: <span className="font-bold text-gray-700">{4 - currentQuantity}</span>
                        </span>
                      </div>
                      <select
                        value={quantityToAdd}
                        onChange={(e) => setQuantityToAdd(Number(e.target.value))}
                        disabled={isAtLimit}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        {[1, 2, 3, 4].map(num => {
                          const willExceed = currentQuantity + num > 4;
                          return (
                            <option 
                              key={num} 
                              value={num}
                              disabled={willExceed}
                            >
                              {num} {willExceed ? `(exceeds limit)` : num === 1 ? 'copy' : 'copies'}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Add Button */}
                  <button
                    type="button"
                    disabled={busy === "addToDeck" || !selectedDeckId || isAtLimit || (currentQuantity + quantityToAdd > 4)}
                    onClick={() => addCardToDeck(activeCard.id, quantityToAdd)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-black text-white font-bold text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    <FaPlus className="text-base" />
                    {busy === "addToDeck" ? "Adding..." : isAtLimit ? "Maximum Reached" : `Add ${quantityToAdd} ${quantityToAdd === 1 ? 'Copy' : 'Copies'}`}
                  </button>

                  {/* Warning Messages */}
                  {isAtLimit && (
                    <div className="mt-3 p-3 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-800 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-lg">⚠</span>
                        <span className="font-medium">Maximum limit reached. You already have 4 copies of this card in your deck.</span>
                      </div>
                    </div>
                  )}

                  {!selectedDeckId && (
                    <div className="mt-3 p-3 rounded-lg bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-lg">ℹ</span>
                        <span className="font-medium">Please select or create a deck first before adding cards.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        );
      })()}

      {/* New Deck Modal */}
      {showNewDeck && (
        <Modal title="Create New Deck" onClose={() => {
          setShowNewDeck(false);
          setNewDeckName("");
        }}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Deck Name
              </label>
              <input
                value={newDeckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newDeckName.trim()) {
                    createDeck();
                  }
                }}
                placeholder="Enter a name for your deck..."
                className="w-full rounded-xl px-4 py-3 border-2 border-gray-200 focus:border-black outline-none transition-all"
                autoFocus
              />
            </div>
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={createDeck}
                disabled={busy === "createDeck" || !newDeckName.trim()}
                className="flex-1 px-4 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {busy === "createDeck" ? "Creating..." : "Create Deck"}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setShowNewDeck(false);
                  setNewDeckName("");
                }}
                className="px-4 py-3 rounded-xl bg-gray-200 text-black font-bold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Deck Confirmation Modal */}
      {showDeleteDeckConfirm && (
        <Modal title="Delete Deck" onClose={() => setShowDeleteDeckConfirm(false)}>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-gray-600">
                Are you sure you want to delete <span className="font-bold">"{deckName}"</span>?
              </p>
              <p className="text-sm text-red-600 mt-2">This action cannot be undone.</p>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteDeckConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-200 text-black font-bold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={confirmDeleteDeck}
                disabled={busy === "deleteDeck"}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {busy === "deleteDeck" ? "Deleting..." : "Delete Deck"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Remove Card Confirmation Modal */}
      {cardToRemove && (
        <Modal title="Remove Card" onClose={() => {
          setCardToRemove(null);
          setQuantityToRemove(1);
        }}>
          <div className="space-y-6">
            <div>
              <p className="text-gray-600">
                How many copies of <span className="font-bold">{cardToRemove.cardName}</span> would you like to remove?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Currently in deck: {cardToRemove.currentQuantity} {cardToRemove.currentQuantity === 1 ? 'copy' : 'copies'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Quantity to Remove
              </label>
              <select
                value={quantityToRemove}
                onChange={(e) => setQuantityToRemove(Number(e.target.value))}
                className="w-full rounded-xl px-4 py-3 border-2 border-gray-200 focus:border-black outline-none transition-all"
              >
                {Array.from({ length: cardToRemove.currentQuantity }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'copy' : 'copies'}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setCardToRemove(null);
                  setQuantityToRemove(1);
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-200 text-black font-bold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={confirmRemoveCard}
                disabled={busy === "removeCard"}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {busy === "removeCard" ? "Removing..." : "Remove Card"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DeckBuilderPage;
