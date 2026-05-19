import React from 'react';
import { Folder } from '../types';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Folder as FolderIcon, ImageIcon } from 'lucide-react';

interface FolderCardProps {
  folder: Folder;
}

export function FolderCard({ folder }: FolderCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-64 md:w-80 group cursor-pointer"
      onClick={() => navigate(`/folder/${folder.id}`)}
    >
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 shadow-2xl transition-all duration-300 group-hover:shadow-white/5 border border-white/10 group-hover:border-white/20">
        <img 
          src={folder.coverImage} 
          alt={folder.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
        
        {/* Meta Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-md">{folder.name}</h3>
              <div className="flex items-center gap-2 mt-1 text-white/60 text-xs font-medium uppercase tracking-wider">
                <ImageIcon className="w-3 h-3" />
                {folder.imageCount} Images
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
              <FolderIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
