export interface ImageMetadata {
  url: string;
  title: string;
  description?: string;
  tags?: string[];
}

export interface Folder {
  id: string;
  name: string;
  coverImage: string;
  imageCount: number;
  images: ImageMetadata[];
  category?: string;
}

export type LayoutMode = 'grid' | 'masonry';
