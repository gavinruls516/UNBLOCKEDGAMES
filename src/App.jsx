/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Gamepad2, LayoutGrid, Info, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';
import GameCard from './components/GameCard.jsx';
import GameModal from './components/GameModal.jsx';

const CATEGORIES = ['All', 'Puzzle', 'Action', 'Arcade', 'Retro'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col font-sans border-8 border-white/5">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-end p-8 md:p-12 pb-8 gap-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-3 w-3 bg-brand-green rounded-full shadow-[0_0_10px_#00FF41]"></span>
            <span className="caps-meta text-white/50">System Online</span>
          </div>
          <h1 className="text-6xl md:text-8xl heading-bold">
            Nova<br/><span className="neon-text">Arcane</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-[400px] mb-2">
          <div className="relative group">
            <input
              type="text"
              placeholder="FIND A TITLE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border-b-4 border-white/20 p-4 pt-6 focus:border-brand-green outline-none text-2xl font-black placeholder:text-white/10 transition-all uppercase italic"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-green transition-colors">
              <Search size={32} strokeWidth={3} />
            </div>
          </div>
        </div>
      </header>

      {/* Categories Toolbar */}
      <nav className="px-8 md:px-12 py-6 border-y border-white/10 flex flex-wrap items-center gap-x-10 gap-y-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
              selectedCategory === cat
                ? 'text-brand-green'
                : 'text-white/30 hover:text-white'
            }`}
          >
            {cat} Titles
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-8 md:px-12 py-12">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-4xl font-black italic uppercase tracking-tight">
            {selectedCategory === 'All' ? 'Latest Releases' : `Sector: ${selectedCategory}`}
          </h2>
          <div className="flex items-center gap-2">
            <span className="h-1 w-8 bg-brand-green" />
            <p className="caps-meta text-white/20">
              {filteredGames.length} Records Found
            </p>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={setSelectedGame} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGames.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <h3 className="text-3xl heading-bold opacity-20">No data detected</h3>
            <p className="caps-meta text-white/10 mt-4">Initialize new search parameters</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-8 md:p-12 pt-0">
        <div className="border-t border-white/10 pt-8 flex justify-between items-center text-white/10">
          <div className="flex gap-10">
            <span className="caps-meta">UNBLOCKED HUB</span>
            <span className="caps-meta">SECURITY CLEARANCE LEVEL 4</span>
          </div>
          <div className="caps-meta uppercase">
            ARCANE.CORE.v2.4.0 &copy; 2026
          </div>
        </div>
      </footer>

      {/* Game Player Modal */}
      <GameModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
}
