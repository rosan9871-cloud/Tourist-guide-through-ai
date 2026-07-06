export type Destination = {
  id: string;
  name: string;
  country: string;
  category: string;
  images: string[];
  rating: number;
  shortDescription: string;
  longDescription: string;
  history: string;
  culture: string;
  bestTimeToVisit: string;
  nearbyAttractions: string[];
  restaurants: string[];
  hotels: string[];
  travelTips: string[];
};

export const destinations: Destination[] = [
  {
    id: "dest-1",
    name: "Kyoto",
    country: "Japan",
    category: "Culture",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1545569341-9eb8b3097314?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.9,
    shortDescription: "Ancient temples, traditional tea houses, and sublime gardens.",
    longDescription: "Kyoto served as Japan's capital and the emperor's residence from 794 until 1868. It is one of the country's ten largest cities with a population of 1.5 million people and a modern face. Over the centuries, Kyoto was destroyed by many wars and fires, but due to its historic value, the city was dropped from the list of target cities for the atomic bomb and escaped destruction during World War II.",
    history: "Kyoto was founded in 794 as Heian-kyo.",
    culture: "Known for Geisha districts and tea ceremonies.",
    bestTimeToVisit: "Spring (March-May) for cherry blossoms, or Autumn (Oct-Nov) for foliage.",
    nearbyAttractions: ["Fushimi Inari Shrine", "Kinkaku-ji", "Arashiyama Bamboo Grove"],
    restaurants: ["Kikunoi", "Gion Karyo"],
    hotels: ["Ritz-Carlton Kyoto", "Hoshinoya Kyoto"],
    travelTips: ["Rent a bicycle to get around", "Book tea ceremonies in advance", "Respect local customs in Gion"]
  },
  {
    id: "dest-2",
    name: "Santorini",
    country: "Greece",
    category: "Romance",
    images: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.8,
    shortDescription: "Iconic blue domes, breathtaking sunsets, and volcanic beaches.",
    longDescription: "Santorini is the supermodel of the Greek islands, a head-turner whose face is instantly recognizable around the world: multicoloured cliffs soar out of a sea-drowned caldera, topped by drifts of whitewashed buildings. With its reputation for dazzling panoramas, romantic sunsets and volcanic-sand beaches, it's hardly surprising the island features on so many travelers' bucket lists.",
    history: "Devastated by a volcanic eruption in the 16th century BC.",
    culture: "Famous for its wine industry and Cycladic architecture.",
    bestTimeToVisit: "September to October for warm weather and fewer crowds.",
    nearbyAttractions: ["Oia", "Akrotiri", "Red Beach"],
    restaurants: ["Metaxi Mas", "Selene"],
    hotels: ["Grace Hotel", "Canaves Oia"],
    travelTips: ["Stay in a cave hotel", "Take a sunset cruise", "Wear comfortable walking shoes for the steep stairs"]
  },
  {
    id: "dest-3",
    name: "Machu Picchu",
    country: "Peru",
    category: "Adventure",
    images: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.9,
    shortDescription: "The breathtaking lost city of the Incas hidden in the Andes.",
    longDescription: "Tucked away in the rocky countryside northwest of Cuzco, Peru, Machu Picchu is believed to have been a royal estate or sacred religious site for Inca leaders, whose civilization was virtually wiped out by Spanish invaders in the 16th century.",
    history: "Built around 1450 and abandoned a century later at the time of the Spanish Conquest.",
    culture: "A marvel of Inca engineering and astronomy.",
    bestTimeToVisit: "April to October (Dry season).",
    nearbyAttractions: ["Inca Trail", "Sacred Valley", "Cusco"],
    restaurants: ["Tinkuy Buffet Restaurant", "Indio Feliz"],
    hotels: ["Sanctuary Lodge", "Inkaterra Machu Picchu Pueblo"],
    travelTips: ["Book tickets well in advance", "Acclimatize to the altitude in Cusco first", "Hire a local guide"]
  }
];

export const dummyCameraResult = {
  landmarkName: "The Colosseum",
  summary: "An oval amphitheatre in the centre of the city of Rome, Italy.",
  history: "Commissioned around A.D. 70-72 by Emperor Vespasian of the Flavian dynasty as a gift to the Roman people. In A.D. 80, Vespasian's son Titus opened the Colosseum with 100 days of games.",
  architecture: "Made of travertine limestone, tuff, and brick-faced concrete. It was the largest amphitheatre ever built at the time.",
  interestingFacts: [
    "It could hold an estimated 50,000 to 80,000 spectators.",
    "Mock sea battles were occasionally held there.",
    "It has over 80 entrances."
  ],
  nearbyPlaces: ["Roman Forum", "Palatine Hill", "Pantheon"],
  travelTips: ["Visit early morning or late afternoon to avoid crowds.", "Buy tickets online in advance."]
};

export const chatStarterQuestions = [
  "What's the best local dish to try?",
  "Can you suggest a walking route for today?",
  "What is the history of this neighborhood?",
  "Where can I find the best view of the city?"
];
