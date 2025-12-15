import alami1 from '@/assets/alami-1.jpg';
import alami2 from '@/assets/alami-2.jpg';
import alami3 from '@/assets/alami-3.jpg';
import bennani1 from '@/assets/bennani-1.jpg';
import bennani2 from '@/assets/bennani-2.jpg';
import idrissi1 from '@/assets/idrissi-1.jpg';
import tazi1 from '@/assets/tazi-1.jpg';
import tazi2 from '@/assets/tazi-2.jpg';
import chraibi1 from '@/assets/chraibi-1.jpg';
import chraibi2 from '@/assets/chraibi-2.jpg';
import chraibi3 from '@/assets/chraibi-3.jpg';

export const mockHosts = [
  {
    id: '1',
    familyName: 'Famille Alami',
    city: 'Marrakech',
    languages: ['Français', 'Arabe', 'Anglais'],
    description: 'Bienvenue dans notre maison traditionnelle au cœur de la médina. Nous préparons des plats authentiques transmis de génération en génération.',
    pricePerPerson: 250,
    photos: [alami1, alami2, alami3],
    rating: 4.8,
    reviewCount: 24,
    isVerified: true,
    availability: ['2025-12-05', '2025-12-06', '2025-12-07', '2025-12-10'],
  },
  {
    id: '2',
    familyName: 'Famille Bennani',
    city: 'Fès',
    languages: ['Français', 'Arabe'],
    description: 'Découvrez la gastronomie fassi dans notre riad centenaire. Spécialités: pastilla, tajine aux pruneaux.',
    pricePerPerson: 300,
    photos: [bennani1, bennani2],
    rating: 4.9,
    reviewCount: 31,
    isVerified: true,
    availability: ['2025-12-05', '2025-12-08', '2025-12-09'],
  },
  {
    id: '3',
    familyName: 'Famille Idrissi',
    city: 'Casablanca',
    languages: ['Français', 'Arabe', 'Anglais', 'Espagnol'],
    description: 'Repas convivial dans notre appartement moderne. Cuisine casablancaise contemporaine avec des touches traditionnelles.',
    pricePerPerson: 200,
    photos: [idrissi1],
    rating: 4.6,
    reviewCount: 18,
    isVerified: false,
    availability: ['2025-12-06', '2025-12-07', '2025-12-11'],
  },
  {
    id: '4',
    familyName: 'Famille Tazi',
    city: 'Rabat',
    languages: ['Français', 'Arabe', 'Anglais'],
    description: 'Partage familial dans notre maison avec vue sur l\'océan. Menu varié incluant poisson frais et couscous royal.',
    pricePerPerson: 280,
    photos: [tazi1, tazi2],
    rating: 4.7,
    reviewCount: 22,
    isVerified: true,
    availability: ['2025-12-05', '2025-12-09', '2025-12-12'],
  },
  {
    id: '5',
    familyName: 'Famille Chraibi',
    city: 'Marrakech',
    languages: ['Français', 'Arabe'],
    description: 'Expérience authentique dans notre dar traditionnel. Cuisine végétarienne et plats traditionnels sur demande.',
    pricePerPerson: 220,
    photos: [chraibi1, chraibi2, chraibi3],
    rating: 4.9,
    reviewCount: 35,
    isVerified: true,
    availability: ['2025-12-06', '2025-12-08', '2025-12-10', '2025-12-13'],
  },
];

export const mockReviews = [
  {
    id: '1',
    authorName: 'Marie D.',
    rating: 5,
    date: '2025-11-15',
    comment: 'Expérience inoubliable! La famille était chaleureuse et la nourriture délicieuse.',
  },
  {
    id: '2',
    authorName: 'John S.',
    rating: 5,
    date: '2025-11-10',
    comment: 'Amazing authentic experience. Highly recommended!',
  },
  {
    id: '3',
    authorName: 'Sophie L.',
    rating: 4,
    date: '2025-11-05',
    comment: 'Très bon moment, cuisine excellente. Petite attente mais ça valait le coup.',
  },
];

export type Booking = {
  id: string;
  hostId: string;
  hostName: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  notes?: string;
};

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    hostId: '1',
    hostName: 'Famille Alami',
    date: '2025-12-10',
    time: '19:00',
    guests: 4,
    status: 'confirmed',
    totalPrice: 1000,
  },
  {
    id: 'b2',
    hostId: '2',
    hostName: 'Famille Bennani',
    date: '2025-12-15',
    time: '20:00',
    guests: 2,
    status: 'pending',
    totalPrice: 600,
  },
];
