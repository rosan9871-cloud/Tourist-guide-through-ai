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
  },
  {
    id: "dest-4",
    name: "Bali",
    country: "Indonesia",
    category: "Beaches",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.8,
    shortDescription: "Emerald rice terraces, sacred temples, and world-class surf beaches.",
    longDescription: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple, and its beaches range from tranquil Nusa Dua to the buzzing surf town of Canggu.",
    history: "Hindu culture arrived around the 1st century AD, shaping Bali's unique identity distinct from the rest of Muslim-majority Indonesia.",
    culture: "Deeply spiritual island culture with daily offerings, temple ceremonies, and traditional Balinese dance.",
    bestTimeToVisit: "April to October (Dry season) for the best beach and surf conditions.",
    nearbyAttractions: ["Uluwatu Temple", "Tegallalang Rice Terraces", "Nusa Penida"],
    restaurants: ["Locavore", "Merah Putih"],
    hotels: ["Four Seasons Sayan", "Bulgari Resort Bali"],
    travelTips: ["Rent a scooter to explore beyond the resorts", "Dress modestly when visiting temples", "Negotiate prices at local markets"]
  },
  {
    id: "dest-5",
    name: "Maldives",
    country: "Maldives",
    category: "Beaches",
    images: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.9,
    shortDescription: "Turquoise lagoons, overwater bungalows, and pristine coral reefs.",
    longDescription: "The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, made up of more than 1,000 coral islands. It's known for its beaches, blue lagoons, and extensive reefs, and is a paradise for divers, snorkelers, and honeymooners alike.",
    history: "Settled by seafaring peoples over 2,500 years ago, later becoming a hub on ancient Indian Ocean trade routes.",
    culture: "A blend of South Asian, Arab, and African influences reflected in its language, cuisine, and Islamic traditions.",
    bestTimeToVisit: "November to April for calm seas and sunny skies.",
    nearbyAttractions: ["Banana Reef", "Male Fish Market", "Hulhumale Beach"],
    restaurants: ["Ithaa Undersea Restaurant", "SEA by 1 Oak"],
    hotels: ["Soneva Fushi", "Conrad Maldives Rangali Island"],
    travelTips: ["Book overwater villas well in advance", "Pack reef-safe sunscreen", "Try a sunset dolphin cruise"]
  },
  {
    id: "dest-6",
    name: "Amalfi Coast",
    country: "Italy",
    category: "Beaches",
    images: [
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.8,
    shortDescription: "Cliffside villages, sapphire waters, and lemon-scented coastal drives.",
    longDescription: "The Amalfi Coast is a stretch of coastline on the southern edge of Italy's Sorrentine Peninsula, known for its pastel-colored cliffside towns like Positano and Ravello, scenic coastal roads, and crystal-clear Tyrrhenian Sea waters.",
    history: "Once a powerful maritime republic in the Middle Ages, rivaling Venice and Genoa in trade and naval power.",
    culture: "Famous for limoncello, handmade ceramics, and a slow, sun-drenched Mediterranean lifestyle.",
    bestTimeToVisit: "May to June or September for warm weather without peak summer crowds.",
    nearbyAttractions: ["Positano", "Ravello Gardens", "Path of the Gods"],
    restaurants: ["Da Adolfo", "La Sponda"],
    hotels: ["Le Sirenuse", "Belmond Hotel Caruso"],
    travelTips: ["Take the ferry between towns to skip traffic", "Book restaurants with a sea view in advance", "Wear sturdy shoes for the Path of the Gods hike"]
  },
  {
    id: "dest-7",
    name: "Petra",
    country: "Jordan",
    category: "Heritage",
    images: [
      "https://images.unsplash.com/photo-1544097935-6dd0f4c9c7fb?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.9,
    shortDescription: "A rose-red city of tombs and temples carved into desert cliffs.",
    longDescription: "Petra is a historical and archaeological city in southern Jordan, famous for its rock-cut architecture and ancient water conduits. Established possibly as early as 312 BC as the capital of the Nabataean Kingdom, it is a UNESCO World Heritage Site and one of the New7Wonders of the World.",
    history: "Carved by the Nabataeans over 2,000 years ago, Petra thrived as a trading hub before being abandoned and rediscovered by the West in 1812.",
    culture: "Bedouin heritage still thrives around Petra, with local guides descended from tribes that have lived in the region for generations.",
    bestTimeToVisit: "March to May or September to November to avoid extreme desert heat.",
    nearbyAttractions: ["Wadi Rum", "The Monastery (Ad Deir)", "Little Petra"],
    restaurants: ["Petra Kitchen", "Al Qantarah Restaurant"],
    hotels: ["Mövenpick Resort Petra", "Petra Marriott Hotel"],
    travelTips: ["Enter early morning to avoid heat and crowds", "Wear comfortable hiking shoes", "Stay for the candlelit Petra by Night show"]
  },
  {
    id: "dest-8",
    name: "Angkor Wat",
    country: "Cambodia",
    category: "Heritage",
    images: [
      "https://images.unsplash.com/photo-1508182314998-3cd459be3a4d?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.9,
    shortDescription: "The world's largest religious monument, rising from the Cambodian jungle.",
    longDescription: "Angkor Wat is a temple complex in Cambodia and one of the largest religious monuments in the world. Built in the early 12th century by King Suryavarman II, it was originally constructed as a Hindu temple before gradually transforming into a Buddhist site.",
    history: "Built in the early 1100s as the state temple of the Khmer Empire, later abandoned and reclaimed by jungle before being restored in the 20th century.",
    culture: "A living Buddhist temple that remains a spiritual center and national symbol, appearing on Cambodia's flag.",
    bestTimeToVisit: "November to February for cooler, drier weather.",
    nearbyAttractions: ["Ta Prohm", "Bayon Temple", "Angkor Thom"],
    restaurants: ["Cuisine Wat Damnak", "Marum"],
    hotels: ["Amansara", "Park Hyatt Siem Reap"],
    travelTips: ["Watch sunrise over the temple towers", "Hire a licensed local guide for history", "Cover shoulders and knees when visiting temples"]
  },
  {
    id: "dest-9",
    name: "Great Barrier Reef",
    country: "Australia",
    category: "Seas",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.7,
    shortDescription: "The world's largest coral reef system, teeming with vibrant marine life.",
    longDescription: "The Great Barrier Reef is the world's largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching over 2,300 kilometers off the coast of Queensland, Australia. It is home to thousands of species of marine life, including turtles, rays, and colorful fish.",
    history: "Formed over roughly 20,000 years as sea levels rose and coral colonized the continental shelf.",
    culture: "Sacred to Aboriginal and Torres Strait Islander peoples, who have connections to the reef spanning tens of thousands of years.",
    bestTimeToVisit: "June to October for calm seas and excellent visibility.",
    nearbyAttractions: ["Whitsunday Islands", "Cairns Esplanade", "Daintree Rainforest"],
    restaurants: ["Ochre Restaurant", "Prawn Star"],
    hotels: ["Lizard Island Resort", "Silky Oaks Lodge"],
    travelTips: ["Book a certified reef tour operator", "Consider a scenic flight for aerial views", "Use reef-safe sunscreen to protect the coral"]
  },
  {
    id: "dest-10",
    name: "Dubrovnik",
    country: "Croatia",
    category: "Seas",
    images: [
      "https://images.unsplash.com/photo-1555990538-c48fd6e5b7bf?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.7,
    shortDescription: "Medieval stone walls meeting the sparkling Adriatic Sea.",
    longDescription: "Dubrovnik is a city on Croatia's Adriatic coast, known for its distinctive Old Town, encircled with massive stone walls completed in the 16th century. Its well-preserved historic core and dramatic coastal setting have made it one of the Mediterranean's most photographed destinations.",
    history: "Founded in the 7th century, Dubrovnik became a powerful maritime republic that rivaled Venice for centuries.",
    culture: "Rich Dalmatian traditions blend with a modern reputation as a filming location for popular television series.",
    bestTimeToVisit: "May, June, or September for warm weather without peak summer crowds.",
    nearbyAttractions: ["Lokrum Island", "Dubrovnik City Walls", "Elaphiti Islands"],
    restaurants: ["Nautika", "Restaurant 360"],
    hotels: ["Villa Dubrovnik", "Hotel Excelsior"],
    travelTips: ["Walk the city walls at sunrise to avoid crowds", "Take a boat trip to nearby islands", "Book Old Town accommodations for easy access"]
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
