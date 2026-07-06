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
  },
  {
    id: "dest-11",
    name: "Everest Base Camp",
    country: "Nepal",
    category: "Adventure",
    images: [
      "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.9,
    shortDescription: "A legendary trek through the Himalayas to the foot of the world's tallest mountain.",
    longDescription: "Everest Base Camp is the starting point for expeditions up Mount Everest, the world's highest peak. The trek winds through Sherpa villages, suspension bridges, and ancient monasteries in the Khumbu region, rewarding trekkers with unmatched views of the Himalayan giants.",
    history: "The route became famous after Sir Edmund Hillary and Tenzing Norgay's historic 1953 summit of Everest, opening the region to trekkers worldwide.",
    culture: "Home to the Sherpa people, renowned mountaineers whose Buddhist traditions and monasteries define the Khumbu region.",
    bestTimeToVisit: "March to May or September to November for clear skies and stable weather.",
    nearbyAttractions: ["Namche Bazaar", "Tengboche Monastery", "Kala Patthar"],
    restaurants: ["Sherpa Barista", "Everest Bakery Namche"],
    hotels: ["Yeti Mountain Home", "Everest View Hotel"],
    travelTips: ["Acclimatize properly to avoid altitude sickness", "Hire a licensed local guide and porter", "Pack layered, high-altitude clothing"]
  },
  {
    id: "dest-12",
    name: "Kathmandu Valley",
    country: "Nepal",
    category: "Heritage",
    images: [
      "https://images.unsplash.com/photo-1544161512-6a2e8f2cf3f5?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.7,
    shortDescription: "Ancient temples, living goddesses, and a maze of medieval city squares.",
    longDescription: "The Kathmandu Valley is home to seven UNESCO World Heritage Sites, including the historic Durbar Squares of Kathmandu, Patan, and Bhaktapur, along with the sacred Swayambhunath and Boudhanath stupas. It's a living museum of Newar art, architecture, and centuries-old traditions.",
    history: "Once three rival Malla kingdoms, the valley's cities competed to build ever more elaborate palaces and temples between the 12th and 18th centuries.",
    culture: "A rich blend of Hindu and Buddhist traditions, vibrant festivals, and intricate wood and metal craftsmanship.",
    bestTimeToVisit: "October to November or February to April for pleasant weather and clear mountain views.",
    nearbyAttractions: ["Swayambhunath Stupa", "Bhaktapur Durbar Square", "Boudhanath Stupa"],
    restaurants: ["Krishnarpan", "Thamel House Restaurant"],
    hotels: ["Dwarika's Hotel", "Hyatt Regency Kathmandu"],
    travelTips: ["Remove shoes before entering temples", "Bargain respectfully in Thamel markets", "Hire a guide to understand the Durbar Square history"]
  },
  {
    id: "dest-13",
    name: "Taj Mahal",
    country: "India",
    category: "Heritage",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.9,
    shortDescription: "An ivory-white marble mausoleum and eternal monument to love.",
    longDescription: "The Taj Mahal is a white marble mausoleum in Agra, India, commissioned in 1632 by Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. Widely regarded as the finest example of Mughal architecture, it draws millions of visitors each year and is one of the New7Wonders of the World.",
    history: "Built between 1632 and 1653 by an estimated 20,000 artisans and craftsmen from across the Mughal Empire and beyond.",
    culture: "A powerful symbol of Mughal art blending Persian, Islamic, and Indian architectural styles, and a UNESCO World Heritage Site.",
    bestTimeToVisit: "October to March for cooler, comfortable sightseeing weather.",
    nearbyAttractions: ["Agra Fort", "Mehtab Bagh", "Fatehpur Sikri"],
    restaurants: ["Pinch of Spice", "Esphahan"],
    hotels: ["The Oberoi Amarvilas", "ITC Mughal"],
    travelTips: ["Visit at sunrise to avoid crowds and heat", "Book tickets online in advance", "Hire an official guide at the entrance"]
  },
  {
    id: "dest-14",
    name: "Kerala Backwaters",
    country: "India",
    category: "Culture",
    images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.7,
    shortDescription: "Tranquil palm-fringed canals, houseboats, and lush tropical greenery.",
    longDescription: "The Kerala Backwaters are a network of interconnected canals, rivers, lakes, and lagoons that run parallel to the Arabian Sea coast in southern India. Traditional houseboats, known as kettuvallams, drift past villages, rice paddies, and coconut groves, offering a serene glimpse into local life.",
    history: "Once vital trade routes for spices and coir, the canals have supported Kerala's coastal communities for centuries.",
    culture: "Known for Kathakali dance, Ayurvedic wellness traditions, and a cuisine built around coconut, rice, and fresh seafood.",
    bestTimeToVisit: "September to March for pleasant weather and calm waters.",
    nearbyAttractions: ["Alleppey", "Kumarakom Bird Sanctuary", "Vembanad Lake"],
    restaurants: ["Kayikka's Hotel", "Fusion Bay"],
    hotels: ["Kumarakom Lake Resort", "Punnamada Resort"],
    travelTips: ["Book an overnight houseboat stay", "Visit during the Nehru Trophy Boat Race in August", "Try authentic Kerala sadya on a banana leaf"]
  },
  {
    id: "dest-15",
    name: "Ha Long Bay",
    country: "Vietnam",
    category: "Seas",
    images: [
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.8,
    shortDescription: "Thousands of limestone karsts rising from emerald waters.",
    longDescription: "Ha Long Bay is a UNESCO World Heritage Site in northern Vietnam, known for its emerald waters and thousands of towering limestone islands topped by rainforests. Cruises through the bay reveal hidden caves, floating fishing villages, and dramatic karst formations.",
    history: "Legend attributes the bay's formation to a dragon that plunged into the sea, its thrashing tail carving out the valleys and islands.",
    culture: "Home to floating fishing villages where communities have lived on the water for generations.",
    bestTimeToVisit: "October to December for clear skies and comfortable temperatures.",
    nearbyAttractions: ["Sung Sot Cave", "Cat Ba Island", "Ti Top Island"],
    restaurants: ["Cua Vang Restaurant", "Floating restaurants of Cua Van village"],
    hotels: ["Paradise Elegance Cruise", "Vinpearl Resort Ha Long"],
    travelTips: ["Book a multi-day overnight cruise for the full experience", "Bring motion sickness remedies for boat trips", "Visit lesser-known bays like Lan Ha to avoid crowds"]
  },
  {
    id: "dest-16",
    name: "Great Wall of China",
    country: "China",
    category: "Heritage",
    images: [
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1000"
    ],
    rating: 4.8,
    shortDescription: "An ancient fortification winding across mountains for thousands of miles.",
    longDescription: "The Great Wall of China is a series of fortifications built across the historical northern borders of China to protect against invasions. Stretching over 13,000 miles in total, well-preserved sections like Mutianyu and Jinshanling offer dramatic views over forested mountain ridges.",
    history: "Construction began as early as the 7th century BC, with major expansions under the Qin and Ming dynasties over the following centuries.",
    culture: "A national symbol of China's history and engineering, representing centuries of dynastic ambition and defense.",
    bestTimeToVisit: "April to June or September to November for mild weather and fewer crowds.",
    nearbyAttractions: ["Mutianyu Section", "Ming Tombs", "Jinshanling Section"],
    restaurants: ["Schoolhouse at Mutianyu", "The Great Wall Box House"],
    hotels: ["Commune by the Great Wall", "Brickyard Eco-Retreat"],
    travelTips: ["Choose a less crowded section like Jinshanling for a quieter visit", "Take the cable car if hiking steep sections is difficult", "Visit on a weekday to avoid tour groups"]
  }
];

export type CameraResult = {
  landmarkName: string;
  country: string;
  coordinates: string;
  summary: string;
  history: string;
  architecture: string;
  interestingFacts: string[];
  nearbyPlaces: string[];
  travelTips: string[];
  bestTimeToVisit: string;
  entryFee: string;
  openingHours: string;
};

export const cameraResultPool: CameraResult[] = [
  {
    landmarkName: "The Colosseum",
    country: "Italy",
    coordinates: "41.8902° N, 12.4922° E",
    summary: "An oval amphitheatre in the centre of Rome, the largest ancient amphitheatre ever built and still the largest standing today.",
    history: "Commissioned around A.D. 70-72 by Emperor Vespasian of the Flavian dynasty as a gift to the Roman people. In A.D. 80, Vespasian's son Titus opened the Colosseum with 100 days of games, and it remained in active use for almost 500 years.",
    architecture: "Made of travertine limestone, volcanic tuff, and brick-faced concrete, standing 4 stories and roughly 189 by 156 meters. It used a sophisticated system of vaults, arches, and a retractable awning (velarium) to shade spectators.",
    interestingFacts: [
      "It could hold an estimated 50,000 to 80,000 spectators.",
      "Mock sea battles (naumachiae) were occasionally staged there by flooding the arena.",
      "It has over 80 entrances, allowing the entire crowd to be seated in about 15 minutes.",
      "Roughly two-thirds of the original structure has been destroyed over the centuries by earthquakes and stone-robbers."
    ],
    nearbyPlaces: ["Roman Forum", "Palatine Hill", "Arch of Constantine", "Pantheon"],
    travelTips: ["Visit early morning or late afternoon to avoid crowds.", "Buy tickets online in advance to skip the ticket line.", "Combine your visit with the Roman Forum, included in the same ticket."],
    bestTimeToVisit: "April-May or September-October for mild weather and fewer tourists.",
    entryFee: "€18 (combined with Roman Forum & Palatine Hill), free on first Sunday of the month.",
    openingHours: "Daily, 9:00 AM until 1 hour before sunset."
  },
  {
    landmarkName: "Eiffel Tower",
    country: "France",
    coordinates: "48.8584° N, 2.2945° E",
    summary: "A 330-meter wrought-iron lattice tower on the Champ de Mars in Paris, the most-visited paid monument in the world.",
    history: "Designed by engineer Gustave Eiffel's company and built for the 1889 World's Fair to mark the centennial of the French Revolution. It was initially criticized by artists and intellectuals but became a global icon within a few decades.",
    architecture: "Built from over 18,000 individual wrought-iron pieces held together by 2.5 million rivets. It weighs approximately 10,100 tonnes and was the tallest man-made structure in the world for 41 years.",
    interestingFacts: [
      "It grows about 15 cm taller in summer as the iron expands in the heat.",
      "It was almost demolished in 1909 but was saved because it proved useful as a radio transmission tower.",
      "It is repainted every 7 years, using about 60 tonnes of paint.",
      "There are three levels open to visitors, with a restaurant on the first and second floors."
    ],
    nearbyPlaces: ["Trocadéro", "Champ de Mars", "Musée du Quai Branly", "Pont d'Iéna"],
    travelTips: ["Book tickets online for a specific time slot to avoid long queues.", "Visit at night to see the hourly sparkling light show.", "Climb the stairs to the second floor for a cheaper, more scenic option."],
    bestTimeToVisit: "June is warm with long daylight hours; visit at dawn or dusk for smaller crowds.",
    entryFee: "€18.80-€29.40 depending on level and lift vs. stairs.",
    openingHours: "Daily, 9:30 AM - 11:45 PM (extended summer hours)."
  },
  {
    landmarkName: "Taj Mahal",
    country: "India",
    coordinates: "27.1751° N, 78.0421° E",
    summary: "An ivory-white marble mausoleum on the bank of the Yamuna river in Agra, widely regarded as the finest example of Mughal architecture.",
    history: "Commissioned in 1632 by Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal, who died during childbirth. It took roughly 20 years and around 20,000 artisans to complete.",
    architecture: "Combines elements of Persian, Islamic, and Indian architectural styles, built primarily of white marble inlaid with semi-precious stones in intricate floral patterns, topped by a large central dome and four minarets.",
    interestingFacts: [
      "It appears to change color throughout the day — pinkish in the morning, white in the evening, golden under moonlight.",
      "The four minarets lean slightly outward, designed to fall away from the tomb in case of an earthquake.",
      "It was designated a UNESCO World Heritage Site in 1983.",
      "The complex also includes a mosque, guest house, and formal gardens laid out in a classic Persian charbagh design."
    ],
    nearbyPlaces: ["Agra Fort", "Mehtab Bagh", "Itmad-ud-Daulah's Tomb", "Fatehpur Sikri"],
    travelTips: ["Arrive at sunrise both to beat the heat and the crowds.", "Fridays are closed to tourists (reserved for prayers).", "View it from across the river at Mehtab Bagh for a quieter, iconic photo."],
    bestTimeToVisit: "October to March for cooler, comfortable temperatures.",
    entryFee: "₹1,100 for foreign tourists (includes small water bottle and shoe covers).",
    openingHours: "Daily except Friday, 6:00 AM - 6:30 PM."
  },
  {
    landmarkName: "Great Wall of China",
    country: "China",
    coordinates: "40.4319° N, 116.5704° E",
    summary: "A series of fortifications built across the historical northern borders of China, stretching for thousands of miles across mountains, deserts, and grasslands.",
    history: "Construction began as early as the 7th century BC by various states, with major unification and expansion under the Qin Dynasty (around 221 BC) and the most well-preserved sections built during the Ming Dynasty (1368-1644).",
    architecture: "Built from rammed earth, wood, brick, and stone depending on the era and region, featuring watchtowers, garrison stations, and signal towers spaced along its length for defense and communication.",
    interestingFacts: [
      "Contrary to popular belief, it is not visible to the naked eye from space.",
      "The total length of all the wall's sections, including branches, is estimated at over 21,000 km.",
      "It was built and rebuilt over roughly 2,000 years by multiple dynasties.",
      "The Mutianyu and Badaling sections near Beijing are the most visited and best restored."
    ],
    nearbyPlaces: ["Mutianyu Section", "Ming Tombs", "Jinshanling Section", "Badaling"],
    travelTips: ["Choose a less crowded section like Jinshanling or Simatai for a quieter visit.", "Take the cable car up if hiking steep sections is difficult.", "Visit on a weekday to avoid large tour groups."],
    bestTimeToVisit: "April to June or September to November for mild weather.",
    entryFee: "¥40-¥180 depending on the section visited.",
    openingHours: "Daily, roughly 7:30 AM - 5:30 PM (varies by section and season)."
  },
  {
    landmarkName: "Machu Picchu",
    country: "Peru",
    coordinates: "13.1631° S, 72.5450° W",
    summary: "A 15th-century Inca citadel set on a mountain ridge 2,430 meters above sea level in the Andes, one of the New Seven Wonders of the World.",
    history: "Built around 1450 as a royal estate or sacred religious site for the Inca emperor Pachacuti, then abandoned roughly a century later during the Spanish conquest. It remained largely unknown to the outside world until American historian Hiram Bingham brought international attention to it in 1911.",
    architecture: "A marvel of Inca engineering, built without mortar using precisely cut polished dry-stone walls that interlock so tightly a knife blade can't fit between blocks. The site includes temples, terraces for agriculture, and an advanced water channel system.",
    interestingFacts: [
      "The complex has over 150 buildings, including baths, houses, temples, and sanctuaries.",
      "It sits directly on two fault lines, and Inca stonework may have been designed to flex and resettle during earthquakes.",
      "The Inca Trail, a multi-day trek, is one of the most famous ways to arrive at the site.",
      "It was named a UNESCO World Heritage Site in 1983 and a New Seven Wonder of the World in 2007."
    ],
    nearbyPlaces: ["Inca Trail", "Sacred Valley", "Cusco", "Huayna Picchu"],
    travelTips: ["Book tickets and any Huayna Picchu add-on well in advance — daily visitor numbers are capped.", "Acclimatize to the altitude in Cusco for a few days first.", "Hire a local guide for context you won't get from signage alone."],
    bestTimeToVisit: "April to October (dry season) for the clearest views.",
    entryFee: "Around $45-$65 USD depending on circuit and mountain add-ons.",
    openingHours: "Daily, 6:00 AM - 5:30 PM, entry by timed slot."
  },
  {
    landmarkName: "Statue of Liberty",
    country: "United States",
    coordinates: "40.6892° N, 74.0445° W",
    summary: "A colossal neoclassical copper statue on Liberty Island in New York Harbor, a universal symbol of freedom and democracy.",
    history: "A gift from the people of France to the United States, designed by sculptor Frédéric Auguste Bartholdi with an internal iron framework by Gustave Eiffel. It was dedicated on October 28, 1886.",
    architecture: "Stands 93 meters tall from ground to torch, built from a thin copper sheet (about the thickness of two pennies) over a steel framework, which is why it has weathered to its iconic green patina from oxidation.",
    interestingFacts: [
      "The seven spikes on her crown represent the seven continents and seven seas.",
      "A broken chain lies at her feet, symbolizing freedom from oppression, though it's rarely visible from photos.",
      "The original torch was replaced in 1986 and is now displayed in the pedestal's museum.",
      "It became a UNESCO World Heritage Site in 1984."
    ],
    nearbyPlaces: ["Ellis Island", "Battery Park", "Brooklyn Bridge", "One World Trade Center"],
    travelTips: ["Book crown or pedestal access weeks in advance — it sells out fast.", "Take the early ferry to avoid the biggest crowds.", "Combine your trip with Ellis Island, included on the same ferry ticket."],
    bestTimeToVisit: "Spring or fall for comfortable weather and clearer skies.",
    entryFee: "$24.50 ferry ticket (includes Ellis Island); crown access requires separate advance reservation.",
    openingHours: "Daily, 8:30 AM - 4:00 PM (ferry schedule varies seasonally)."
  }
];

export const dummyCameraResult = cameraResultPool[0];

export const chatStarterQuestions = [
  "What's the best local dish to try?",
  "Can you suggest a walking route for today?",
  "What is the history of this neighborhood?",
  "Where can I find the best view of the city?"
];
