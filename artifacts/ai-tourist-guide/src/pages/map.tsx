import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import { Navigation, MapPin, Star, Search, LocateFixed, X, Route, Info, ChevronRight, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'wouter';
import { useLanguage } from '@/lib/language';

// Fix Leaflet default icon in Vite
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type LatLng = [number, number];

type MapPlace = {
  id: string;
  name: string;
  country: string;
  category: string;
  lat: number;
  lng: number;
  rating: number;
  description: string;
  image: string;
  destId?: string;
};

const places: MapPlace[] = [
  {
    id: 'p1', name: 'Kyoto', country: 'Japan', category: 'Culture',
    lat: 35.0116, lng: 135.7681, rating: 4.9,
    description: 'Ancient temples, traditional tea houses, and sublime gardens.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=400',
    destId: 'dest-1',
  },
  {
    id: 'p2', name: 'Santorini', country: 'Greece', category: 'Romance',
    lat: 36.3932, lng: 25.4615, rating: 4.8,
    description: 'Iconic blue domes, breathtaking sunsets, and volcanic beaches.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=400',
    destId: 'dest-2',
  },
  {
    id: 'p3', name: 'Machu Picchu', country: 'Peru', category: 'Adventure',
    lat: -13.1631, lng: -72.5450, rating: 4.9,
    description: 'An Inca citadel set high in the Andes Mountains.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=400',
    destId: 'dest-3',
  },
  {
    id: 'p4', name: 'Zanzibar', country: 'Tanzania', category: 'Beach',
    lat: -6.1659, lng: 39.2026, rating: 4.7,
    description: 'White-sand beaches, spice farms, and historic Stone Town.',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80&w=400',
    destId: 'dest-4',
  },
  {
    id: 'p5', name: 'Angkor Wat', country: 'Cambodia', category: 'Culture',
    lat: 13.4125, lng: 103.8670, rating: 4.9,
    description: 'The world\'s largest religious monument, a temple complex in the jungle.',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=400',
    destId: 'dest-5',
  },
  {
    id: 'p6', name: 'Dubrovnik', country: 'Croatia', category: 'History',
    lat: 42.6507, lng: 18.0944, rating: 4.7,
    description: 'The Pearl of the Adriatic, with stunning medieval walls.',
    image: 'https://images.unsplash.com/photo-1555990793-da11153b2473?auto=format&fit=crop&q=80&w=400',
    destId: 'dest-6',
  },
  {
    id: 'p7', name: 'Colosseum', country: 'Italy', category: 'History',
    lat: 41.8902, lng: 12.4922, rating: 4.9,
    description: 'The largest ancient amphitheatre ever built, still standing today.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p8', name: 'Eiffel Tower', country: 'France', category: 'Romance',
    lat: 48.8584, lng: 2.2945, rating: 4.8,
    description: 'The iconic iron lattice tower on the Champ de Mars in Paris.',
    image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p9', name: 'Taj Mahal', country: 'India', category: 'Romance',
    lat: 27.1751, lng: 78.0421, rating: 5.0,
    description: 'An ivory-white marble mausoleum, the finest example of Mughal architecture.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p10', name: 'Great Wall', country: 'China', category: 'History',
    lat: 40.4319, lng: 116.5704, rating: 4.9,
    description: 'A series of fortifications stretching thousands of miles across northern China.',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p11', name: 'Statue of Liberty', country: 'USA', category: 'History',
    lat: 40.6892, lng: -74.0445, rating: 4.8,
    description: 'A colossal symbol of freedom and democracy in New York Harbor.',
    image: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p12', name: 'Sydney Opera House', country: 'Australia', category: 'Culture',
    lat: -33.8568, lng: 151.2153, rating: 4.8,
    description: 'An architectural masterpiece on Sydney Harbour, UNESCO World Heritage Site.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p13', name: 'Matera', country: 'Italy', category: 'History',
    lat: 40.6663, lng: 16.6043, rating: 4.7,
    description: 'Ancient cave city carved into ravines — one of the world\'s oldest settlements.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p14', name: 'Patagonia', country: 'Argentina', category: 'Adventure',
    lat: -51.6272, lng: -72.5036, rating: 4.9,
    description: 'Dramatic glaciers, jagged peaks, and vast untouched wilderness.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p15', name: 'Bali', country: 'Indonesia', category: 'Beach',
    lat: -8.3405, lng: 115.0920, rating: 4.8,
    description: 'Tropical paradise with terraced rice fields, temples, and surf beaches.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400',
  },
];

const categoryColors: Record<string, string> = {
  Culture: '#6366f1',
  Romance: '#ec4899',
  Adventure: '#f97316',
  Beach: '#06b6d4',
  History: '#8b5cf6',
  default: '#10b981',
};

function createColoredIcon(color: string, isActive = false) {
  const size = isActive ? 42 : 34;
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="16" fill="${color}" stroke="white" stroke-width="2.5" opacity="0.95"/>
      <circle cx="17" cy="17" r="7" fill="white"/>
      ${isActive ? `<circle cx="17" cy="17" r="14" stroke="${color}" stroke-width="2" opacity="0.4" fill="none"/>` : ''}
    </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

function createUserIcon() {
  const svg = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="white" stroke-width="2.5"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function FlyToLocation({ target }: { target: LatLng | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target, 13, { duration: 1.2 });
    }
  }, [target, map]);
  return null;
}

