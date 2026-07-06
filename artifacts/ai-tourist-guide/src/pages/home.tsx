import React from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, Compass, Map, Camera, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinations } from '@/lib/data';
import { motion } from 'framer-motion';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            See the world with a <br className="hidden md:block"/>
            <span className="text-primary">local friend in your pocket.</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Wanderlens uses AI to tell you the stories behind landmarks, craft perfect itineraries, and guide you through new cities.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all" onClick={() => setLocation('/explore')}>
              Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full" onClick={() => setLocation('/camera')}>
              <Camera className="mr-2 h-5 w-5" /> Try AI Camera
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Everything you need to wander</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">One app that combines discovery, planning, and on-the-ground guidance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'AI Camera', icon: Camera, desc: 'Point at any landmark to instantly learn its history, architecture, and hidden secrets.' },
              { title: 'Smart Planner', icon: Map, desc: 'Generate day-by-day itineraries tailored to your budget, time, and travel style.' },
              { title: 'Local Guide', icon: MessageSquare, desc: 'Chat with an AI that knows the city like a local. Ask anything, anytime.' },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                className="bg-background p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Trending Destinations</h2>
              <p className="text-lg text-muted-foreground">Places our community is exploring right now.</p>
            </div>
            <Button variant="ghost" onClick={() => setLocation('/explore')} className="hidden sm:flex">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.slice(0, 3).map((dest, i) => (
              <motion.div 
                key={dest.id}
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                onClick={() => setLocation(`/destinations/${dest.id}`)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="aspect-[4/5] w-full">
                  <img src={dest.images[0]} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-primary-foreground/80 font-medium text-sm mb-1">{dest.country}</p>
                  <h3 className="text-2xl font-display font-bold mb-2">{dest.name}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{dest.shortDescription}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="ghost" onClick={() => setLocation('/explore')} className="w-full mt-8 sm:hidden">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-6 text-foreground">
            <Compass className="h-6 w-6 text-primary" />
            <span className="font-display text-2xl font-bold">Wanderlens</span>
          </div>
          <p className="mb-6">Your AI-powered tourist companion. College capstone project.</p>
          <p className="text-sm">© {new Date().getFullYear()} Wanderlens. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
