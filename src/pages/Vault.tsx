import React, { useState } from 'react';
import { Folder } from '../types';
import { FolderCard } from '../components/FolderCard';
import { LayoutGrid, List, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface VaultProps {
  folders: Folder[];
}

export function Vault({ folders }: VaultProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredFolders = folders.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 px-6 md:px-10 pb-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">MY VAULT</h1>
            <p className="text-white/50 text-lg max-w-xl">
              All your curated collections stored in high definition. Access any folder to view the moments within.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                placeholder="Find a collection..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-white/20 transition-all outline-none text-white"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFolders.map((folder, index) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <FolderCard folder={folder} />
            </motion.div>
          ))}
        </div>

        {filteredFolders.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-xl font-bold text-white/60">No collections found</h3>
            <p className="text-white/30 truncate px-4">Try searching for something else or browse categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}
