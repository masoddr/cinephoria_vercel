/**
 * Cinema data with addresses, coordinates, and website links
 */

export interface Cinema {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  website?: string;
  district?: string;
}

export const CINEMAS_DATA: Record<string, Cinema[]> = {
  paris: [
    {
      id: 'P0003',
      name: 'MK2 Bastille',
      address: '2-4 Boulevard Richard Lenoir, 75011 Paris',
      lat: 48.8525,
      lng: 2.3703,
      website: 'https://www.mk2.com/salles/mk2-bastille',
      district: '11e arrondissement',
    },
    {
      id: 'P0005',
      name: 'Pathé Wepler',
      address: '140 Boulevard de Clichy, 75018 Paris',
      lat: 48.8842,
      lng: 2.3331,
      website: 'https://www.cinemaspathegaumont.com/cinema/cinema-pathe-wepler',
      district: '18e arrondissement',
    },
    {
      id: 'P0006',
      name: 'MK2 Quai de Seine',
      address: '14 Quai de la Seine, 75019 Paris',
      lat: 48.8847,
      lng: 2.3656,
      website: 'https://www.mk2.com/salles/mk2-quai-de-seine',
      district: '19e arrondissement',
    },
    {
      id: 'P0009',
      name: 'Pathé Beaugrenelle',
      address: '7 Rue Linois, 75015 Paris',
      lat: 48.8506,
      lng: 2.2808,
      website: 'https://www.cinemaspathegaumont.com/cinema/cinema-pathe-beaugrenelle',
      district: '15e arrondissement',
    },
  ],
  toulouse: [
    {
      id: 'P0071',
      name: 'ABC',
      address: '13 Rue Saint-Bernard, 31000 Toulouse',
      lat: 43.6007,
      lng: 1.4442,
      website: 'https://www.cinema-abc.fr',
    },
    {
      id: 'P0235',
      name: 'American Cosmograph',
      address: '24 Rue Montardy, 31000 Toulouse',
      lat: 43.6001,
      lng: 1.4448,
      website: 'https://www.americancosmograph.com',
    },
    {
      id: 'W3120',
      name: 'Utopia Borderouge',
      address: '24 Avenue de Fronton, 31200 Toulouse',
      lat: 43.6417,
      lng: 1.4208,
      website: 'https://www.cinemas-utopia.org/toulouse',
    },
    {
      id: 'P0056',
      name: 'Le cratère',
      address: '99 Grande Rue Saint-Michel, 31400 Toulouse',
      lat: 43.5928,
      lng: 1.4503,
      website: 'https://www.lecratere.fr',
    },
    {
      id: 'P0057',
      name: 'Pathé Wilson',
      address: '3 Place du Président Thomas Wilson, 31000 Toulouse',
      lat: 43.6045,
      lng: 1.4444,
      website: 'https://www.cinemaspathegaumont.com/cinema/cinema-pathe-wilson',
    },
    {
      id: 'W3140',
      name: 'UGC Montaudran',
      address: '1 Avenue de la Gloire, 31400 Toulouse',
      lat: 43.5708,
      lng: 1.4714,
      website: 'https://www.ugc.fr/cinema.html?id=3140',
    },
  ],
};

/**
 * Get Google Maps directions URL
 */
export function getGoogleMapsDirectionsUrl(address: string): string {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
}

/**
 * Get Google Maps place URL
 */
export function getGoogleMapsPlaceUrl(address: string): string {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
}
