import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function GameModal({ game, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0);

  if (!game) return null;

  const reloadGame = () => setKey(prev => prev + 1);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className={`relative bg-brand-surface border-4 border-white/10 flex flex-col w-full max-w-6xl overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'fixed inset-0 m-0 max-w-none rounded-none border-0' : 'h-[85vh] rounded-3xl'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-brand-surface z-10">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{game.title}</h2>
              <span className="hidden sm:inline-block caps-meta text-brand-green">
                Sector: {game.category}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={reloadGame}
                className="caps-meta text-white/30 hover:text-brand-green transition-colors"
                title="REBOOT"
              >
                Reboot
              </button>
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="caps-meta text-white/30 hover:text-brand-green transition-colors"
                title="EXPAND"
              >
                Expand
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-white/5 hover:bg-brand-green hover:text-black caps-meta transition-all"
                title="TERMINATE"
              >
                Close
              </button>
            </div>
          </div>

          {/* Game View */}
          <div className="flex-1 bg-black relative">
            <iframe
              key={key}
              src={game.url}
              className="w-full h-full border-0"
              allowFullScreen
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Footer (Info) */}
          {!isFullscreen && (
            <div className="p-6 border-t border-white/10 bg-brand-surface flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="h-1 w-6 bg-brand-green" />
                <p className="caps-meta text-white/30">{game.description}</p>
              </div>
              <div className="caps-meta text-white/10">
                HOST: {new URL(game.url).hostname}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
