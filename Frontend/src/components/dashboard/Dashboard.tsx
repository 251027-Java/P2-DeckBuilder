import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa"; //

import bg from "../../assets/images/background.png";
import logo from "../../assets/logo.png";

import charizard from "../../assets/charizard.png";
import oddish from "../../assets/oddish.png";
import magikarp from "../../assets/magikarp.png";
import combusken from "../../assets/combusken.png";
import vulpix from "../../assets/vulpix.png";

import DeckStack from "../decks/DeckStack";
import { deckService } from "../../services/deckService";
import { Deck as DeckType } from "../../types/Deck";

/* ---------- Helper Functions ---------- */

function getCardImageUrl(cardId: string): string {
  const parts = cardId.split("-");
  if (parts.length >= 2) {
    const setId = parts[0];
    const cardNumber = parts.slice(1).join("-");
    return `https://images.pokemontcg.io/${setId}/${cardNumber}.png`;
  }
  return "";
}

/* ---------- Types ---------- */

type Card = {
  id: string;
  imageUrl: string;
};

type DeckDisplay = {
  deckId: number;
  name: string;
  cards: Card[];
};

/* ---------- Component ---------- */

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [decks, setDecks] = useState<DeckDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDecks();
  }, []);

  /* Mock deck data (fallback) */
  const mockDecks: DeckDisplay[] = [
    {
      deckId: 1,
      name: "MY DECK",
      cards: [
        { id: "charizard", imageUrl: charizard },
        { id: "vulpix", imageUrl: vulpix },
      ],
    },
    {
      deckId: 2,
      name: "DECK 2",
      cards: [
        { id: "oddish", imageUrl: oddish },
        { id: "magikarp", imageUrl: magikarp },
        { id: "combusken", imageUrl: combusken },
      ],
    },
  ];

  const loadDecks = async () => {
    try {
      const decksData = await deckService.getDecks();

      const displayDecks: DeckDisplay[] = await Promise.all(
        decksData.map(async (deck) => {
          try {
            const response = await fetch(
              `http://localhost:8080/deck-card/deck/${deck.deckId}`
            );

            if (response.ok) {
              const deckCards = await response.json();

              const cards: Card[] = deckCards.slice(0, 5).map((dc: any) => ({
                id: dc.cardId,
                imageUrl: getCardImageUrl(dc.cardId),
              }));

              return {
                deckId: deck.deckId,
                name: deck.name,
                cards,
              };
            }
          } catch (error) {
            console.error(
              `Failed to load cards for deck ${deck.deckId}:`,
              error
            );
          }

          return {
            deckId: deck.deckId,
            name: deck.name,
            cards: [],
          };
        })
      );

      setDecks(displayDecks);
    } catch (error) {
      console.error("Failed to load decks:", error);
      setDecks(mockDecks);
    } finally {
      setLoading(false);
    }
  };

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
        {/* ---------- DECKS ---------- */}
        <section className="mt-6">
          {/* header row with + button */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-extrabold text-black">DECKS</h2>

            <button
              type="button"
              onClick={() => navigate("/decks/new")}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white shadow-lg hover:scale-105 transition"
              aria-label="Create new deck"
              title="Create new deck"
            >
              <FaPlus />
            </button>
          </div>

          <div className="flex gap-12 flex-wrap">
            {loading ? (
              <div className="text-gray-600">Loading decks...</div>
            ) : decks.length === 0 ? (
              <div className="text-gray-600">
                No decks yet. Create your first deck!
              </div>
            ) : (
              decks.map((deck) => (
                <DeckStack
                  key={deck.deckId}
                  images={
                    deck.cards.length > 0
                      ? deck.cards.map((c) => c.imageUrl)
                      : [magikarp]
                  }
                  label={deck.name}
                  onClick={() => navigate(`/decks/${deck.deckId}`)}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
