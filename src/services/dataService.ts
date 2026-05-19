import { Folder, ImageMetadata } from '../types';

export async function fetchFolders(): Promise<Folder[]> {
  try {
    const response = await fetch('/data/index.txt');
    if (!response.ok) throw new Error('Failed to fetch folder index');
    const text = await response.text();
    const folderFiles = text.split('\n').map(f => f.trim()).filter(f => f && f.endsWith('.txt'));

    const folderPromises = folderFiles.map(async (file): Promise<Folder | null> => {
      const name = file.replace('.txt', '');
      const folderResponse = await fetch(`/data/${file}`);
      if (!folderResponse.ok) return null;
      
      const folderText = await folderResponse.text();
      const images: ImageMetadata[] = folderText.split('\n')
        .map(line => line.trim())
        .filter(line => line.includes('|'))
        .map(line => {
          const [url, title, description] = line.split('|');
          return { url, title, description };
        });

      if (images.length === 0) return null;

      return {
        id: name.toLowerCase(),
        name,
        coverImage: images[0].url,
        imageCount: images.length,
        images,
        category: getCategoryForFolder(name)
      };
    });

    const folders = await Promise.all(folderPromises);
    return folders.filter((f): f is Folder => f !== null);
  } catch (error) {
    console.error('Error fetching folders:', error);
    return [];
  }
}

function getCategoryForFolder(name: string): string {
  const categories: Record<string, string> = {
    'Nature': 'Outdoors',
    'Travel': 'Destinations',
    'Architecture': 'Urban',
    'Cityscapes': 'Urban',
  };
  return categories[name] || 'General';
}
