import parisImg from '../assets/destinations/paris.webp';
import londonImg from '../assets/destinations/london.webp';
import romeImg from '../assets/destinations/rome.webp';

import maldivesImg from '../assets/destinations/maldives.webp';
import fijiImg from '../assets/destinations/fiji.webp';
import zanzibarImg from '../assets/destinations/zanzibar.webp';

import castleImg from '../assets/destinations/castle.webp';
import boatImg from '../assets/destinations/boat.webp';
import cabinImg from '../assets/destinations/cabin.webp';

export type Destination = {
  id: number;
  name: string;
  image: string;
  alt: string;
  query: string;
};

export type DestinationVariant = 'cities' | 'tropics' | 'unexpected';

export const Destinations: Record<
  DestinationVariant,
  { title: string; items: Destination[] }
> = {
  cities: {
    title: 'experience city life',
    items: [
      {
        id: 1,
        name: 'paris',
        image: parisImg,
        alt: 'the eiffel tower in paris',
        query: 'paris',
      },
      {
        id: 2,
        name: 'london',
        image: londonImg,
        alt: 'the tower bridge in london',
        query: 'london',
      },
      {
        id: 3,
        name: 'rome',
        image: romeImg,
        alt: 'the colosseum in rome',
        query: 'rome',
      },
    ],
  },
  tropics: {
    title: 'travel to the tropics',
    items: [
      {
        id: 1,
        name: 'maldives',
        image: maldivesImg,
        alt: 'bungalow hotel above ocean',
        query: 'maldives',
      },
      {
        id: 2,
        name: 'fiji',
        image: fijiImg,
        alt: 'beachside hotel with palms',
        query: 'fiji',
      },
      {
        id: 3,
        name: 'zanzibar',
        image: zanzibarImg,
        alt: 'cliffside bungalow hotel',
        query: 'zanzibar',
      },
    ],
  },
  unexpected: {
    title: 'explore the unexpected',
    items: [
      {
        id: 1,
        name: 'castle',
        image: castleImg,
        alt: 'stonebrick castle on a hill',
        query: 'castle',
      },
      {
        id: 2,
        name: 'boat',
        image: boatImg,
        alt: 'houseboats on a river',
        query: 'boat',
      },
      {
        id: 3,
        name: 'cabin',
        image: cabinImg,
        alt: 'brown cabin in the woods',
        query: 'cabin',
      },
    ],
  },
};
