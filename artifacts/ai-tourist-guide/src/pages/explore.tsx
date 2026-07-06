import React, { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Star, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { destinations } from '@/lib/data';
import { useAuth } from '@/lib/auth';

const categories = ['All', ...Array.from(new Set(destinations.map((d) => d.category)))];

export default function Explore() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('wanderlens_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesCategory = category === 'All' || d.category === category;
      const matchesQuery =
        query.trim() === '' ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      setLocation('/login');
      return;
    }
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem('wanderlens_favorites', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen pb-24">
      <section className="relative pt-20 pb-14 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight">
              Explore the world
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Search destinations, filter by category, and save the places calling your name.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative max-w-xl"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations or countries..."
              className="h-14 pl-12 text-lg rounded-full shadow-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-6"
          >
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                  category === c
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-bold mb-2">No destinations found</h3>
            <p className="text-muted-foreground">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((dest, i) => {
                const isFav = favorites.includes(dest.id);
                return (
                  <motion.div
                    key={dest.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    onClick={() => setLocation(`/destinations/${dest.id}`)}
                    className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all border border-border/50"
                  >
                    <div className="aspect-[4/5] w-full">
                      <img
                        src={dest.images[0]}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <button
                      onClick={(e) => toggleFavorite(dest.id, e)}
                      className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/60 backdrop-blur flex items-center justify-center hover:bg-background/90 transition-colors"
                      aria-label="Toggle favorite"
                    >
                      <Heart className={`h-5 w-5 ${isFav ? 'fill-destructive text-destructive' : 'text-foreground'}`} />
                    </button>
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-background/70 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      {dest.rating}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-white/70 font-medium text-sm mb-1">{dest.country}</p>
                      <h3 className="text-2xl font-display font-bold mb-2">{dest.name}</h3>
                      <p className="text-white/80 text-sm line-clamp-2">{dest.shortDescription}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
