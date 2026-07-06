import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Compass, Heart, MapPin, Map, Calendar, Sun, Clock, Utensils, Bed, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinations } from '@/lib/data';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';

export default function DestinationPage({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const dest = destinations.find(d => d.id === params.id);
  
  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem('wanderlens_favorites');
    if (saved) {
      return JSON.parse(saved).includes(params.id);
    }
    return false;
  });

  if (!dest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">Destination not found</h1>
        <Button onClick={() => setLocation('/explore')}>Back to Explore</Button>
      </div>
    );
  }

  const toggleFavorite = () => {
    if (!user) {
      setLocation('/login');
      return;
    }
    const saved = localStorage.getItem('wanderlens_favorites');
    let favs = saved ? JSON.parse(saved) : [];
    if (favs.includes(dest.id)) {
      favs = favs.filter((id: string) => id !== dest.id);
      setIsFavorite(false);
    } else {
      favs.push(dest.id);
      setIsFavorite(true);
    }
    localStorage.setItem('wanderlens_favorites', JSON.stringify(favs));
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="relative h-[60vh] w-full">
        <img src={dest.images[0]} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/30"></div>
        <div className="absolute top-6 left-4 right-4 flex justify-between z-10">
          <Button variant="outline" size="icon" className="bg-background/50 backdrop-blur border-none hover:bg-background/80" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="bg-background/50 backdrop-blur border-none hover:bg-background/80" onClick={toggleFavorite}>
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none mb-4">{dest.category}</Badge>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-2">{dest.name}</h1>
            <div className="flex items-center text-muted-foreground text-lg mb-6">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              <span>{dest.country}</span>
              <span className="mx-3">•</span>
              <Sun className="h-5 w-5 mr-2 text-primary" />
              <span>{dest.rating} / 5</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-display font-bold mb-4">About</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{dest.longDescription}</p>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-card/50 p-6 rounded-3xl border border-border/50">
                <Compass className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">History & Culture</h3>
                <p className="text-muted-foreground mb-4">{dest.history}</p>
                <p className="text-muted-foreground">{dest.culture}</p>
              </section>
              <section className="bg-card/50 p-6 rounded-3xl border border-border/50">
                <Calendar className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">When to Visit</h3>
                <p className="text-muted-foreground">{dest.bestTimeToVisit}</p>
              </section>
            </div>

            <section>
              <h2 className="text-3xl font-display font-bold mb-6">Nearby Attractions</h2>
              <div className="flex flex-wrap gap-3">
                {dest.nearbyAttractions.map(attr => (
                  <div key={attr} className="px-4 py-2 rounded-full bg-secondary/10 text-secondary-foreground text-sm font-medium border border-secondary/20">
                    {attr}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center"><Utensils className="mr-2 h-5 w-5 text-primary" /> Top Restaurants</h3>
              <ul className="space-y-4">
                {dest.restaurants.map(rest => (
                  <li key={rest} className="flex items-center text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary/50 mr-3"></div>
                    {rest}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center"><Bed className="mr-2 h-5 w-5 text-primary" /> Where to Stay</h3>
              <ul className="space-y-4">
                {dest.hotels.map(hotel => (
                  <li key={hotel} className="flex items-center text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary/50 mr-3"></div>
                    {hotel}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center"><Compass className="mr-2 h-5 w-5 text-primary" /> Local Tips</h3>
              <ul className="space-y-4">
                {dest.travelTips.map(tip => (
                  <li key={tip} className="flex items-start text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 mr-2 text-primary shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
