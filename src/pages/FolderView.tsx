import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Folder, ImageMetadata, LayoutMode } from '../types';
import { ArrowLeft, LayoutGrid, Grid3x3, ZoomIn, Share2, Download, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

interface FolderViewProps {
  folders: Folder[];
}

export function FolderView({ folders }: FolderViewProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [layout, setLayout] = useState<LayoutMode>('masonry');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const folder = folders.find(f => f.id === id);

  if (!folder) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-2xl font-bold text-white/40">Folder not found</h2>
        <button onClick={() => navigate('/')} className="text-white hover:underline underline-offset-4">Return Home</button>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 md:px-10 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <button 
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium uppercase tracking-widest">Back</span>
            </button>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">{folder.name.toUpperCase()}</h1>
            <div className="flex items-center gap-4 text-white/50 text-sm font-medium uppercase tracking-wider">
              <span>{folder.imageCount} Moments</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{folder.category}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setLayout('masonry')}
              className={cn(
                "p-2 rounded-lg transition-all",
                layout === 'masonry' ? "bg-white text-black shadow-lg shadow-white/10" : "text-white/40 hover:text-white"
              )}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setLayout('grid')}
              className={cn(
                "p-2 rounded-lg transition-all",
                layout === 'grid' ? "bg-white text-black shadow-lg shadow-white/10" : "text-white/40 hover:text-white"
              )}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={cn(
          "gap-6",
          layout === 'grid' 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
            : "columns-2 md:columns-3 lg:columns-4 space-y-6"
        )}>
          {folder.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                "relative group cursor-zoom-in rounded-2xl overflow-hidden bg-white/5 border border-white/10 break-inside-avoid",
                layout === 'masonry' ? "mb-6" : ""
              )}
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-lg mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {image.title}
                </h4>
                <div className="flex items-center gap-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <button className="p-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors ml-auto">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <ImageViewer 
            images={folder.images} 
            initialIndex={selectedImageIndex} 
            onClose={() => setSelectedImageIndex(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ImageViewer({ images, initialIndex, onClose }: { images: ImageMetadata[], initialIndex: number, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col"
    >
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-[110]">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all">
            <X className="w-6 h-6" />
          </button>
          <div className="hidden md:block">
            <h3 className="text-white font-bold">Image Preview</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 w-full h-full relative group">
        <Swiper
          modules={[Navigation, Pagination, Keyboard, Zoom]}
          initialSlide={initialIndex}
          keyboard={{ enabled: true }}
          navigation={{
            prevEl: '.viewer-prev',
            nextEl: '.viewer-next',
          }}
          zoom={{ maxRatio: 3 }}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center p-4 md:p-20">
              <div className="swiper-zoom-container flex flex-col items-center gap-6">
                <img src={image.url} alt={image.title} className="max-h-[80vh] w-auto rounded-lg shadow-2xl object-contain" />
                <div className="max-w-2xl text-center space-y-2">
                  <h2 className="text-2xl font-bold text-white">{image.title}</h2>
                  <p className="text-white/40 text-sm md:text-base leading-relaxed">{image.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <button className="viewer-prev absolute left-6 top-1/2 -translate-y-1/2 z-[110] p-4 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-xl border border-white/5 text-white opacity-0 group-hover:opacity-100 transition-all pointer-events-auto">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button className="viewer-next absolute right-6 top-1/2 -translate-y-1/2 z-[110] p-4 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-xl border border-white/5 text-white opacity-0 group-hover:opacity-100 transition-all pointer-events-auto">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </motion.div>
  );
}