function UserLocationWatcher({ onLocation }: { onLocation: (pos: LatLng) => void }) {
  const map = useMap();
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        onLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {},
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
    );
    return () => navigator.geolocation.clearWatch(watcher);
  }, [map, onLocation]);
  return null;
}

export default function MapPage() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const [userPos, setUserPos] = useState<LatLng | null>(null);
  const [flyTarget, setFlyTarget] = useState<LatLng | null>(null);
  const [activePlace, setActivePlace] = useState<MapPlace | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<MapPlace | null>(null);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tileLayer, setTileLayer] = useState<'street' | 'satellite'>('street');
  const [gpsError, setGpsError] = useState(false);
  const markerRefs = useRef<Record<string, L.Marker>>({});

  const categories = ['All', ...Array.from(new Set(places.map((p) => p.category))).sort()];

  const filtered = places.filter((p) => {
    const matchQ = p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.country.toLowerCase().includes(query.toLowerCase());
    const matchC = activeCategory === 'All' || p.category === activeCategory;
    return matchQ && matchC;
  });

  const handleUserLocation = useCallback((pos: LatLng) => {
    setUserPos(pos);
    setGpsError(false);
  }, []);

  function centerOnUser() {
    if (userPos) {
      setFlyTarget([...userPos] as LatLng);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: LatLng = [pos.coords.latitude, pos.coords.longitude];
          setUserPos(coords);
          setFlyTarget(coords);
        },
        () => setGpsError(true)
      );
    }
  }

  function startNavigation(place: MapPlace) {
    setNavigatingTo(place);
    setActivePlace(place);
    setFlyTarget([place.lat, place.lng]);
  }

  function stopNavigation() {
    setNavigatingTo(null);
  }

  const navDistance = navigatingTo && userPos
    ? haversineKm(userPos[0], userPos[1], navigatingTo.lat, navigatingTo.lng)
    : null;

  const tileUrl = tileLayer === 'satellite'
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const tileAttrib = tileLayer === 'satellite'
    ? 'Tiles &copy; Esri'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Navigation Banner */}
      {navigatingTo && (
        <div className="flex items-center justify-between px-4 py-2 bg-primary text-primary-foreground text-sm z-20 shrink-0">
          <div className="flex items-center gap-2">
            <Route className="h-4 w-4 shrink-0" />
            <span className="font-semibold">Navigating to {navigatingTo.name}</span>
            {navDistance !== null && (
              <span className="opacity-80">
                · {navDistance < 1
                  ? `${Math.round(navDistance * 1000)} m`
                  : `${navDistance.toFixed(1)} km`} straight-line distance
              </span>
            )}
          </div>
          <button onClick={stopNavigation} className="p-1 rounded-full hover:bg-primary-foreground/20">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`shrink-0 bg-background border-r border-border flex flex-col transition-all duration-300 overflow-hidden z-10 ${
            sidebarOpen ? 'w-80' : 'w-0'
          }`}
        >
          <div className="p-4 border-b border-border shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Navigation className="h-5 w-5 text-primary" />
              <h2 className="font-display font-bold text-lg">Live Map</h2>
            </div>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search places..."
                className="pl-9 h-9 rounded-xl text-sm"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors border ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* GPS Status */}
          {!userPos && (
            <div className="mx-4 mt-3 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs flex items-center gap-2">
              <LocateFixed className="h-3.5 w-3.5 shrink-0" />
              {gpsError ? 'Location access denied. Enable GPS for full features.' : 'Waiting for your GPS location…'}
            </div>
          )}
          {userPos && (
            <div className="mx-4 mt-3 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-xs flex items-center gap-2">
              <LocateFixed className="h-3.5 w-3.5 shrink-0" />
              GPS active · {userPos[0].toFixed(4)}°, {userPos[1].toFixed(4)}°
            </div>
          )}

          {/* Place list */}
          <div className="flex-1 overflow-y-auto p-2">
            {filtered.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-8">No places found.</p>
            )}
            {filtered.map((place) => {
              const isActive = activePlace?.id === place.id;
              const isNav = navigatingTo?.id === place.id;
              const dist = userPos
                ? haversineKm(userPos[0], userPos[1], place.lat, place.lng)
                : null;
              const color = categoryColors[place.category] ?? categoryColors.default;

              return (
                <button
                  key={place.id}
                  onClick={() => {
                    setActivePlace(place);
                    setFlyTarget([place.lat, place.lng]);
                    setTimeout(() => {
                      markerRefs.current[place.id]?.openPopup();
                    }, 400);
                  }}
                  className={`w-full text-left rounded-2xl p-3 mb-1.5 flex gap-3 transition-all border ${
                    isActive
                      ? 'bg-primary/5 border-primary/30'
                      : 'border-transparent hover:bg-muted/50'
                  }`}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: color }}
                      />
                      <span className="font-semibold text-sm truncate">{place.name}</span>
                      {isNav && (
                        <Badge className="ml-auto text-[10px] px-1.5 py-0 bg-primary text-primary-foreground shrink-0">
                          Navigating
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{place.country} · {place.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium">{place.rating}</span>
                      </div>
                      {dist !== null && (
                        <span className="text-xs text-muted-foreground">
                          {dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(0)} km`}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map */}
        <div className="relative flex-1">
          {/* Toggle sidebar */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="absolute top-3 left-3 z-[1000] bg-background border border-border rounded-xl p-2 shadow-md hover:shadow-lg transition-shadow"
            title="Toggle sidebar"
          >
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-300 ${sidebarOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Map controls */}
          <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
            <button
              onClick={centerOnUser}
              className="bg-background border border-border rounded-xl p-2.5 shadow-md hover:shadow-lg transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary group"
              title="Center on my location"
            >
              <LocateFixed className="h-5 w-5" />
            </button>
            <button
              onClick={() => setTileLayer((v) => (v === 'street' ? 'satellite' : 'street'))}
              className="bg-background border border-border rounded-xl p-2.5 shadow-md hover:shadow-lg transition-all hover:bg-muted"
              title="Toggle satellite/street view"
            >
              <Layers className="h-5 w-5" />
            </button>
          </div>

          <MapContainer
            center={[20, 0]}
            zoom={3}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
          >
            <TileLayer url={tileUrl} attribution={tileAttrib} />
            <FlyToLocation target={flyTarget} />
            <UserLocationWatcher onLocation={handleUserLocation} />

            {/* User location */}
            {userPos && (
              <>
                <Marker position={userPos} icon={createUserIcon()}>
                  <Popup>
                    <div className="text-center p-1">
                      <p className="font-bold text-sm">📍 You are here</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {userPos[0].toFixed(4)}°, {userPos[1].toFixed(4)}°
                      </p>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={userPos}
                  radius={50000}
                  pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.05, weight: 1, dashArray: '6' }}
                />
              </>
            )}

            {/* Navigation route line */}
            {navigatingTo && userPos && (
              <Polyline
                positions={[userPos, [navigatingTo.lat, navigatingTo.lng]]}
                pathOptions={{
                  color: '#6366f1',
                  weight: 3,
                  dashArray: '10, 8',
                  opacity: 0.85,
                }}
              />
            )}

            {/* Place markers */}
            {filtered.map((place) => {
              const color = categoryColors[place.category] ?? categoryColors.default;
              const isActive = activePlace?.id === place.id;
              const dist = userPos
                ? haversineKm(userPos[0], userPos[1], place.lat, place.lng)
                : null;

              return (
                <Marker
                  key={place.id}
                  position={[place.lat, place.lng]}
                  icon={createColoredIcon(color, isActive)}
                  ref={(ref) => {
                    if (ref) markerRefs.current[place.id] = ref;
                  }}
                  eventHandlers={{
                    click: () => setActivePlace(place),
                  }}
                >
                  <Popup maxWidth={260} minWidth={220}>
                    <div style={{ fontFamily: 'inherit' }}>
                      <img
                        src={place.image}
                        alt={place.name}
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span
                          style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }}
                        />
                        <strong style={{ fontSize: '15px' }}>{place.name}</strong>
                      </div>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                        {place.country} · {place.category}
                      </p>
                      <p style={{ fontSize: '12px', marginBottom: '8px', lineHeight: '1.4' }}>{place.description}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          ⭐ {place.rating}
                        </span>
                        {dist !== null && (
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>
                            {dist < 1 ? `${Math.round(dist * 1000)} m away` : `${dist.toFixed(0)} km away`}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => startNavigation(place)}
                          style={{
                            flex: 1, padding: '6px 10px', background: '#6366f1', color: 'white',
                            border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer',
                            fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                          }}
                        >
                          <span>▶</span> Navigate
                        </button>
                        {place.destId && (
                          <button
                            onClick={() => setLocation(`/destinations/${place.destId}`)}
                            style={{
                              flex: 1, padding: '6px 10px', background: 'transparent', color: '#6366f1',
                              border: '1.5px solid #6366f1', borderRadius: '8px', fontSize: '12px', cursor: 'pointer',
                              fontWeight: '600'
                            }}
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Layer label */}
          <div className="absolute bottom-6 right-3 z-[1000] bg-background/80 backdrop-blur border border-border rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow">
            {tileLayer === 'satellite' ? '🛰 Satellite' : '🗺 Street Map'} · OpenStreetMap
          </div>

          {/* Active place mini-card */}
          {activePlace && !sidebarOpen && (
            <div className="absolute bottom-16 left-3 z-[1000] bg-background border border-border rounded-2xl shadow-xl p-3 w-64">
              <div className="flex gap-3">
                <img src={activePlace.image} alt={activePlace.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{activePlace.name}</p>
                  <p className="text-xs text-muted-foreground">{activePlace.country}</p>
                  <div className="flex gap-1.5 mt-1.5">
                    <Button size="sm" className="h-6 text-xs px-2 rounded-lg" onClick={() => startNavigation(activePlace)}>
                      Navigate
                    </Button>
                    {activePlace.destId && (
                      <Button size="sm" variant="outline" className="h-6 text-xs px-2 rounded-lg" onClick={() => setLocation(`/destinations/${activePlace.destId}`)}>
                        Info
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
