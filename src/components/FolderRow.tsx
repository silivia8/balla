import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import { Folder } from '../types';
import { FolderCard } from './FolderCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface FolderRowProps {
  title: string;
  folders: Folder[];
}

export function FolderRow({ title, folders }: FolderRowProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-white/90 px-2">{title}</h2>
        <button className="text-xs font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors mr-10">
          View All
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        spaceBetween={20}
        slidesPerView={'auto'}
        mousewheel={{ forceToAxis: true }}
        className="folder-swiper !overflow-visible"
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 15 },
          640: { slidesPerView: 2.5, spaceBetween: 20 },
          1024: { slidesPerView: 3.5, spaceBetween: 25 },
          1440: { slidesPerView: 4.5, spaceBetween: 30 },
        }}
      >
        {folders.map((folder) => (
          <SwiperSlide key={folder.id} className="!w-auto">
            <FolderCard folder={folder} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
