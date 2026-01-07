--
-- PostgreSQL database dump
--

\restrict JvTDv8iTO3cfLrkS6rjapQXbyq4ppscfvC0kyA4WlJKcX5YPfaLQrbyVZMZHes8

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg13+1)
-- Dumped by pg_dump version 16.10 (Debian 16.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.deck_cards DROP CONSTRAINT IF EXISTS deck_cards_deck_id_fkey;
ALTER TABLE IF EXISTS ONLY public.deck_cards DROP CONSTRAINT IF EXISTS deck_cards_card_id_fkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS ukr43af9ap4edm43mmtq01oddj6;
ALTER TABLE IF EXISTS ONLY public.sets DROP CONSTRAINT IF EXISTS sets_pkey;
ALTER TABLE IF EXISTS ONLY public.decks DROP CONSTRAINT IF EXISTS decks_pkey;
ALTER TABLE IF EXISTS ONLY public.decks DROP CONSTRAINT IF EXISTS decks_name_key;
ALTER TABLE IF EXISTS ONLY public.deck_cards DROP CONSTRAINT IF EXISTS deck_cards_pkey;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_pkey;
ALTER TABLE IF EXISTS public.decks ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_seq;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.sets;
DROP SEQUENCE IF EXISTS public.decks_id_seq;
DROP TABLE IF EXISTS public.decks;
DROP TABLE IF EXISTS public.deck_cards;
DROP TABLE IF EXISTS public.cards;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cards (
    id character varying(255) NOT NULL,
    card_type character varying(255),
    name character varying(255),
    rarity character varying(255),
    set_id character varying(255)
);


ALTER TABLE public.cards OWNER TO postgres;

--
-- Name: deck_cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deck_cards (
    deck_id integer NOT NULL,
    card_id character varying NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT deck_cards_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.deck_cards OWNER TO postgres;

--
-- Name: decks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.decks (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.decks OWNER TO postgres;

--
-- Name: decks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.decks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.decks_id_seq OWNER TO postgres;

--
-- Name: decks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.decks_id_seq OWNED BY public.decks.id;


--
-- Name: sets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sets (
    id character varying(255) NOT NULL,
    name character varying(255),
    release_year integer
);


ALTER TABLE public.sets OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_seq OWNER TO postgres;

--
-- Name: decks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decks ALTER COLUMN id SET DEFAULT nextval('public.decks_id_seq'::regclass);


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cards (id, card_type, name, rarity, set_id) FROM stdin;
sv8pt5-3	Pokémon	Pinsir	Common	sv8pt5
sv8pt5-2	Pokémon	Exeggutor	Uncommon	sv8pt5
sv8pt5-1	Pokémon	Exeggcute	Common	sv8pt5
sv8pt5-6	Pokémon	Leafeon ex	Double Rare	sv8pt5
sv8pt5-8	Pokémon	Whimsicott	Rare	sv8pt5
sv8pt5-9	Pokémon	Applin	Common	sv8pt5
sv8pt5-4	Pokémon	Budew	Common	sv8pt5
sv8pt5-5	Pokémon	Leafeon	Rare	sv8pt5
sv8pt5-7	Pokémon	Cottonee	Common	sv8pt5
sv8pt5-13	Pokémon	Flareon	Rare	sv8pt5
sv8pt5-11	Pokémon	Hydrapple ex	Double Rare	sv8pt5
sv8pt5-14	Pokémon	Flareon ex	Double Rare	sv8pt5
sv8pt5-10	Pokémon	Dipplin	Uncommon	sv8pt5
sv8pt5-12	Pokémon	Teal Mask Ogerpon ex	Double Rare	sv8pt5
sv8pt5-22	Pokémon	Vaporeon	Rare	sv8pt5
sv8pt5-23	Pokémon	Vaporeon ex	Double Rare	sv8pt5
sv8pt5-25	Pokémon	Glaceon	Rare	sv8pt5
sv8pt5-31	Pokémon	Iron Hands ex	Double Rare	sv8pt5
sv8pt5-32	Pokémon	Iron Thorns ex	Double Rare	sv8pt5
sv8pt5-33	Pokémon	Espeon	Rare	sv8pt5
sv8pt5-35	Pokémon	Duskull	Common	sv8pt5
sv8pt5-15	Pokémon	Litleo	Common	sv8pt5
sv8pt5-21	Pokémon	Seaking	Uncommon	sv8pt5
sv8pt5-30	Pokémon	Jolteon ex	Double Rare	sv8pt5
sv8pt5-18	Pokémon	Slowpoke	Common	sv8pt5
sv8pt5-24	Pokémon	Suicune	Uncommon	sv8pt5
sv8pt5-26	Pokémon	Glaceon ex	Double Rare	sv8pt5
sv8pt5-28	Pokémon	Pikachu ex	Double Rare	sv8pt5
sv8pt5-16	Pokémon	Pyroar	Uncommon	sv8pt5
sv8pt5-17	Pokémon	Hearthflame Mask Ogerpon ex	Double Rare	sv8pt5
sv8pt5-19	Pokémon	Slowking	Uncommon	sv8pt5
sv8pt5-20	Pokémon	Goldeen	Common	sv8pt5
sv8pt5-27	Pokémon	Wellspring Mask Ogerpon ex	Double Rare	sv8pt5
sv8pt5-29	Pokémon	Jolteon	Rare	sv8pt5
sv8pt5-34	Pokémon	Espeon ex	Double Rare	sv8pt5
sv8pt5-36	Pokémon	Dusclops	Common	sv8pt5
sv8pt5-38	Pokémon	Spritzee	Common	sv8pt5
sv8pt5-45	Pokémon	Fezandipiti	Rare	sv8pt5
sv8pt5-46	Pokémon	Iron Boulder	Rare	sv8pt5
sv8pt5-39	Pokémon	Aromatisse	Common	sv8pt5
sv8pt5-42	Pokémon	Scream Tail	Uncommon	sv8pt5
sv8pt5-43	Pokémon	Flutter Mane	Rare	sv8pt5
sv8pt5-41	Pokémon	Sylveon ex	Double Rare	sv8pt5
sv8pt5-37	Pokémon	Dusknoir	Rare	sv8pt5
sv8pt5-40	Pokémon	Sylveon	Rare	sv8pt5
sv8pt5-44	Pokémon	Munkidori	Rare	sv8pt5
sv8pt5-49	Pokémon	Groudon	Rare	sv8pt5
sv8pt5-50	Pokémon	Riolu	Common	sv8pt5
sv8pt5-47	Pokémon	Larvitar	Common	sv8pt5
sv8pt5-48	Pokémon	Pupitar	Common	sv8pt5
sv8pt5-56	Pokémon	Sandy Shocks ex	Double Rare	sv8pt5
sv8pt5-59	Pokémon	Umbreon	Rare	sv8pt5
sv8pt5-51	Pokémon	Lucario ex	Double Rare	sv8pt5
sv8pt5-52	Pokémon	Hippopotas	Common	sv8pt5
sv8pt5-57	Pokémon	Okidogi	Rare	sv8pt5
sv8pt5-54	Pokémon	Bloodmoon Ursaluna	Rare	sv8pt5
sv8pt5-60	Pokémon	Umbreon ex	Double Rare	sv8pt5
sv8pt5-61	Pokémon	Sneasel	Common	sv8pt5
sv8pt5-53	Pokémon	Hippowdon	Common	sv8pt5
sv8pt5-55	Pokémon	Great Tusk	Uncommon	sv8pt5
sv8pt5-58	Pokémon	Cornerstone Mask Ogerpon ex	Double Rare	sv8pt5
sv8pt5-62	Pokémon	Houndour	Common	sv8pt5
sv8pt5-64	Pokémon	Tyranitar ex	Double Rare	sv8pt5
sv8pt5-63	Pokémon	Houndoom	Common	sv8pt5
sv8pt5-65	Pokémon	Roaring Moon	Rare	sv8pt5
sv8pt5-66	Pokémon	Bronzor	Common	sv8pt5
sv8pt5-67	Pokémon	Bronzong	Uncommon	sv8pt5
sv8pt5-68	Pokémon	Heatran	Uncommon	sv8pt5
sv8pt5-69	Pokémon	Duraludon	Common	sv8pt5
sv8pt5-70	Pokémon	Archaludon	Rare	sv8pt5
sv8pt5-71	Pokémon	Dreepy	Common	sv8pt5
sv8pt5-72	Pokémon	Drakloak	Common	sv8pt5
sv8pt5-73	Pokémon	Dragapult ex	Double Rare	sv8pt5
sv8pt5-74	Pokémon	Eevee	Common	sv8pt5
sv8pt5-75	Pokémon	Eevee ex	Double Rare	sv8pt5
sv8pt5-76	Pokémon	Snorlax ex	Double Rare	sv8pt5
sv8pt5-78	Pokémon	Noctowl	Rare	sv8pt5
sv8pt5-79	Pokémon	Dunsparce	Common	sv8pt5
sv8pt5-77	Pokémon	Hoothoot	Common	sv8pt5
sv8pt5-81	Pokémon	Miltank	Common	sv8pt5
sv8pt5-83	Pokémon	Buneary	Common	sv8pt5
sv8pt5-80	Pokémon	Dudunsparce	Rare	sv8pt5
sv8pt5-82	Pokémon	Lugia ex	Double Rare	sv8pt5
sv8pt5-84	Pokémon	Lopunny	Common	sv8pt5
sv8pt5-85	Pokémon	Fan Rotom	Common	sv8pt5
sv8pt5-86	Pokémon	Regigigas	Uncommon	sv8pt5
sv8pt5-87	Pokémon	Shaymin	Uncommon	sv8pt5
sv8pt5-89	Pokémon	Hawlucha	Uncommon	sv8pt5
sv8pt5-88	Pokémon	Furfrou	Common	sv8pt5
sv8pt5-90	Pokémon	Noibat	Common	sv8pt5
sv8pt5-91	Pokémon	Noivern ex	Double Rare	sv8pt5
sv8pt5-92	Pokémon	Terapagos ex	Double Rare	sv8pt5
sv8pt5-93	Trainer	Amarys	Common	sv8pt5
sv8pt5-94	Trainer	Area Zero Underdepths	Uncommon	sv8pt5
sv8pt5-97	Trainer	Black Belt's Training	Common	sv8pt5
sv8pt5-101	Trainer	Buddy-Buddy Poffin	Uncommon	sv8pt5
sv8pt5-98	Trainer	Black Belt's Training	Common	sv8pt5
sv8pt5-95	Trainer	Binding Mochi	Uncommon	sv8pt5
sv8pt5-96	Trainer	Black Belt's Training	Common	sv8pt5
sv8pt5-100	Trainer	Briar	Uncommon	sv8pt5
sv8pt5-99	Trainer	Black Belt's Training	Common	sv8pt5
sv8pt5-102	Trainer	Bug Catching Set	Uncommon	sv8pt5
sv8pt5-103	Trainer	Carmine	Uncommon	sv8pt5
sv8pt5-106	Trainer	Earthen Vessel	Uncommon	sv8pt5
sv8pt5-105	Trainer	Crispin	Uncommon	sv8pt5
sv8pt5-108	Trainer	Festival Grounds	Uncommon	sv8pt5
sv8pt5-112	Trainer	Janine's Secret Art	Uncommon	sv8pt5
sv8pt5-110	Trainer	Glass Trumpet	Uncommon	sv8pt5
sv8pt5-111	Trainer	Haban Berry	Common	sv8pt5
sv8pt5-104	Trainer	Ciphermaniac's Codebreaking	Uncommon	sv8pt5
sv8pt5-107	Trainer	Explorer's Guidance	Uncommon	sv8pt5
sv8pt5-109	Trainer	Friends in Paldea	Common	sv8pt5
sv8pt5-113	Trainer	Kieran	Uncommon	sv8pt5
sv8pt5-114	Trainer	Lacey	Uncommon	sv8pt5
sv8pt5-115	Trainer	Larry's Skill	Common	sv8pt5
sv8pt5-119	Trainer	Prime Catcher	ACE SPEC Rare	sv8pt5
sv8pt5-116	Trainer	Max Rod	ACE SPEC Rare	sv8pt5
sv8pt5-117	Trainer	Maximum Belt	ACE SPEC Rare	sv8pt5
sv8pt5-118	Trainer	Ogre's Mask	Uncommon	sv8pt5
sv8pt5-120	Trainer	Professor Sada's Vitality	Uncommon	sv8pt5
sv8pt5-121	Trainer	Professor Turo's Scenario	Uncommon	sv8pt5
sv8pt5-122	Trainer	Professor's Research	Common	sv8pt5
sv8pt5-123	Trainer	Professor's Research	Common	sv8pt5
sv8pt5-124	Trainer	Professor's Research	Common	sv8pt5
sv8pt5-125	Trainer	Professor's Research	Common	sv8pt5
sv8pt5-126	Trainer	Rescue Board	Uncommon	sv8pt5
sv8pt5-127	Trainer	Roto-Stick	Common	sv8pt5
sv8pt5-128	Trainer	Scoop Up Cyclone	ACE SPEC Rare	sv8pt5
sv8pt5-129	Trainer	Sparkling Crystal	ACE SPEC Rare	sv8pt5
sv8pt5-131	Trainer	Treasure Tracker	ACE SPEC Rare	sv8pt5
sv8pt5-130	Trainer	Techno Radar	Uncommon	sv8pt5
sv8pt5-135	Trainer	Brassius	Ultra Rare	sv8pt5
sv8pt5-133	Trainer	Atticus	Ultra Rare	sv8pt5
sv8pt5-134	Trainer	Atticus	Ultra Rare	sv8pt5
sv8pt5-132	Trainer	Amarys	Ultra Rare	sv8pt5
sv8pt5-137	Trainer	Friends in Paldea	Ultra Rare	sv8pt5
sv8pt5-136	Trainer	Eri	Ultra Rare	sv8pt5
sv8pt5-138	Trainer	Giacomo	Ultra Rare	sv8pt5
sv8pt5-139	Trainer	Larry's Skill	Ultra Rare	sv8pt5
sv8pt5-140	Trainer	Mela	Ultra Rare	sv8pt5
sv8pt5-141	Trainer	Ortega	Ultra Rare	sv8pt5
sv8pt5-142	Trainer	Raifort	Ultra Rare	sv8pt5
sv8pt5-143	Trainer	Tyme	Ultra Rare	sv8pt5
sv8pt5-144	Pokémon	Leafeon ex	Special Illustration Rare	sv8pt5
sv8pt5-145	Pokémon	Teal Mask Ogerpon ex	Special Illustration Rare	sv8pt5
sv8pt5-147	Pokémon	Ceruledge ex	Special Illustration Rare	sv8pt5
sv8pt5-146	Pokémon	Flareon ex	Special Illustration Rare	sv8pt5
sv8pt5-151	Pokémon	Palafin ex	Special Illustration Rare	sv8pt5
sv8pt5-153	Pokémon	Jolteon ex	Special Illustration Rare	sv8pt5
sv8pt5-148	Pokémon	Hearthflame Mask Ogerpon ex	Special Illustration Rare	sv8pt5
sv8pt5-150	Pokémon	Glaceon ex	Special Illustration Rare	sv8pt5
sv8pt5-152	Pokémon	Wellspring Mask Ogerpon ex	Special Illustration Rare	sv8pt5
sv8pt5-149	Pokémon	Vaporeon ex	Special Illustration Rare	sv8pt5
sv8pt5-154	Pokémon	Iron Hands ex	Special Illustration Rare	sv8pt5
sv8pt5-155	Pokémon	Espeon ex	Special Illustration Rare	sv8pt5
sv8pt5-157	Pokémon	Iron Valiant ex	Special Illustration Rare	sv8pt5
sv8pt5-156	Pokémon	Sylveon ex	Special Illustration Rare	sv8pt5
sv8pt5-158	Pokémon	Iron Crown ex	Special Illustration Rare	sv8pt5
sv8pt5-159	Pokémon	Sandy Shocks ex	Special Illustration Rare	sv8pt5
sv8pt5-160	Pokémon	Cornerstone Mask Ogerpon ex	Special Illustration Rare	sv8pt5
sv8pt5-162	Pokémon	Roaring Moon ex	Special Illustration Rare	sv8pt5
sv8pt5-161	Pokémon	Umbreon ex	Special Illustration Rare	sv8pt5
sv8pt5-163	Pokémon	Pecharunt ex	Special Illustration Rare	sv8pt5
sv8pt5-164	Pokémon	Gholdengo ex	Special Illustration Rare	sv8pt5
sv8pt5-165	Pokémon	Dragapult ex	Special Illustration Rare	sv8pt5
sv8pt5-166	Pokémon	Raging Bolt ex	Special Illustration Rare	sv8pt5
sv8pt5-167	Pokémon	Eevee ex	Special Illustration Rare	sv8pt5
sv8pt5-168	Pokémon	Bloodmoon Ursaluna ex	Special Illustration Rare	sv8pt5
sv8pt5-169	Pokémon	Terapagos ex	Special Illustration Rare	sv8pt5
sv8pt5-170	Trainer	Amarys	Special Illustration Rare	sv8pt5
sv8pt5-171	Trainer	Crispin	Special Illustration Rare	sv8pt5
sv8pt5-176	Pokémon	Iron Leaves ex	Hyper Rare	sv8pt5
sv8pt5-174	Trainer	Kieran	Special Illustration Rare	sv8pt5
sv8pt5-177	Pokémon	Teal Mask Ogerpon ex	Hyper Rare	sv8pt5
sv8pt5-178	Pokémon	Walking Wake ex	Hyper Rare	sv8pt5
sv8pt5-180	Pokémon	Terapagos ex	Hyper Rare	sv8pt5
sv8pt5-172	Trainer	Drayton	Special Illustration Rare	sv8pt5
sv8pt5-173	Trainer	Janine's Secret Art	Special Illustration Rare	sv8pt5
sv8pt5-175	Trainer	Lacey	Special Illustration Rare	sv8pt5
sv8pt5-179	Pokémon	Pikachu ex	Hyper Rare	sv8pt5
sv9-1	Pokémon	Caterpie	Common	sv9
sv9-2	Pokémon	Metapod	Common	sv9
sv9-3	Pokémon	Butterfree	Rare	sv9
sv9-4	Pokémon	Paras	Common	sv9
sv9-5	Pokémon	Parasect	Common	sv9
sv9-6	Pokémon	Petilil	Common	sv9
sv9-7	Pokémon	Lilligant	Common	sv9
sv9-8	Pokémon	Maractus	Uncommon	sv9
sv9-9	Pokémon	Karrablast	Common	sv9
sv9-10	Pokémon	Foongus	Common	sv9
sv9-11	Pokémon	Amoonguss ex	Double Rare	sv9
sv9-12	Pokémon	Shelmet	Common	sv9
sv9-13	Pokémon	Accelgor	Uncommon	sv9
sv9-14	Pokémon	Durant	Common	sv9
sv9-15	Pokémon	Virizion	Uncommon	sv9
sv9-16	Pokémon	Sprigatito	Common	sv9
sv9-17	Pokémon	Floragato	Common	sv9
sv9-18	Pokémon	Meowscarada	Rare	sv9
sv9-19	Pokémon	Nymble	Common	sv9
sv9-20	Pokémon	Magmar	Common	sv9
sv9-21	Pokémon	Magmortar	Rare	sv9
sv9-22	Pokémon	Torchic	Common	sv9
sv9-23	Pokémon	Combusken	Uncommon	sv9
sv9-24	Pokémon	Blaziken ex	Double Rare	sv9
sv9-25	Pokémon	Torkoal	Common	sv9
sv9-26	Pokémon	N's Darumaka	Common	sv9
sv9-27	Pokémon	N's Darmanitan	Uncommon	sv9
sv9-28	Pokémon	Larvesta	Common	sv9
sv9-29	Pokémon	Volcarona	Uncommon	sv9
sv9-30	Pokémon	Reshiram ex	Double Rare	sv9
sv9-31	Pokémon	Volcanion ex	Double Rare	sv9
sv9-32	Pokémon	Articuno	Uncommon	sv9
sv9-33	Pokémon	Remoraid	Common	sv9
sv9-34	Pokémon	Octillery	Uncommon	sv9
sv9-35	Pokémon	Lotad	Common	sv9
sv9-36	Pokémon	Lombre	Common	sv9
sv9-37	Pokémon	Ludicolo	Rare	sv9
sv9-38	Pokémon	Wingull	Common	sv9
sv9-39	Pokémon	Pelipper	Uncommon	sv9
sv9-40	Pokémon	Wailmer	Common	sv9
sv9-41	Pokémon	Wailord	Rare	sv9
sv9-42	Pokémon	Regice	Uncommon	sv9
sv9-43	Pokémon	Veluza ex	Double Rare	sv9
sv9-44	Pokémon	Alolan Geodude	Common	sv9
sv9-45	Pokémon	Alolan Graveler	Common	sv9
sv9-46	Pokémon	Alolan Golem	Uncommon	sv9
sv9-47	Pokémon	Iono's Voltorb	Common	sv9
sv9-48	Pokémon	Iono's Electrode	Uncommon	sv9
sv9-49	Pokémon	N's Joltik	Common	sv9
sv9-50	Pokémon	Togedemaru	Common	sv9
sv9-51	Pokémon	Tapu Koko ex	Double Rare	sv9
sv9-52	Pokémon	Iono's Tadbulb	Common	sv9
sv9-53	Pokémon	Iono's Bellibolt ex	Double Rare	sv9
sv9-54	Pokémon	Iono's Wattrel	Common	sv9
sv9-55	Pokémon	Iono's Kilowattrel	Rare	sv9
sv9-56	Pokémon	Lillie's Clefairy ex	Double Rare	sv9
sv9-57	Pokémon	Alolan Marowak	Uncommon	sv9
sv9-58	Pokémon	Mr. Mime	Common	sv9
sv9-59	Pokémon	Shuppet	Common	sv9
sv9-60	Pokémon	Banette	Uncommon	sv9
sv9-61	Pokémon	Beldum	Common	sv9
sv9-62	Pokémon	Metang	Common	sv9
sv9-63	Pokémon	Metagross	Rare	sv9
sv9-64	Pokémon	N's Sigilyph	Common	sv9
sv9-65	Pokémon	Oricorio	Common	sv9
sv9-66	Pokémon	Lillie's Cutiefly	Common	sv9
sv9-67	Pokémon	Lillie's Ribombee	Rare	sv9
sv9-68	Pokémon	Lillie's Comfey	Common	sv9
sv9-69	Pokémon	Mimikyu ex	Double Rare	sv9
sv9-70	Pokémon	Dhelmise	Common	sv9
sv9-71	Pokémon	Impidimp	Common	sv9
sv9-72	Pokémon	Morgrem	Common	sv9
sv9-73	Pokémon	Grimmsnarl	Uncommon	sv9
sv9-74	Pokémon	Milcery	Common	sv9
sv9-75	Pokémon	Alcremie ex	Double Rare	sv9
sv9-76	Pokémon	Cubone	Common	sv9
sv9-77	Pokémon	Swinub	Common	sv9
sv9-78	Pokémon	Piloswine	Common	sv9
sv9-79	Pokémon	Mamoswine ex	Double Rare	sv9
sv9-80	Pokémon	Larvitar	Common	sv9
sv9-81	Pokémon	Pupitar	Common	sv9
sv9-82	Pokémon	Regirock	Rare	sv9
sv9-83	Pokémon	Pancham	Common	sv9
sv9-84	Pokémon	Rockruff	Common	sv9
sv9-85	Pokémon	Lycanroc	Rare	sv9
sv9-86	Pokémon	Hop's Silicobra	Common	sv9
sv9-87	Pokémon	Hop's Sandaconda	Uncommon	sv9
sv9-88	Pokémon	Toedscool	Common	sv9
sv9-89	Pokémon	Toedscruel	Uncommon	sv9
sv9-90	Pokémon	Klawf	Uncommon	sv9
sv9-91	Pokémon	Koffing	Common	sv9
sv9-92	Pokémon	Weezing	Uncommon	sv9
sv9-93	Pokémon	Paldean Wooper	Common	sv9
sv9-94	Pokémon	Paldean Clodsire ex	Double Rare	sv9
sv9-95	Pokémon	Tyranitar	Rare	sv9
sv9-96	Pokémon	N's Purrloin	Common	sv9
sv9-97	Pokémon	N's Zorua	Common	sv9
sv9-98	Pokémon	N's Zoroark ex	Double Rare	sv9
sv9-99	Pokémon	Pangoro	Uncommon	sv9
sv9-100	Pokémon	Lokix	Uncommon	sv9
sv9-101	Pokémon	Bombirdier	Common	sv9
sv9-102	Pokémon	Escavalier	Uncommon	sv9
sv9-103	Pokémon	N's Klink	Common	sv9
sv9-104	Pokémon	N's Klang	Common	sv9
sv9-105	Pokémon	N's Klinklang	Uncommon	sv9
sv9-106	Pokémon	Galarian Stunfisk	Common	sv9
sv9-107	Pokémon	Magearna	Rare	sv9
sv9-108	Pokémon	Hop's Corviknight	Uncommon	sv9
sv9-109	Pokémon	Cufant	Common	sv9
sv9-110	Pokémon	Copperajah	Uncommon	sv9
sv9-111	Pokémon	Hop's Zacian ex	Double Rare	sv9
sv9-112	Pokémon	Bagon	Common	sv9
sv9-113	Pokémon	Shelgon	Common	sv9
sv9-114	Pokémon	Salamence ex	Double Rare	sv9
sv9-115	Pokémon	Druddigon	Common	sv9
sv9-116	Pokémon	N's Reshiram	Rare	sv9
sv9-117	Pokémon	Hop's Snorlax	Rare	sv9
sv9-118	Pokémon	Sentret	Common	sv9
sv9-119	Pokémon	Furret	Common	sv9
sv9-120	Pokémon	Dunsparce	Common	sv9
sv9-121	Pokémon	Dudunsparce ex	Double Rare	sv9
sv9-122	Pokémon	Kecleon	Common	sv9
sv9-123	Pokémon	Tropius	Common	sv9
sv9-124	Pokémon	Audino	Common	sv9
sv9-125	Pokémon	Minccino	Common	sv9
sv9-126	Pokémon	Cinccino	Uncommon	sv9
sv9-127	Pokémon	Noibat	Common	sv9
sv9-128	Pokémon	Noivern	Rare	sv9
sv9-129	Pokémon	Komala	Common	sv9
sv9-130	Pokémon	Drampa	Common	sv9
sv9-131	Pokémon	Skwovet	Common	sv9
sv9-132	Pokémon	Greedent	Uncommon	sv9
sv9-133	Pokémon	Hop's Rookidee	Common	sv9
sv9-134	Pokémon	Hop's Corvisquire	Common	sv9
sv9-135	Pokémon	Hop's Wooloo	Common	sv9
sv9-136	Pokémon	Hop's Dubwool	Rare	sv9
sv9-137	Pokémon	Cramorant	Common	sv9
sv9-138	Pokémon	Hop's Cramorant	Uncommon	sv9
sv9-139	Pokémon	Lechonk	Common	sv9
sv9-140	Pokémon	Oinkologne	Uncommon	sv9
sv9-141	Pokémon	Squawkabilly	Common	sv9
sv9-142	Trainer	Billy & O'Nare	Common	sv9
sv9-143	Trainer	Black Belt's Training	Common	sv9
sv9-144	Trainer	Black Belt's Training	Common	sv9
sv9-145	Trainer	Black Belt's Training	Common	sv9
sv9-146	Trainer	Brock's Scouting	Uncommon	sv9
sv9-147	Trainer	Hop's Bag	Uncommon	sv9
sv9-148	Trainer	Hop's Choice Band	Uncommon	sv9
sv9-149	Trainer	Iris's Fighting Spirit	Uncommon	sv9
sv9-150	Trainer	Levincia	Uncommon	sv9
sv9-151	Trainer	Lillie's Pearl	Uncommon	sv9
sv9-152	Trainer	N's Castle	Uncommon	sv9
sv9-153	Trainer	N's PP Up	Uncommon	sv9
sv9-154	Trainer	Postwick	Uncommon	sv9
sv9-155	Trainer	Professor's Research	Common	sv9
sv9-156	Trainer	Redeemable Ticket	Uncommon	sv9
sv9-157	Trainer	Ruffian	Uncommon	sv9
sv9-158	Trainer	Super Potion	Uncommon	sv9
sv9-159	Energy	Spiky Energy	Uncommon	sv9
sv9-160	Pokémon	Maractus	Illustration Rare	sv9
sv9-161	Pokémon	Articuno	Illustration Rare	sv9
sv9-162	Pokémon	Wailord	Illustration Rare	sv9
sv9-163	Pokémon	Iono's Kilowattrel	Illustration Rare	sv9
sv9-164	Pokémon	Lillie's Ribombee	Illustration Rare	sv9
sv9-165	Pokémon	Swinub	Illustration Rare	sv9
sv9-166	Pokémon	Lycanroc	Illustration Rare	sv9
sv9-167	Pokémon	N's Reshiram	Illustration Rare	sv9
sv9-168	Pokémon	Furret	Illustration Rare	sv9
sv9-169	Pokémon	Noibat	Illustration Rare	sv9
sv9-170	Pokémon	Hop's Wooloo	Illustration Rare	sv9
sv9-171	Pokémon	Volcanion ex	Ultra Rare	sv9
sv9-172	Pokémon	Iono's Bellibolt ex	Ultra Rare	sv9
sv9-173	Pokémon	Lillie's Clefairy ex	Ultra Rare	sv9
sv9-174	Pokémon	Mamoswine ex	Ultra Rare	sv9
sv9-175	Pokémon	N's Zoroark ex	Ultra Rare	sv9
sv9-176	Pokémon	Hop's Zacian ex	Ultra Rare	sv9
sv9-177	Pokémon	Salamence ex	Ultra Rare	sv9
sv9-178	Pokémon	Dudunsparce ex	Ultra Rare	sv9
sv9-179	Trainer	Brock's Scouting	Ultra Rare	sv9
sv9-180	Trainer	Iris's Fighting Spirit	Ultra Rare	sv9
sv9-181	Trainer	Ruffian	Ultra Rare	sv9
sv9-182	Pokémon	Volcanion ex	Special Illustration Rare	sv9
sv9-183	Pokémon	Iono's Bellibolt ex	Special Illustration Rare	sv9
sv9-184	Pokémon	Lillie's Clefairy ex	Special Illustration Rare	sv9
sv9-185	Pokémon	N's Zoroark ex	Special Illustration Rare	sv9
sv9-186	Pokémon	Hop's Zacian ex	Special Illustration Rare	sv9
sv9-187	Pokémon	Salamence ex	Special Illustration Rare	sv9
sv9-188	Pokémon	Iono's Bellibolt ex	Hyper Rare	sv9
sv9-189	Pokémon	N's Zoroark ex	Hyper Rare	sv9
sv9-190	Energy	Spiky Energy	Hyper Rare	sv9
sv10-1	Pokémon	Ethan's Pinsir	Uncommon	sv10
sv10-2	Pokémon	Yanma	Common	sv10
sv10-3	Pokémon	Yanmega ex	Double Rare	sv10
sv10-4	Pokémon	Pineco	Common	sv10
sv10-5	Pokémon	Shroomish	Common	sv10
sv10-6	Pokémon	Breloom	Common	sv10
sv10-7	Pokémon	Cynthia's Roselia	Common	sv10
sv10-8	Pokémon	Cynthia's Roserade	Rare	sv10
sv10-9	Pokémon	Mow Rotom	Common	sv10
sv10-10	Pokémon	Shaymin	Uncommon	sv10
sv10-11	Pokémon	Dwebble	Common	sv10
sv10-12	Pokémon	Crustle	Rare	sv10
sv10-13	Pokémon	Fomantis	Common	sv10
sv10-14	Pokémon	Lurantis	Uncommon	sv10
sv10-15	Pokémon	Team Rocket's Blipbug	Common	sv10
sv10-16	Pokémon	Applin	Common	sv10
sv10-17	Pokémon	Dipplin	Common	sv10
sv10-18	Pokémon	Hydrapple	Rare	sv10
sv10-19	Pokémon	Team Rocket's Tarountula	Common	sv10
sv10-20	Pokémon	Team Rocket's Spidops	Rare	sv10
sv10-21	Pokémon	Smoliv	Common	sv10
sv10-22	Pokémon	Dolliv	Common	sv10
sv10-23	Pokémon	Arboliva ex	Double Rare	sv10
sv10-24	Pokémon	Rellor	Common	sv10
sv10-25	Pokémon	Rabsca ex	Double Rare	sv10
sv10-26	Pokémon	Teal Mask Ogerpon	Uncommon	sv10
sv10-27	Pokémon	Growlithe	Common	sv10
sv10-28	Pokémon	Arcanine	Uncommon	sv10
sv10-29	Pokémon	Ponyta	Common	sv10
sv10-30	Pokémon	Rapidash	Uncommon	sv10
sv10-31	Pokémon	Team Rocket's Moltres ex	Double Rare	sv10
sv10-32	Pokémon	Ethan's Cyndaquil	Common	sv10
sv10-33	Pokémon	Ethan's Quilava	Common	sv10
sv10-34	Pokémon	Ethan's Typhlosion	Rare	sv10
sv10-35	Pokémon	Ethan's Slugma	Common	sv10
sv10-36	Pokémon	Ethan's Magcargo	Rare	sv10
sv10-37	Pokémon	Team Rocket's Houndour	Common	sv10
sv10-38	Pokémon	Team Rocket's Houndoom	Uncommon	sv10
sv10-39	Pokémon	Ethan's Ho-Oh ex	Double Rare	sv10
sv10-40	Pokémon	Torchic	Common	sv10
sv10-41	Pokémon	Combusken	Common	sv10
sv10-42	Pokémon	Blaziken	Rare	sv10
sv10-43	Pokémon	Heat Rotom	Common	sv10
sv10-44	Pokémon	Hearthflame Mask Ogerpon	Uncommon	sv10
sv10-45	Pokémon	Misty's Psyduck	Uncommon	sv10
sv10-46	Pokémon	Misty's Staryu	Common	sv10
sv10-47	Pokémon	Misty's Starmie	Uncommon	sv10
sv10-48	Pokémon	Misty's Magikarp	Common	sv10
sv10-49	Pokémon	Misty's Gyarados	Rare	sv10
sv10-50	Pokémon	Misty's Lapras	Common	sv10
sv10-51	Pokémon	Team Rocket's Articuno	Rare	sv10
sv10-52	Pokémon	Cynthia's Feebas	Common	sv10
sv10-53	Pokémon	Cynthia's Milotic	Uncommon	sv10
sv10-54	Pokémon	Clamperl	Common	sv10
sv10-55	Pokémon	Huntail	Uncommon	sv10
sv10-56	Pokémon	Gorebyss	Rare	sv10
sv10-57	Pokémon	Buizel	Common	sv10
sv10-58	Pokémon	Floatzel	Uncommon	sv10
sv10-59	Pokémon	Snover	Common	sv10
sv10-60	Pokémon	Abomasnow	Uncommon	sv10
sv10-61	Pokémon	Wash Rotom	Common	sv10
sv10-62	Pokémon	Arrokuda	Common	sv10
sv10-63	Pokémon	Barraskewda	Uncommon	sv10
sv10-64	Pokémon	Cetoddle	Common	sv10
sv10-65	Pokémon	Cetitan ex	Double Rare	sv10
sv10-66	Pokémon	Dondozo ex	Double Rare	sv10
sv10-67	Pokémon	Wellspring Mask Ogerpon	Uncommon	sv10
sv10-68	Pokémon	Electabuzz	Common	sv10
sv10-69	Pokémon	Electivire ex	Double Rare	sv10
sv10-70	Pokémon	Team Rocket's Zapdos	Rare	sv10
sv10-71	Pokémon	Ethan's Pichu	Common	sv10
sv10-72	Pokémon	Team Rocket's Mareep	Common	sv10
sv10-73	Pokémon	Team Rocket's Flaaffy	Common	sv10
sv10-74	Pokémon	Team Rocket's Ampharos	Uncommon	sv10
sv10-75	Pokémon	Electrike	Common	sv10
sv10-76	Pokémon	Manectric	Uncommon	sv10
sv10-77	Pokémon	Rotom	Common	sv10
sv10-78	Pokémon	Zeraora	Rare	sv10
sv10-79	Pokémon	Team Rocket's Drowzee	Common	sv10
sv10-80	Pokémon	Team Rocket's Hypno	Uncommon	sv10
sv10-81	Pokémon	Team Rocket's Mewtwo ex	Double Rare	sv10
sv10-82	Pokémon	Team Rocket's Wobbuffet	Rare	sv10
sv10-83	Pokémon	Steven's Baltoy	Common	sv10
sv10-84	Pokémon	Steven's Claydol	Uncommon	sv10
sv10-85	Pokémon	Team Rocket's Chingling	Common	sv10
sv10-86	Pokémon	Steven's Carbink	Common	sv10
sv10-87	Pokémon	Team Rocket's Mimikyu	Uncommon	sv10
sv10-88	Pokémon	Team Rocket's Dottler	Common	sv10
sv10-89	Pokémon	Team Rocket's Orbeetle	Uncommon	sv10
sv10-90	Pokémon	Mankey	Common	sv10
sv10-91	Pokémon	Primeape	Common	sv10
sv10-92	Pokémon	Annihilape	Rare	sv10
sv10-93	Pokémon	Ethan's Sudowoodo	Common	sv10
sv10-94	Pokémon	Team Rocket's Larvitar	Common	sv10
sv10-95	Pokémon	Team Rocket's Pupitar	Common	sv10
sv10-96	Pokémon	Team Rocket's Tyranitar	Rare	sv10
sv10-97	Pokémon	Nosepass	Common	sv10
sv10-98	Pokémon	Probopass	Uncommon	sv10
sv10-99	Pokémon	Meditite	Common	sv10
sv10-100	Pokémon	Medicham	Uncommon	sv10
sv10-101	Pokémon	Regirock ex	Double Rare	sv10
sv10-102	Pokémon	Cynthia's Gible	Common	sv10
sv10-103	Pokémon	Cynthia's Gabite	Common	sv10
sv10-104	Pokémon	Cynthia's Garchomp ex	Double Rare	sv10
sv10-105	Pokémon	Hippopotas	Common	sv10
sv10-106	Pokémon	Hippowdon	Uncommon	sv10
sv10-107	Pokémon	Mudbray	Common	sv10
sv10-108	Pokémon	Mudsdale	Uncommon	sv10
sv10-109	Pokémon	Arven's Toedscool	Common	sv10
sv10-110	Pokémon	Arven's Toedscruel	Uncommon	sv10
sv10-111	Pokémon	Cornerstone Mask Ogerpon	Uncommon	sv10
sv10-112	Pokémon	Team Rocket's Ekans	Common	sv10
sv10-113	Pokémon	Team Rocket's Arbok	Uncommon	sv10
sv10-114	Pokémon	Team Rocket's Nidoran♀	Common	sv10
sv10-115	Pokémon	Team Rocket's Nidorina	Common	sv10
sv10-116	Pokémon	Team Rocket's Nidoqueen	Uncommon	sv10
sv10-117	Pokémon	Team Rocket's Nidoran♂	Common	sv10
sv10-118	Pokémon	Team Rocket's Nidorino	Common	sv10
sv10-119	Pokémon	Team Rocket's Nidoking ex	Double Rare	sv10
sv10-120	Pokémon	Team Rocket's Zubat	Common	sv10
sv10-121	Pokémon	Team Rocket's Golbat	Uncommon	sv10
sv10-122	Pokémon	Team Rocket's Crobat ex	Double Rare	sv10
sv10-123	Pokémon	Team Rocket's Grimer	Common	sv10
sv10-124	Pokémon	Team Rocket's Muk	Uncommon	sv10
sv10-125	Pokémon	Team Rocket's Koffing	Common	sv10
sv10-126	Pokémon	Team Rocket's Weezing	Uncommon	sv10
sv10-127	Pokémon	Team Rocket's Murkrow	Uncommon	sv10
sv10-128	Pokémon	Team Rocket's Sneasel	Rare	sv10
sv10-129	Pokémon	Cynthia's Spiritomb	Uncommon	sv10
sv10-130	Pokémon	Marnie's Purrloin	Common	sv10
sv10-131	Pokémon	Marnie's Liepard	Uncommon	sv10
sv10-132	Pokémon	Marnie's Scraggy	Common	sv10
sv10-133	Pokémon	Marnie's Scrafty	Uncommon	sv10
sv10-134	Pokémon	Marnie's Impidimp	Common	sv10
sv10-135	Pokémon	Marnie's Morgrem	Uncommon	sv10
sv10-136	Pokémon	Marnie's Grimmsnarl ex	Double Rare	sv10
sv10-137	Pokémon	Marnie's Morpeko	Common	sv10
sv10-138	Pokémon	Arven's Maschiff	Common	sv10
sv10-139	Pokémon	Arven's Mabosstiff ex	Double Rare	sv10
sv10-140	Pokémon	Forretress	Uncommon	sv10
sv10-141	Pokémon	Skarmory	Common	sv10
sv10-142	Pokémon	Steven's Skarmory	Common	sv10
sv10-143	Pokémon	Steven's Beldum	Common	sv10
sv10-144	Pokémon	Steven's Metang	Uncommon	sv10
sv10-145	Pokémon	Steven's Metagross ex	Double Rare	sv10
sv10-146	Pokémon	Zamazenta	Rare	sv10
sv10-147	Pokémon	Team Rocket's Rattata	Common	sv10
sv10-148	Pokémon	Team Rocket's Raticate	Common	sv10
sv10-149	Pokémon	Team Rocket's Meowth	Common	sv10
sv10-150	Pokémon	Team Rocket's Persian ex	Double Rare	sv10
sv10-151	Pokémon	Kangaskhan	Common	sv10
sv10-152	Pokémon	Tauros	Common	sv10
sv10-153	Pokémon	Team Rocket's Porygon	Common	sv10
sv10-154	Pokémon	Team Rocket's Porygon2	Common	sv10
sv10-155	Pokémon	Team Rocket's Porygon-Z	Uncommon	sv10
sv10-156	Pokémon	Taillow	Common	sv10
sv10-157	Pokémon	Swellow	Common	sv10
sv10-158	Pokémon	Arven's Skwovet	Common	sv10
sv10-159	Pokémon	Arven's Greedent	Rare	sv10
sv10-160	Pokémon	Squawkabilly	Common	sv10
sv10-161	Trainer	Arven's Sandwich	Uncommon	sv10
sv10-162	Trainer	Cynthia's Power Weight	Uncommon	sv10
sv10-163	Trainer	Emcee's Hype	Common	sv10
sv10-164	Trainer	Energy Recycler	Uncommon	sv10
sv10-165	Trainer	Ethan's Adventure	Uncommon	sv10
sv10-166	Trainer	Granite Cave	Uncommon	sv10
sv10-167	Trainer	Judge	Uncommon	sv10
sv10-168	Trainer	Sacred Ash	Uncommon	sv10
sv10-169	Trainer	Spikemuth Gym	Uncommon	sv10
sv10-170	Trainer	Team Rocket's Archer	Uncommon	sv10
sv10-171	Trainer	Team Rocket's Ariana	Uncommon	sv10
sv10-172	Trainer	Team Rocket's Bother-Bot	Uncommon	sv10
sv10-173	Trainer	Team Rocket's Factory	Uncommon	sv10
sv10-174	Trainer	Team Rocket's Giovanni	Uncommon	sv10
sv10-175	Trainer	Team Rocket's Great Ball	Uncommon	sv10
sv10-176	Trainer	Team Rocket's Petrel	Uncommon	sv10
sv10-177	Trainer	Team Rocket's Proton	Uncommon	sv10
sv10-178	Trainer	Team Rocket's Transceiver	Uncommon	sv10
sv10-179	Trainer	Team Rocket's Venture Bomb	Uncommon	sv10
sv10-180	Trainer	Team Rocket's Watchtower	Uncommon	sv10
sv10-181	Trainer	TM Machine	Uncommon	sv10
sv10-182	Energy	Team Rocket's Energy	Uncommon	sv10
sv10-183	Pokémon	Yanma	Illustration Rare	sv10
sv10-184	Pokémon	Cynthia's Roserade	Illustration Rare	sv10
sv10-185	Pokémon	Shaymin	Illustration Rare	sv10
sv10-186	Pokémon	Crustle	Illustration Rare	sv10
sv10-187	Pokémon	Team Rocket's Spidops	Illustration Rare	sv10
sv10-188	Pokémon	Hydrapple	Illustration Rare	sv10
sv10-189	Pokémon	Rapidash	Illustration Rare	sv10
sv10-190	Pokémon	Ethan's Typhlosion	Illustration Rare	sv10
sv10-191	Pokémon	Team Rocket's Houndoom	Illustration Rare	sv10
sv10-192	Pokémon	Blaziken	Illustration Rare	sv10
sv10-193	Pokémon	Misty's Psyduck	Illustration Rare	sv10
sv10-194	Pokémon	Misty's Lapras	Illustration Rare	sv10
sv10-195	Pokémon	Clamperl	Illustration Rare	sv10
sv10-196	Pokémon	Electrike	Illustration Rare	sv10
sv10-197	Pokémon	Rotom	Illustration Rare	sv10
sv10-198	Pokémon	Team Rocket's Orbeetle	Illustration Rare	sv10
sv10-199	Pokémon	Team Rocket's Weezing	Illustration Rare	sv10
sv10-200	Pokémon	Team Rocket's Murkrow	Illustration Rare	sv10
sv10-201	Pokémon	Zamazenta	Illustration Rare	sv10
sv10-202	Pokémon	Team Rocket's Raticate	Illustration Rare	sv10
sv10-203	Pokémon	Team Rocket's Meowth	Illustration Rare	sv10
sv10-204	Pokémon	Kangaskhan	Illustration Rare	sv10
sv10-205	Pokémon	Arven's Greedent	Illustration Rare	sv10
sv10-206	Pokémon	Yanmega ex	Ultra Rare	sv10
sv10-207	Pokémon	Arboliva ex	Ultra Rare	sv10
sv10-208	Pokémon	Team Rocket's Moltres ex	Ultra Rare	sv10
sv10-209	Pokémon	Ethan's Ho-Oh ex	Ultra Rare	sv10
sv10-210	Pokémon	Cetitan ex	Ultra Rare	sv10
sv10-211	Pokémon	Dondozo ex	Ultra Rare	sv10
sv10-212	Pokémon	Electivire ex	Ultra Rare	sv10
sv10-213	Pokémon	Team Rocket's Mewtwo ex	Ultra Rare	sv10
sv10-214	Pokémon	Regirock ex	Ultra Rare	sv10
sv10-215	Pokémon	Cynthia's Garchomp ex	Ultra Rare	sv10
sv10-216	Pokémon	Team Rocket's Nidoking ex	Ultra Rare	sv10
sv10-217	Pokémon	Team Rocket's Crobat ex	Ultra Rare	sv10
sv10-218	Pokémon	Arven's Mabosstiff ex	Ultra Rare	sv10
sv10-219	Pokémon	Team Rocket's Persian ex	Ultra Rare	sv10
sv10-220	Trainer	Emcee's Hype	Ultra Rare	sv10
sv10-221	Trainer	Ethan's Adventure	Ultra Rare	sv10
sv10-222	Trainer	Judge	Ultra Rare	sv10
sv10-223	Trainer	Team Rocket's Archer	Ultra Rare	sv10
sv10-224	Trainer	Team Rocket's Ariana	Ultra Rare	sv10
sv10-225	Trainer	Team Rocket's Giovanni	Ultra Rare	sv10
sv10-226	Trainer	Team Rocket's Petrel	Ultra Rare	sv10
sv10-227	Trainer	Team Rocket's Proton	Ultra Rare	sv10
sv10-228	Pokémon	Yanmega ex	Special Illustration Rare	sv10
sv10-229	Pokémon	Team Rocket's Moltres ex	Special Illustration Rare	sv10
sv10-230	Pokémon	Ethan's Ho-Oh ex	Special Illustration Rare	sv10
sv10-231	Pokémon	Team Rocket's Mewtwo ex	Special Illustration Rare	sv10
sv10-232	Pokémon	Cynthia's Garchomp ex	Special Illustration Rare	sv10
sv10-233	Pokémon	Team Rocket's Nidoking ex	Special Illustration Rare	sv10
sv10-234	Pokémon	Team Rocket's Crobat ex	Special Illustration Rare	sv10
sv10-235	Pokémon	Arven's Mabosstiff ex	Special Illustration Rare	sv10
sv10-236	Trainer	Ethan's Adventure	Special Illustration Rare	sv10
sv10-237	Trainer	Team Rocket's Ariana	Special Illustration Rare	sv10
sv10-238	Trainer	Team Rocket's Giovanni	Special Illustration Rare	sv10
sv10-239	Pokémon	Ethan's Ho-Oh ex	Hyper Rare	sv10
sv10-240	Pokémon	Team Rocket's Mewtwo ex	Hyper Rare	sv10
sv10-241	Pokémon	Cynthia's Garchomp ex	Hyper Rare	sv10
sv10-242	Pokémon	Team Rocket's Crobat ex	Hyper Rare	sv10
sv10-243	Trainer	Jamming Tower	Hyper Rare	sv10
sv10-244	Trainer	Levincia	Hyper Rare	sv10
zsv10pt5-172	Pokémon	Zekrom ex	Black White Rare	zsv10pt5
zsv10pt5-1	Pokémon	Snivy	Common	zsv10pt5
zsv10pt5-2	Pokémon	Servine	Common	zsv10pt5
zsv10pt5-3	Pokémon	Serperior ex	Double Rare	zsv10pt5
zsv10pt5-4	Pokémon	Pansage	Common	zsv10pt5
zsv10pt5-5	Pokémon	Simisage	Uncommon	zsv10pt5
zsv10pt5-6	Pokémon	Petilil	Common	zsv10pt5
zsv10pt5-7	Pokémon	Lilligant	Uncommon	zsv10pt5
zsv10pt5-8	Pokémon	Maractus	Common	zsv10pt5
zsv10pt5-9	Pokémon	Karrablast	Common	zsv10pt5
zsv10pt5-10	Pokémon	Foongus	Common	zsv10pt5
zsv10pt5-12	Pokémon	Victini	Rare	zsv10pt5
zsv10pt5-11	Pokémon	Amoonguss	Uncommon	zsv10pt5
zsv10pt5-13	Pokémon	Darumaka	Common	zsv10pt5
zsv10pt5-14	Pokémon	Darmanitan	Uncommon	zsv10pt5
zsv10pt5-15	Pokémon	Larvesta	Common	zsv10pt5
zsv10pt5-16	Pokémon	Volcarona	Rare	zsv10pt5
zsv10pt5-21	Pokémon	Seismitoad	Uncommon	zsv10pt5
zsv10pt5-22	Pokémon	Tirtouga	Uncommon	zsv10pt5
zsv10pt5-27	Pokémon	Cryogonal	Uncommon	zsv10pt5
zsv10pt5-19	Pokémon	Tympole	Common	zsv10pt5
zsv10pt5-25	Pokémon	Cubchoo	Common	zsv10pt5
zsv10pt5-26	Pokémon	Beartic	Rare	zsv10pt5
zsv10pt5-17	Pokémon	Panpour	Common	zsv10pt5
zsv10pt5-20	Pokémon	Palpitoad	Common	zsv10pt5
zsv10pt5-23	Pokémon	Carracosta	Rare	zsv10pt5
zsv10pt5-18	Pokémon	Simipour	Uncommon	zsv10pt5
zsv10pt5-24	Pokémon	Alomomola	Uncommon	zsv10pt5
zsv10pt5-29	Pokémon	Emolga	Common	zsv10pt5
zsv10pt5-28	Pokémon	Kyurem ex	Double Rare	zsv10pt5
zsv10pt5-32	Pokémon	Eelektross	Uncommon	zsv10pt5
zsv10pt5-31	Pokémon	Eelektrik	Uncommon	zsv10pt5
zsv10pt5-35	Pokémon	Munna	Common	zsv10pt5
zsv10pt5-36	Pokémon	Musharna	Uncommon	zsv10pt5
zsv10pt5-39	Pokémon	Reuniclus	Uncommon	zsv10pt5
zsv10pt5-37	Pokémon	Solosis	Common	zsv10pt5
zsv10pt5-38	Pokémon	Duosion	Common	zsv10pt5
zsv10pt5-30	Pokémon	Tynamo	Common	zsv10pt5
zsv10pt5-33	Pokémon	Thundurus	Rare	zsv10pt5
zsv10pt5-34	Pokémon	Zekrom ex	Double Rare	zsv10pt5
zsv10pt5-48	Pokémon	Gurdurr	Common	zsv10pt5
zsv10pt5-40	Pokémon	Elgyem	Common	zsv10pt5
zsv10pt5-42	Pokémon	Golett	Common	zsv10pt5
zsv10pt5-43	Pokémon	Golurk	Uncommon	zsv10pt5
zsv10pt5-45	Pokémon	Drilbur	Common	zsv10pt5
zsv10pt5-41	Pokémon	Beheeyem	Uncommon	zsv10pt5
zsv10pt5-46	Pokémon	Excadrill ex	Double Rare	zsv10pt5
zsv10pt5-51	Pokémon	Dwebble	Common	zsv10pt5
zsv10pt5-44	Pokémon	Meloetta ex	Double Rare	zsv10pt5
zsv10pt5-47	Pokémon	Timburr	Common	zsv10pt5
zsv10pt5-52	Pokémon	Crustle	Uncommon	zsv10pt5
zsv10pt5-49	Pokémon	Conkeldurr	Rare	zsv10pt5
zsv10pt5-50	Pokémon	Throh	Uncommon	zsv10pt5
zsv10pt5-53	Pokémon	Landorus	Rare	zsv10pt5
zsv10pt5-64	Pokémon	Pawniard	Common	zsv10pt5
zsv10pt5-55	Pokémon	Whirlipede	Common	zsv10pt5
zsv10pt5-54	Pokémon	Venipede	Common	zsv10pt5
zsv10pt5-58	Pokémon	Krokorok	Common	zsv10pt5
zsv10pt5-59	Pokémon	Krookodile	Uncommon	zsv10pt5
zsv10pt5-60	Pokémon	Escavalier	Uncommon	zsv10pt5
zsv10pt5-62	Pokémon	Klang	Common	zsv10pt5
zsv10pt5-61	Pokémon	Klink	Common	zsv10pt5
zsv10pt5-56	Pokémon	Scolipede	Uncommon	zsv10pt5
zsv10pt5-57	Pokémon	Sandile	Common	zsv10pt5
zsv10pt5-63	Pokémon	Klinklang	Rare	zsv10pt5
zsv10pt5-67	Pokémon	Genesect ex	Double Rare	zsv10pt5
zsv10pt5-68	Pokémon	Axew	Common	zsv10pt5
zsv10pt5-70	Pokémon	Haxorus	Rare	zsv10pt5
zsv10pt5-71	Pokémon	Pidove	Common	zsv10pt5
zsv10pt5-65	Pokémon	Bisharp	Uncommon	zsv10pt5
zsv10pt5-72	Pokémon	Tranquill	Common	zsv10pt5
zsv10pt5-69	Pokémon	Fraxure	Common	zsv10pt5
zsv10pt5-73	Pokémon	Unfezant	Uncommon	zsv10pt5
zsv10pt5-66	Pokémon	Cobalion	Rare	zsv10pt5
zsv10pt5-82	Trainer	Fennel	Uncommon	zsv10pt5
zsv10pt5-78	Pokémon	Braviary	Uncommon	zsv10pt5
zsv10pt5-83	Trainer	N's Plan	Uncommon	zsv10pt5
zsv10pt5-81	Trainer	Energy Coin	Uncommon	zsv10pt5
zsv10pt5-75	Pokémon	Minccino	Common	zsv10pt5
zsv10pt5-76	Pokémon	Cinccino	Uncommon	zsv10pt5
zsv10pt5-79	Trainer	Air Balloon	Uncommon	zsv10pt5
zsv10pt5-74	Pokémon	Audino	Common	zsv10pt5
zsv10pt5-77	Pokémon	Rufflet	Common	zsv10pt5
zsv10pt5-80	Trainer	Antique Cover Fossil	Common	zsv10pt5
zsv10pt5-84	Trainer	Pokégear 3.0	Uncommon	zsv10pt5
zsv10pt5-85	Trainer	Professor's Research	Uncommon	zsv10pt5
zsv10pt5-86	Energy	Prism Energy	Uncommon	zsv10pt5
zsv10pt5-92	Pokémon	Lilligant	Illustration Rare	zsv10pt5
zsv10pt5-113	Pokémon	Tynamo	Illustration Rare	zsv10pt5
zsv10pt5-115	Pokémon	Eelektross	Illustration Rare	zsv10pt5
zsv10pt5-117	Pokémon	Musharna	Illustration Rare	zsv10pt5
zsv10pt5-90	Pokémon	Simisage	Illustration Rare	zsv10pt5
zsv10pt5-93	Pokémon	Maractus	Illustration Rare	zsv10pt5
zsv10pt5-96	Pokémon	Amoonguss	Illustration Rare	zsv10pt5
zsv10pt5-102	Pokémon	Simipour	Illustration Rare	zsv10pt5
zsv10pt5-105	Pokémon	Seismitoad	Illustration Rare	zsv10pt5
zsv10pt5-88	Pokémon	Servine	Illustration Rare	zsv10pt5
zsv10pt5-97	Pokémon	Darumaka	Illustration Rare	zsv10pt5
zsv10pt5-99	Pokémon	Larvesta	Illustration Rare	zsv10pt5
zsv10pt5-101	Pokémon	Panpour	Illustration Rare	zsv10pt5
zsv10pt5-108	Pokémon	Alomomola	Illustration Rare	zsv10pt5
zsv10pt5-110	Pokémon	Beartic	Illustration Rare	zsv10pt5
zsv10pt5-112	Pokémon	Emolga	Illustration Rare	zsv10pt5
zsv10pt5-114	Pokémon	Eelektrik	Illustration Rare	zsv10pt5
zsv10pt5-87	Pokémon	Snivy	Illustration Rare	zsv10pt5
zsv10pt5-94	Pokémon	Karrablast	Illustration Rare	zsv10pt5
zsv10pt5-98	Pokémon	Darmanitan	Illustration Rare	zsv10pt5
zsv10pt5-100	Pokémon	Volcarona	Illustration Rare	zsv10pt5
zsv10pt5-109	Pokémon	Cubchoo	Illustration Rare	zsv10pt5
zsv10pt5-91	Pokémon	Petilil	Illustration Rare	zsv10pt5
zsv10pt5-104	Pokémon	Palpitoad	Illustration Rare	zsv10pt5
zsv10pt5-106	Pokémon	Tirtouga	Illustration Rare	zsv10pt5
zsv10pt5-95	Pokémon	Foongus	Illustration Rare	zsv10pt5
zsv10pt5-89	Pokémon	Pansage	Illustration Rare	zsv10pt5
zsv10pt5-107	Pokémon	Carracosta	Illustration Rare	zsv10pt5
zsv10pt5-116	Pokémon	Munna	Illustration Rare	zsv10pt5
zsv10pt5-103	Pokémon	Tympole	Illustration Rare	zsv10pt5
zsv10pt5-111	Pokémon	Cryogonal	Illustration Rare	zsv10pt5
zsv10pt5-118	Pokémon	Solosis	Illustration Rare	zsv10pt5
zsv10pt5-121	Pokémon	Beheeyem	Illustration Rare	zsv10pt5
zsv10pt5-122	Pokémon	Golett	Illustration Rare	zsv10pt5
zsv10pt5-119	Pokémon	Duosion	Illustration Rare	zsv10pt5
zsv10pt5-120	Pokémon	Elgyem	Illustration Rare	zsv10pt5
zsv10pt5-124	Pokémon	Drilbur	Illustration Rare	zsv10pt5
zsv10pt5-126	Pokémon	Gurdurr	Illustration Rare	zsv10pt5
zsv10pt5-123	Pokémon	Golurk	Illustration Rare	zsv10pt5
zsv10pt5-125	Pokémon	Timburr	Illustration Rare	zsv10pt5
zsv10pt5-127	Pokémon	Conkeldurr	Illustration Rare	zsv10pt5
zsv10pt5-128	Pokémon	Throh	Illustration Rare	zsv10pt5
zsv10pt5-129	Pokémon	Dwebble	Illustration Rare	zsv10pt5
zsv10pt5-130	Pokémon	Crustle	Illustration Rare	zsv10pt5
zsv10pt5-132	Pokémon	Venipede	Illustration Rare	zsv10pt5
zsv10pt5-134	Pokémon	Scolipede	Illustration Rare	zsv10pt5
zsv10pt5-135	Pokémon	Sandile	Illustration Rare	zsv10pt5
zsv10pt5-131	Pokémon	Landorus	Illustration Rare	zsv10pt5
zsv10pt5-133	Pokémon	Whirlipede	Illustration Rare	zsv10pt5
zsv10pt5-136	Pokémon	Krokorok	Illustration Rare	zsv10pt5
zsv10pt5-138	Pokémon	Escavalier	Illustration Rare	zsv10pt5
zsv10pt5-143	Pokémon	Bisharp	Illustration Rare	zsv10pt5
zsv10pt5-148	Pokémon	Pidove	Illustration Rare	zsv10pt5
zsv10pt5-156	Pokémon	Serperior ex	Ultra Rare	zsv10pt5
zsv10pt5-137	Pokémon	Krookodile	Illustration Rare	zsv10pt5
zsv10pt5-144	Pokémon	Cobalion	Illustration Rare	zsv10pt5
zsv10pt5-147	Pokémon	Haxorus	Illustration Rare	zsv10pt5
zsv10pt5-149	Pokémon	Tranquill	Illustration Rare	zsv10pt5
zsv10pt5-139	Pokémon	Klink	Illustration Rare	zsv10pt5
zsv10pt5-141	Pokémon	Klinklang	Illustration Rare	zsv10pt5
zsv10pt5-145	Pokémon	Axew	Illustration Rare	zsv10pt5
zsv10pt5-146	Pokémon	Fraxure	Illustration Rare	zsv10pt5
zsv10pt5-150	Pokémon	Unfezant	Illustration Rare	zsv10pt5
zsv10pt5-153	Pokémon	Cinccino	Illustration Rare	zsv10pt5
zsv10pt5-152	Pokémon	Minccino	Illustration Rare	zsv10pt5
zsv10pt5-154	Pokémon	Rufflet	Illustration Rare	zsv10pt5
zsv10pt5-155	Pokémon	Braviary	Illustration Rare	zsv10pt5
zsv10pt5-157	Pokémon	Kyurem ex	Ultra Rare	zsv10pt5
zsv10pt5-140	Pokémon	Klang	Illustration Rare	zsv10pt5
zsv10pt5-142	Pokémon	Pawniard	Illustration Rare	zsv10pt5
zsv10pt5-151	Pokémon	Audino	Illustration Rare	zsv10pt5
zsv10pt5-159	Pokémon	Meloetta ex	Ultra Rare	zsv10pt5
zsv10pt5-158	Pokémon	Zekrom ex	Ultra Rare	zsv10pt5
zsv10pt5-162	Trainer	Fennel	Ultra Rare	zsv10pt5
zsv10pt5-161	Pokémon	Genesect ex	Ultra Rare	zsv10pt5
zsv10pt5-165	Pokémon	Kyurem ex	Special Illustration Rare	zsv10pt5
zsv10pt5-163	Trainer	N's Plan	Ultra Rare	zsv10pt5
zsv10pt5-164	Pokémon	Serperior ex	Special Illustration Rare	zsv10pt5
zsv10pt5-160	Pokémon	Excadrill ex	Ultra Rare	zsv10pt5
zsv10pt5-166	Pokémon	Zekrom ex	Special Illustration Rare	zsv10pt5
zsv10pt5-167	Pokémon	Meloetta ex	Special Illustration Rare	zsv10pt5
zsv10pt5-168	Pokémon	Excadrill ex	Special Illustration Rare	zsv10pt5
zsv10pt5-169	Pokémon	Genesect ex	Special Illustration Rare	zsv10pt5
zsv10pt5-170	Trainer	N's Plan	Special Illustration Rare	zsv10pt5
zsv10pt5-171	Pokémon	Victini	Rare	zsv10pt5
rsv10pt5-1	Pokémon	Sewaddle	Common	rsv10pt5
rsv10pt5-2	Pokémon	Swadloon	Common	rsv10pt5
rsv10pt5-3	Pokémon	Leavanny	Uncommon	rsv10pt5
rsv10pt5-4	Pokémon	Cottonee	Common	rsv10pt5
rsv10pt5-5	Pokémon	Whimsicott ex	Double Rare	rsv10pt5
rsv10pt5-6	Pokémon	Deerling	Common	rsv10pt5
rsv10pt5-7	Pokémon	Sawsbuck	Uncommon	rsv10pt5
rsv10pt5-8	Pokémon	Shelmet	Common	rsv10pt5
rsv10pt5-9	Pokémon	Accelgor	Uncommon	rsv10pt5
rsv10pt5-10	Pokémon	Virizion	Rare	rsv10pt5
rsv10pt5-11	Pokémon	Tepig	Common	rsv10pt5
rsv10pt5-12	Pokémon	Pignite	Common	rsv10pt5
rsv10pt5-13	Pokémon	Emboar	Rare	rsv10pt5
rsv10pt5-14	Pokémon	Pansear	Common	rsv10pt5
rsv10pt5-15	Pokémon	Simisear	Uncommon	rsv10pt5
rsv10pt5-16	Pokémon	Litwick	Common	rsv10pt5
rsv10pt5-17	Pokémon	Lampent	Common	rsv10pt5
rsv10pt5-18	Pokémon	Chandelure	Rare	rsv10pt5
rsv10pt5-19	Pokémon	Heatmor	Uncommon	rsv10pt5
rsv10pt5-20	Pokémon	Reshiram ex	Double Rare	rsv10pt5
rsv10pt5-21	Pokémon	Oshawott	Common	rsv10pt5
rsv10pt5-22	Pokémon	Dewott	Common	rsv10pt5
rsv10pt5-23	Pokémon	Samurott	Rare	rsv10pt5
rsv10pt5-24	Pokémon	Basculin	Common	rsv10pt5
rsv10pt5-28	Pokémon	Vanillish	Common	rsv10pt5
rsv10pt5-27	Pokémon	Vanillite	Common	rsv10pt5
rsv10pt5-31	Pokémon	Blitzle	Common	rsv10pt5
rsv10pt5-26	Pokémon	Swanna	Uncommon	rsv10pt5
rsv10pt5-25	Pokémon	Ducklett	Common	rsv10pt5
rsv10pt5-29	Pokémon	Vanilluxe	Uncommon	rsv10pt5
rsv10pt5-32	Pokémon	Zebstrika	Uncommon	rsv10pt5
rsv10pt5-30	Pokémon	Keldeo ex	Double Rare	rsv10pt5
rsv10pt5-33	Pokémon	Joltik	Common	rsv10pt5
rsv10pt5-34	Pokémon	Galvantula	Uncommon	rsv10pt5
rsv10pt5-35	Pokémon	Stunfisk	Uncommon	rsv10pt5
rsv10pt5-36	Pokémon	Woobat	Common	rsv10pt5
rsv10pt5-37	Pokémon	Swoobat	Uncommon	rsv10pt5
rsv10pt5-38	Pokémon	Sigilyph	Uncommon	rsv10pt5
rsv10pt5-39	Pokémon	Yamask	Common	rsv10pt5
rsv10pt5-40	Pokémon	Cofagrigus	Rare	rsv10pt5
rsv10pt5-41	Pokémon	Gothita	Common	rsv10pt5
rsv10pt5-42	Pokémon	Gothorita	Common	rsv10pt5
rsv10pt5-43	Pokémon	Gothitelle	Rare	rsv10pt5
rsv10pt5-44	Pokémon	Frillish	Common	rsv10pt5
rsv10pt5-45	Pokémon	Jellicent ex	Double Rare	rsv10pt5
rsv10pt5-46	Pokémon	Roggenrola	Common	rsv10pt5
rsv10pt5-47	Pokémon	Boldore	Common	rsv10pt5
rsv10pt5-48	Pokémon	Gigalith	Uncommon	rsv10pt5
rsv10pt5-49	Pokémon	Sawk	Uncommon	rsv10pt5
rsv10pt5-50	Pokémon	Archen	Uncommon	rsv10pt5
rsv10pt5-51	Pokémon	Archeops	Rare	rsv10pt5
rsv10pt5-56	Pokémon	Liepard	Uncommon	rsv10pt5
rsv10pt5-72	Pokémon	Patrat	Common	rsv10pt5
rsv10pt5-57	Pokémon	Scraggy	Common	rsv10pt5
rsv10pt5-54	Pokémon	Terrakion	Rare	rsv10pt5
rsv10pt5-61	Pokémon	Zorua	Common	rsv10pt5
rsv10pt5-63	Pokémon	Vullaby	Common	rsv10pt5
rsv10pt5-64	Pokémon	Mandibuzz	Uncommon	rsv10pt5
rsv10pt5-67	Pokémon	Hydreigon ex	Double Rare	rsv10pt5
rsv10pt5-73	Pokémon	Watchog	Uncommon	rsv10pt5
rsv10pt5-59	Pokémon	Trubbish	Common	rsv10pt5
rsv10pt5-60	Pokémon	Garbodor	Uncommon	rsv10pt5
rsv10pt5-71	Pokémon	Druddigon	Uncommon	rsv10pt5
rsv10pt5-68	Pokémon	Ferroseed	Common	rsv10pt5
rsv10pt5-70	Pokémon	Durant	Uncommon	rsv10pt5
rsv10pt5-58	Pokémon	Scrafty	Uncommon	rsv10pt5
rsv10pt5-52	Pokémon	Mienfoo	Common	rsv10pt5
rsv10pt5-53	Pokémon	Mienshao	Uncommon	rsv10pt5
rsv10pt5-69	Pokémon	Ferrothorn	Uncommon	rsv10pt5
rsv10pt5-55	Pokémon	Purrloin	Common	rsv10pt5
rsv10pt5-62	Pokémon	Zoroark	Rare	rsv10pt5
rsv10pt5-65	Pokémon	Deino	Common	rsv10pt5
rsv10pt5-66	Pokémon	Zweilous	Common	rsv10pt5
rsv10pt5-75	Pokémon	Herdier	Common	rsv10pt5
rsv10pt5-74	Pokémon	Lillipup	Common	rsv10pt5
rsv10pt5-77	Pokémon	Bouffalant ex	Double Rare	rsv10pt5
rsv10pt5-78	Pokémon	Tornadus	Rare	rsv10pt5
rsv10pt5-82	Trainer	Energy Retrieval	Uncommon	rsv10pt5
rsv10pt5-83	Trainer	Harlequin	Uncommon	rsv10pt5
rsv10pt5-98	Pokémon	Emboar	Illustration Rare	rsv10pt5
rsv10pt5-100	Pokémon	Simisear	Illustration Rare	rsv10pt5
rsv10pt5-102	Pokémon	Lampent	Illustration Rare	rsv10pt5
rsv10pt5-107	Pokémon	Samurott	Illustration Rare	rsv10pt5
rsv10pt5-109	Pokémon	Ducklett	Illustration Rare	rsv10pt5
rsv10pt5-113	Pokémon	Vanilluxe	Illustration Rare	rsv10pt5
rsv10pt5-114	Pokémon	Blitzle	Illustration Rare	rsv10pt5
rsv10pt5-115	Pokémon	Zebstrika	Illustration Rare	rsv10pt5
rsv10pt5-87	Pokémon	Sewaddle	Illustration Rare	rsv10pt5
rsv10pt5-89	Pokémon	Leavanny	Illustration Rare	rsv10pt5
rsv10pt5-90	Pokémon	Cottonee	Illustration Rare	rsv10pt5
rsv10pt5-91	Pokémon	Deerling	Illustration Rare	rsv10pt5
rsv10pt5-99	Pokémon	Pansear	Illustration Rare	rsv10pt5
rsv10pt5-105	Pokémon	Oshawott	Illustration Rare	rsv10pt5
rsv10pt5-128	Pokémon	Boldore	Illustration Rare	rsv10pt5
rsv10pt5-130	Pokémon	Sawk	Illustration Rare	rsv10pt5
rsv10pt5-80	Trainer	Brave Bangle	Uncommon	rsv10pt5
rsv10pt5-81	Trainer	Cheren	Uncommon	rsv10pt5
rsv10pt5-86	Energy	Ignition Energy	Uncommon	rsv10pt5
rsv10pt5-95	Pokémon	Virizion	Illustration Rare	rsv10pt5
rsv10pt5-110	Pokémon	Swanna	Illustration Rare	rsv10pt5
rsv10pt5-116	Pokémon	Joltik	Illustration Rare	rsv10pt5
rsv10pt5-129	Pokémon	Gigalith	Illustration Rare	rsv10pt5
rsv10pt5-84	Trainer	Hilda	Uncommon	rsv10pt5
rsv10pt5-85	Trainer	Tool Scrapper	Uncommon	rsv10pt5
rsv10pt5-93	Pokémon	Shelmet	Illustration Rare	rsv10pt5
rsv10pt5-104	Pokémon	Heatmor	Illustration Rare	rsv10pt5
rsv10pt5-108	Pokémon	Basculin	Illustration Rare	rsv10pt5
rsv10pt5-122	Pokémon	Yamask	Illustration Rare	rsv10pt5
rsv10pt5-125	Pokémon	Gothorita	Illustration Rare	rsv10pt5
rsv10pt5-79	Trainer	Antique Plume Fossil	Common	rsv10pt5
rsv10pt5-88	Pokémon	Swadloon	Illustration Rare	rsv10pt5
rsv10pt5-94	Pokémon	Accelgor	Illustration Rare	rsv10pt5
rsv10pt5-97	Pokémon	Pignite	Illustration Rare	rsv10pt5
rsv10pt5-103	Pokémon	Chandelure	Illustration Rare	rsv10pt5
rsv10pt5-106	Pokémon	Dewott	Illustration Rare	rsv10pt5
rsv10pt5-126	Pokémon	Frillish	Illustration Rare	rsv10pt5
rsv10pt5-101	Pokémon	Litwick	Illustration Rare	rsv10pt5
rsv10pt5-111	Pokémon	Vanillite	Illustration Rare	rsv10pt5
rsv10pt5-127	Pokémon	Roggenrola	Illustration Rare	rsv10pt5
rsv10pt5-76	Pokémon	Stoutland	Uncommon	rsv10pt5
rsv10pt5-92	Pokémon	Sawsbuck	Illustration Rare	rsv10pt5
rsv10pt5-112	Pokémon	Vanillish	Illustration Rare	rsv10pt5
rsv10pt5-117	Pokémon	Galvantula	Illustration Rare	rsv10pt5
rsv10pt5-118	Pokémon	Stunfisk	Illustration Rare	rsv10pt5
rsv10pt5-120	Pokémon	Swoobat	Illustration Rare	rsv10pt5
rsv10pt5-123	Pokémon	Cofagrigus	Illustration Rare	rsv10pt5
rsv10pt5-96	Pokémon	Tepig	Illustration Rare	rsv10pt5
rsv10pt5-119	Pokémon	Woobat	Illustration Rare	rsv10pt5
rsv10pt5-121	Pokémon	Sigilyph	Illustration Rare	rsv10pt5
rsv10pt5-124	Pokémon	Gothita	Illustration Rare	rsv10pt5
rsv10pt5-131	Pokémon	Archen	Uncommon	rsv10pt5
rsv10pt5-134	Pokémon	Mienshao	Illustration Rare	rsv10pt5
rsv10pt5-132	Pokémon	Archeops	Illustration Rare	rsv10pt5
rsv10pt5-133	Pokémon	Mienfoo	Illustration Rare	rsv10pt5
rsv10pt5-135	Pokémon	Terrakion	Illustration Rare	rsv10pt5
rsv10pt5-136	Pokémon	Purrloin	Illustration Rare	rsv10pt5
rsv10pt5-137	Pokémon	Liepard	Illustration Rare	rsv10pt5
rsv10pt5-138	Pokémon	Scraggy	Illustration Rare	rsv10pt5
rsv10pt5-139	Pokémon	Scrafty	Illustration Rare	rsv10pt5
rsv10pt5-140	Pokémon	Trubbish	Illustration Rare	rsv10pt5
rsv10pt5-142	Pokémon	Zorua	Illustration Rare	rsv10pt5
rsv10pt5-151	Pokémon	Druddigon	Illustration Rare	rsv10pt5
rsv10pt5-143	Pokémon	Zoroark	Illustration Rare	rsv10pt5
rsv10pt5-150	Pokémon	Durant	Illustration Rare	rsv10pt5
rsv10pt5-153	Pokémon	Watchog	Illustration Rare	rsv10pt5
rsv10pt5-155	Pokémon	Herdier	Illustration Rare	rsv10pt5
rsv10pt5-162	Pokémon	Bouffalant ex	Ultra Rare	rsv10pt5
rsv10pt5-145	Pokémon	Mandibuzz	Illustration Rare	rsv10pt5
rsv10pt5-148	Pokémon	Ferroseed	Illustration Rare	rsv10pt5
rsv10pt5-154	Pokémon	Lillipup	Illustration Rare	rsv10pt5
rsv10pt5-156	Pokémon	Stoutland	Illustration Rare	rsv10pt5
rsv10pt5-159	Pokémon	Keldeo ex	Ultra Rare	rsv10pt5
rsv10pt5-144	Pokémon	Vullaby	Illustration Rare	rsv10pt5
rsv10pt5-149	Pokémon	Ferrothorn	Illustration Rare	rsv10pt5
rsv10pt5-158	Pokémon	Reshiram ex	Ultra Rare	rsv10pt5
rsv10pt5-161	Pokémon	Hydreigon ex	Ultra Rare	rsv10pt5
rsv10pt5-141	Pokémon	Garbodor	Illustration Rare	rsv10pt5
rsv10pt5-146	Pokémon	Deino	Illustration Rare	rsv10pt5
rsv10pt5-152	Pokémon	Patrat	Illustration Rare	rsv10pt5
rsv10pt5-157	Pokémon	Whimsicott ex	Ultra Rare	rsv10pt5
rsv10pt5-160	Pokémon	Jellicent ex	Ultra Rare	rsv10pt5
rsv10pt5-147	Pokémon	Zweilous	Illustration Rare	rsv10pt5
rsv10pt5-165	Pokémon	Whimsicott ex	Special Illustration Rare	rsv10pt5
rsv10pt5-163	Trainer	Harlequin	Ultra Rare	rsv10pt5
rsv10pt5-164	Trainer	Hilda	Ultra Rare	rsv10pt5
rsv10pt5-167	Pokémon	Keldeo ex	Special Illustration Rare	rsv10pt5
rsv10pt5-166	Pokémon	Reshiram ex	Special Illustration Rare	rsv10pt5
rsv10pt5-169	Pokémon	Hydreigon ex	Special Illustration Rare	rsv10pt5
rsv10pt5-168	Pokémon	Jellicent ex	Special Illustration Rare	rsv10pt5
rsv10pt5-170	Pokémon	Bouffalant ex	Special Illustration Rare	rsv10pt5
rsv10pt5-171	Trainer	Hilda	Special Illustration Rare	rsv10pt5
rsv10pt5-173	Pokémon	Reshiram ex	Black White Rare	rsv10pt5
rsv10pt5-172	Pokémon	Victini	Rare	rsv10pt5
\.


--
-- Data for Name: deck_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deck_cards (deck_id, card_id, quantity) FROM stdin;
41	rsv10pt5-1	2
41	rsv10pt5-10	1
41	rsv10pt5-100	1
\.


--
-- Data for Name: decks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.decks (id, name, description, created_at) FROM stdin;
37	fire deck	\N	2026-01-06 18:40:48.838224
39	temp deck	\N	2026-01-06 19:27:06.775446
40	water deck	\N	2026-01-06 19:36:47.387541
41	Demo Deck	Deck seeded by SeedAll	2026-01-06 20:03:13.739428
\.


--
-- Data for Name: sets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sets (id, name, release_year) FROM stdin;
base1	Base	1999
base2	Jungle	1999
basep	Wizards Black Star Promos	1999
base3	Fossil	1999
base4	Base Set 2	2000
base5	Team Rocket	2000
gym1	Gym Heroes	2000
gym2	Gym Challenge	2000
neo1	Neo Genesis	2000
neo2	Neo Discovery	2001
si1	Southern Islands	2001
neo3	Neo Revelation	2001
neo4	Neo Destiny	2002
base6	Legendary Collection	2002
ecard1	Expedition Base Set	2002
ecard2	Aquapolis	2003
ecard3	Skyridge	2003
ex1	Ruby & Sapphire	2003
ex2	Sandstorm	2003
ex3	Dragon	2003
np	Nintendo Black Star Promos	2003
ex4	Team Magma vs Team Aqua	2004
ex5	Hidden Legends	2004
ex6	FireRed & LeafGreen	2004
pop1	POP Series 1	2004
ex7	Team Rocket Returns	2004
ex8	Deoxys	2005
ex9	Emerald	2005
ex10	Unseen Forces	2005
pop2	POP Series 2	2005
ex11	Delta Species	2005
ex12	Legend Maker	2006
pop3	POP Series 3	2006
ex13	Holon Phantoms	2006
ex14	Crystal Guardians	2006
pop4	POP Series 4	2006
ex15	Dragon Frontiers	2006
pop5	POP Series 5	2007
ex16	Power Keepers	2007
dp1	Diamond & Pearl	2007
dpp	DP Black Star Promos	2007
dp2	Mysterious Treasures	2007
pop6	POP Series 6	2007
dp3	Secret Wonders	2007
dp4	Great Encounters	2008
pop7	POP Series 7	2008
dp5	Majestic Dawn	2008
dp6	Legends Awakened	2008
pop8	POP Series 8	2008
dp7	Stormfront	2008
pl1	Platinum	2009
pop9	POP Series 9	2009
pl2	Rising Rivals	2009
pl3	Supreme Victors	2009
pl4	Arceus	2009
ru1	Pokémon Rumble	2009
hgss1	HeartGold & SoulSilver	2010
hsp	HGSS Black Star Promos	2010
hgss2	HS—Unleashed	2010
hgss3	HS—Undaunted	2010
hgss4	HS—Triumphant	2010
col1	Call of Legends	2011
bwp	BW Black Star Promos	2011
bw1	Black & White	2011
mcd11	McDonald's Collection 2011	2011
bw2	Emerging Powers	2011
bw3	Noble Victories	2011
bw4	Next Destinies	2012
bw5	Dark Explorers	2012
mcd12	McDonald's Collection 2012	2012
bw6	Dragons Exalted	2012
dv1	Dragon Vault	2012
bw7	Boundaries Crossed	2012
bw8	Plasma Storm	2013
bw9	Plasma Freeze	2013
bw10	Plasma Blast	2013
xyp	XY Black Star Promos	2013
bw11	Legendary Treasures	2013
xy0	Kalos Starter Set	2013
xy1	XY	2014
xy2	Flashfire	2014
xy3	Furious Fists	2014
xy4	Phantom Forces	2014
xy5	Primal Clash	2015
dc1	Double Crisis	2015
xy6	Roaring Skies	2015
xy7	Ancient Origins	2015
xy8	BREAKthrough	2015
xy9	BREAKpoint	2016
g1	Generations	2016
xy10	Fates Collide	2016
xy11	Steam Siege	2016
mcd16	McDonald's Collection 2016	2016
xy12	Evolutions	2016
sm1	Sun & Moon	2017
smp	SM Black Star Promos	2017
sm2	Guardians Rising	2017
sm3	Burning Shadows	2017
sm35	Shining Legends	2017
sm4	Crimson Invasion	2017
sm5	Ultra Prism	2018
sm6	Forbidden Light	2018
sm7	Celestial Storm	2018
sm75	Dragon Majesty	2018
sm8	Lost Thunder	2018
sm9	Team Up	2019
det1	Detective Pikachu	2019
sm10	Unbroken Bonds	2019
sm11	Unified Minds	2019
sm115	Hidden Fates	2019
sma	Hidden Fates Shiny Vault	2019
mcd19	McDonald's Collection 2019	2019
sm12	Cosmic Eclipse	2019
swshp	SWSH Black Star Promos	2019
swsh1	Sword & Shield	2020
swsh2	Rebel Clash	2020
swsh3	Darkness Ablaze	2020
swsh35	Champion's Path	2020
swsh4	Vivid Voltage	2020
swsh45	Shining Fates	2021
swsh45sv	Shining Fates Shiny Vault	2021
swsh5	Battle Styles	2021
swsh6	Chilling Reign	2021
swsh7	Evolving Skies	2021
cel25	Celebrations	2021
cel25c	Celebrations: Classic Collection	2021
mcd14	McDonald's Collection 2014	2014
mcd15	McDonald's Collection 2015	2015
mcd18	McDonald's Collection 2018	2018
mcd17	McDonald's Collection 2017	2017
mcd21	McDonald's Collection 2021	2021
bp	Best of Game	2002
swsh8	Fusion Strike	2021
fut20	Pokémon Futsal Collection	2020
tk1a	EX Trainer Kit Latias	2004
tk1b	EX Trainer Kit Latios	2004
tk2a	EX Trainer Kit 2 Plusle	2006
tk2b	EX Trainer Kit 2 Minun	2006
swsh9	Brilliant Stars	2022
swsh9tg	Brilliant Stars Trainer Gallery	2022
swsh10	Astral Radiance	2022
swsh10tg	Astral Radiance Trainer Gallery	2022
pgo	Pokémon GO	2022
swsh11	Lost Origin	2022
swsh11tg	Lost Origin Trainer Gallery	2022
swsh12	Silver Tempest	2022
swsh12tg	Silver Tempest Trainer Gallery	2022
mcd22	McDonald's Collection 2022	2022
swsh12pt5	Crown Zenith	2023
swsh12pt5gg	Crown Zenith Galarian Gallery	2023
sv1	Scarlet & Violet	2023
svp	Scarlet & Violet Black Star Promos	2023
sv2	Paldea Evolved	2023
sve	Scarlet & Violet Energies	2023
sv3	Obsidian Flames	2023
sv3pt5	151	2023
sv4	Paradox Rift	2023
sv4pt5	Paldean Fates	2024
sv5	Temporal Forces	2024
sv6	Twilight Masquerade	2024
sv6pt5	Shrouded Fable	2024
sv7	Stellar Crown	2024
sv8	Surging Sparks	2024
sv8pt5	Prismatic Evolutions	2025
sv9	Journey Together	2025
sv10	Destined Rivals	2025
zsv10pt5	Black Bolt	2025
rsv10pt5	White Flare	2025
me1	Mega Evolution	2025
me2	Phantasmal Flames	2025
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, password, username) FROM stdin;
\.


--
-- Name: decks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.decks_id_seq', 42, true);


--
-- Name: users_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_seq', 1, false);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: deck_cards deck_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deck_cards
    ADD CONSTRAINT deck_cards_pkey PRIMARY KEY (deck_id, card_id);


--
-- Name: decks decks_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decks
    ADD CONSTRAINT decks_name_key UNIQUE (name);


--
-- Name: decks decks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decks
    ADD CONSTRAINT decks_pkey PRIMARY KEY (id);


--
-- Name: sets sets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_pkey PRIMARY KEY (id);


--
-- Name: users ukr43af9ap4edm43mmtq01oddj6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: deck_cards deck_cards_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deck_cards
    ADD CONSTRAINT deck_cards_card_id_fkey FOREIGN KEY (card_id) REFERENCES public.cards(id) ON DELETE CASCADE;


--
-- Name: deck_cards deck_cards_deck_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deck_cards
    ADD CONSTRAINT deck_cards_deck_id_fkey FOREIGN KEY (deck_id) REFERENCES public.decks(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict JvTDv8iTO3cfLrkS6rjapQXbyq4ppscfvC0kyA4WlJKcX5YPfaLQrbyVZMZHes8

