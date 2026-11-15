import realPradoBlackImg from '../assets/images/real_prado_black.jpg';
import freshWeddingPradoWhiteImg from '../assets/images/fresh_wedding_prado_white_1794745065949.jpg';
import freshWeddingPradoBlackImg from '../assets/images/fresh_wedding_prado_black_1794745066392.jpg';
import exactHiluxVigoImg from '../assets/images/exact_hilux_vigo_1794744775635.jpg';
import exactMercedesSClassImg from '../assets/images/exact_mercedes_sclass_1794744776207.jpg';
import bmwI7Img from '../assets/images/fleet_bmw_i7_1794744098872.jpg';
import exactWeddingCopenImg from '../assets/images/exact_wedding_copen_robe_1794744777260.jpg';
import exactWeddingAudiImg from '../assets/images/exact_wedding_audi_b9_1794744777585.jpg';
import exactWeddingCorollaImg from '../assets/images/exact_wedding_corolla_2016_1794744778008.jpg';
import realBusAcCoachImg from '../assets/images/fresh_bus_ac_coach_1794746151221.jpg';
import realBusRedCoachImg from '../assets/images/fresh_bus_red_coach_1794746150309.jpg';

export type VehicleCategory =
  | 'All'
  | 'Luxury VIP'
  | 'SUVs & 4x4'
  | 'Sedans & Convertibles'
  | 'Buses & Coaches';

export type DriveMode = 'chauffeur' | 'self-drive';

export interface Vehicle {
  id: string;
  name: string;
  category: Exclude<VehicleCategory, 'All'>;
  image: string;
  seats: number;
  transmission: string;
  engine: string;
  selfDriveAllowed: boolean;
  idealFor: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  name: 'M.Husnain Rent A Car',
  city: 'Karachi',
  address: 'House No 36, Town, Aligarh Bazar Sector 6 Orangi Town, Karachi, 75800',
  shortAddress: 'House No 36, Aligarh Bazar, Sector 6, Orangi Town, Karachi',
  phoneDisplay: '0312-0281033',
  phoneRaw: '03120281033',
  whatsappIntl: '923120281033',
  email: 'husniancheepa11@gmail.com',
  mapsUrl: 'https://share.google/8dEwK2vQKDsQzhgDU',
  hours: 'Open 24/7 – Available Anytime for Your Journey',
};

export const HERO_IMAGE = bmwI7Img;

export const WEDDING_DECOR_IMAGES = [
  {
    src: exactWeddingCopenImg,
    alt: 'White Daihatsu Copen Robe convertible decorated with white floral garland for wedding entry',
  },
  {
    src: exactWeddingAudiImg,
    alt: 'White Audi A4 decorated with red and pink rose bouquet and red tulle bow',
  },
  {
    src: freshWeddingPradoBlackImg,
    alt: 'Black Toyota Prado decorated with fresh roses and satin ribbon for Baraat',
  },
  {
    src: freshWeddingPradoWhiteImg,
    alt: 'White Toyota Prado decorated with fresh floral arrangements for wedding events',
  },
];

export const WEDDING_DECOR_STYLES = [
  {
    name: 'Fresh Rose & Ribbon',
    detail: 'Red, pink, and white roses with satin ribbons on hood, mirrors, and doors',
  },
  {
    name: 'Convertible & Luxury Floral',
    detail: 'White floral garlands and tulle bows tailored for Copen, Audi, Mercedes & BMW',
  },
  {
    name: 'Full Baraat Protocol',
    detail: 'Complete bonnet arrangement for Prado & executive sedans with matching decor',
  },
];

