import { GalleryItem, WishMessage } from './types';

const generateGallery = (): GalleryItem[] => {
  const items: GalleryItem[] = Array.from({ length: 32 }, (_, i) => {
    const categories: ('memories' | 'adventures' | 'candids')[] = ['memories', 'adventures', 'candids'];
    return {
      id: (i + 1).toString(),
      url: `/photos/${i + 1}.jpeg`,
      title: `Beautiful Moment ${i + 1}`,
      category: categories[i % 3]
    };
  });
  
  // Fisher-Yates shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

export const GALLERY_IMAGES: GalleryItem[] = generateGallery();

export const INITIAL_WISHES: WishMessage[] = [
  { id: 'w1', name: 'Amirthavarshini KS', message: 'Stay crazy, stay awesome, and keep shining!', timestamp: '', avatarColor: '' },
  { id: 'w2', name: 'Sajitha', message: 'May your day be as sweet as your smile.', timestamp: '', avatarColor: '' },
  { id: 'w3', name: 'Sanjay Anna', message: 'May your smile never fade and your heart always stay full of love.', timestamp: '', avatarColor: '' },
  { id: 'w4', name: 'Abhisheik Raja ST', message: 'Ur wish is my Command', timestamp: '', avatarColor: '' },
  { id: 'w5', name: 'Hanishka', message: 'Happy Birthday, bestie! Let\'s make today unforgettable.', timestamp: '', avatarColor: '' },
  { id: 'w6', name: 'Delphine', message: 'You will always be our little princess. Have a wonderful birthday!', timestamp: '', avatarColor: '' },
  { id: 'w7', name: 'Dhana Priya', message: 'May God bless you with good health, endless joy, and all your dreams come true.', timestamp: '', avatarColor: '' },
  { id: 'w8', name: 'Barath Muthu', message: 'Wishing you lots of laughter, adventures, and amazing memories this year.', timestamp: '', avatarColor: '' },
  { id: 'w9', name: 'Anitha', message: 'Wishing you a fantastic birthday and a successful year ahead.', timestamp: '', avatarColor: '' },
  { id: 'w10', name: 'Mithra', message: 'You are my favorite person, my safe place, and my biggest happiness. I love you.', timestamp: '', avatarColor: '' },
  { id: 'w11', name: 'Kavya Sri', message: 'Every moment with you is a blessing. I can\'t wait to celebrate many more birthdays together.', timestamp: '', avatarColor: '' },
  { id: 'w12', name: 'Vasundhara', message: 'Happy Birthday, my love. You make every day brighter just by being in it.', timestamp: '', avatarColor: '' }
];
