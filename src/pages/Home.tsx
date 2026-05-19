import React from 'react';
import { Folder } from '../types';
import { Hero } from '../components/Hero';
import { FolderRow } from '../components/FolderRow';

interface HomeProps {
  folders: Folder[];
}

export function Home({ folders }: HomeProps) {
  // Group folders by category if needed, or just show rows
  const categories = Array.from(new Set(folders.map(f => f.category || 'General')));

  return (
    <div className="pb-20">
      <Hero featuredFolder={folders[0]} />
      
      <div className="px-6 md:px-10 -mt-20 md:-mt-32 relative z-10 space-y-12">
        <FolderRow title="Recently Added" folders={folders.slice(0, 4)} />
        
        {categories.map(category => {
          const catFolders = folders.filter(f => f.category === category);
          if (catFolders.length === 0) return null;
          return (
            <div key={category}>
              <FolderRow 
                title={category} 
                folders={catFolders} 
              />
            </div>
          );
        })}

        <FolderRow title="Exploration" folders={[...folders].reverse()} />
      </div>
    </div>
  );
}