export const FLEET_CATEGORIES: VehicleCategory[] = [
  'All',
  'Luxury VIP',
  'SUVs & 4x4',
  'Sedans & Convertibles',
  'Buses & Coaches',
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'toyota-prado',
    name: 'Toyota Prado TX / TZ',
    category: 'SUVs & 4x4',
    image: realPradoBlackImg,
    seats: 7,
    transmission: 'Automatic 4WD',
    engine: '2700cc / 4000cc',
    selfDriveAllowed: false,
    idealFor: 'VIP protocol, weddings & intercity travel',
  },
  {
    id: 'mercedes-sclass',
    name: 'Mercedes-Benz S-Class S400',
    category: 'Luxury VIP',
    image: exactMercedesSClassImg,
    seats: 5,
    transmission: 'Automatic',
    engine: 'V6 / Hybrid',
    selfDriveAllowed: false,
    idealFor: 'Shadi, VIP duty, shoots & executive arrivals',
  },
  {
    id: 'bmw-i7',
    name: 'BMW i7 Flagship',
    category: 'Luxury VIP',
    image: bmwI7Img,
    seats: 5,
    transmission: 'Automatic',
    engine: 'Flagship Electric',
    selfDriveAllowed: false,
    idealFor: 'Groom entry, corporate VIPs & luxury shoots',
  },
  {
    id: 'toyota-hilux-vigo',
    name: 'Toyota Hilux Vigo 4x4',
    category: 'SUVs & 4x4',
    image: exactHiluxVigoImg,
    seats: 5,
    transmission: 'Automatic 4x4',
    engine: '3000cc Diesel',
    selfDriveAllowed: false,
    idealFor: 'Protocol escort, off-road & Northern Areas tours',
  },
  {
    id: 'audi-a4',
    name: 'Audi A4 Sedan',
    category: 'Luxury VIP',
    image: exactWeddingAudiImg,
    seats: 5,
    transmission: 'Automatic',
    engine: '1400cc / 2000cc TFSI',
    selfDriveAllowed: false,
    idealFor: 'Weddings, Baraat entry & executive travel',
  },
  {
    id: 'daihatsu-copen',
    name: 'Daihatsu Copen Convertible',
    category: 'Sedans & Convertibles',
    image: exactWeddingCopenImg,
    seats: 2,
    transmission: 'Automatic',
    engine: '660cc Turbo',
    selfDriveAllowed: false,
    idealFor: 'Open-top groom entry, shoots & special occasions',
  },
  {
    id: 'toyota-corolla',
    name: 'Toyota Corolla GLi / Altis',
    category: 'Sedans & Convertibles',
    image: exactWeddingCorollaImg,
    seats: 5,
    transmission: 'Automatic / Manual',
    engine: '1300cc / 1600cc',
    selfDriveAllowed: true,
    idealFor: 'City rides, weddings, family & airport pickups',
  },
  {
    id: 'daewoo-euro2-coach',
    name: 'Daewoo Euro 2 AC Coach',
    category: 'Buses & Coaches',
    image: realBusAcCoachImg,
    seats: 45,
    transmission: 'Manual · Full AC',
    engine: 'Euro 2 Diesel',
    selfDriveAllowed: false,
    idealFor: 'Outstation group tours, corporate trips & Baraat guests',
  },
  {
    id: 'hino-passenger-bus',
    name: 'Hino Passenger Coach Bus',
    category: 'Buses & Coaches',
    image: realBusRedCoachImg,
    seats: 40,
    transmission: 'Manual',
    engine: 'Hino Diesel',
    selfDriveAllowed: false,
    idealFor: 'Wedding Baraat, family picnics & staff transport',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Chauffeur & Self-Drive',
    description:
      'Uniformed, experienced drivers for VIPs and families, plus self-drive option on Corolla.',
  },
  {
    number: '02',
    title: '24/7 Airport Transfers',
    description:
      'Punctual pickups and drop-offs at Jinnah International Airport, day or night.',
  },
  {
    number: '03',
    title: 'Shadi, Duty & Shoots',
    description:
      'Mercedes S-Class, BMW i7, Prado, Audi A4, Copen Convertible, and Corolla for events and shoots.',
  },
  {
    number: '04',
    title: 'Outstation & Group Buses',
    description:
      'Prado, Hilux Vigo 4x4, and AC/Non-AC passenger coaches for family picnics, Baraat guests, and tours.',
  },
];

export const KARACHI_AREAS: string[] = [
  'Orangi Town (Sector 6 Hub)',
  'North Nazimabad',
  'Nazimabad',
  'Gulshan-e-Iqbal',
  'Gulistan-e-Johar',
  'Federal B Area',
  'Saddar & I.I. Chundrigar',
  'PECHS & Bahadurabad',
  'Clifton & DHA Phase 1–8',
  'Shahrah-e-Faisal',
  'Jinnah International Airport',
  'Malir & Korangi',
];

export const OUTSTATION_DESTINATIONS: string[] = [
  'Hyderabad & Jamshoro',
  'Sukkur & Interior Sindh',
  'Kund Malir & Coastal Highway',
  'Gawadar & Balochistan',
  'Multan, Lahore & Islamabad',
  'Northern Areas Family Tours',
];

export const FAQS: FaqItem[] = [
  {
    question: 'What documents are needed for self-drive rental?',
    answer:
      'A valid original CNIC (or Passport for overseas visitors) and a valid driving license are required for self-drive bookings.',
  },
  {
    question: 'Do you deliver across Karachi outside Orangi Town?',
    answer:
      'Yes. We deliver and pick up 24/7 across North Nazimabad, Gulshan, DHA, Clifton, Saddar, and Jinnah International Airport.',
  },
  {
    question: 'Can I book cars for weddings, shoots, or out-of-city trips?',
    answer:
      'Yes. Dedicated vehicles are available for Baraat, Valima, photo shoots, VIP duty, and intercity trips across Pakistan.',
  },
  {
    question: 'How quickly is a booking confirmed?',
    answer:
      'Requests sent on WhatsApp (0312-0281033) or via our website form are confirmed within 10 to 15 minutes.',
  },
];

export const BOOKING_STEPS = [
  {
    step: '01',
    title: 'Pick Your Vehicle',
    description: 'Choose Prado, Mercedes, BMW i7, Hilux 4x4, Corolla, or a group bus/coach.',
  },
  {
    step: '02',
    title: 'Select Drive Mode',
    description: 'Ride with an experienced chauffeur or select self-drive on Corolla.',
  },
  {
    step: '03',
    title: 'Confirm on WhatsApp',
    description: 'Share your pickup area, date, and optional wedding decor preference.',
  },
  {
    step: '04',
    title: '24/7 Handover',
    description: 'Collect from Orangi Town Sector 6 or get doorstep delivery.',
  },
];
