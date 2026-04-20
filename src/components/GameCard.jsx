import { motion } from 'motion/react';

export default function GameCard({ game, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className="group relative bg-brand-surface rounded-xl overflow-hidden border border-white/10 cursor-pointer transition-all hover:border-brand-green"
      onClick={() => onClick(game)}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={game.thumbnail}
          alt={game.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
      </div>
      
      <div className="p-6">
        <div className="h-1.5 w-full bg-white/5 mb-4 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-white/20" 
          />
        </div>
        <h3 className="text-xl font-black italic uppercase leading-none group-hover:text-brand-green transition-colors">
          {game.title}
        </h3>
        <span className="text-[10px] text-brand-green font-bold uppercase mt-2 tracking-widest block">
          {game.category}
        </span>
      </div>
    </motion.div>
  );
}
