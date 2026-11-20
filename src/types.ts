export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'memories' | 'adventures' | 'candids';
}

export interface WishMessage {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatarColor: string;
}
