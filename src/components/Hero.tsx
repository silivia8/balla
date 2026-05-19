import React from 'react';
import { Folder } from '../types';
import { Play, Info, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  featuredFolder?: Folder;
}

export function Hero({ featuredFolder }: HeroProps) {
  const navigate = useNavigate();
  if (!featuredFolder) return null;

  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img 
          src={featuredFolder.coverImage} 
          alt={featuredFolder.name} 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 md:px-14 max-w-4xl space-y-4 md:space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-white/80 mb-2">
            <ImageIcon className="w-3 h-3" />
            Featured Collection
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            {featuredFolder.name.toUpperCase()}
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-white/70 line-clamp-3 mt-4 font-medium leading-relaxed">
            Experience the mesmerizing beauty of {featuredFolder.name.toLowerCase()}. 
            A curated selection of {featuredFolder.imageCount} stunning moments captured in high definition.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button 
              onClick={() => navigate(`/folder/${featuredFolder.id}`)}
              className="px-8 py-3 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              Open Vault
            </button>
            <button className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold flex items-center gap-2 hover:bg-white/20 transition-all">
              <Info className="w-5 h-5" />
              Collection Info
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
