import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { destinations } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, Heart, Camera, ChevronRight, LogOut } from 'lucide-react';
import { useLanguage } from '@/lib/language';

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    }
  }, [user, isLoading, setLocation]);

  if (isLoading || !user) return null;

  const savedFavoritesIds = JSON.parse(localStorage.getItem('wanderlens_favorites') || '[]');
  const favoriteDestinations = destinations.filter(d => savedFavoritesIds.includes(d.id));
  
  const savedPlans = JSON.parse(localStorage.getItem('wanderlens_plans') || '[]');

  const rawScans = JSON.parse(localStorage.getItem('wanderlens_scans') || '[]');
  const cameraScans = rawScans.length > 0
    ? rawScans.slice(0, 5).map((s: any) => ({
        id: s.id,
        name: s.name,
        date: new Date(s.date).toLocaleDateString(),
      }))
    : [];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Header */}
        <motion.div 
          className="bg-card p-8 rounded-3xl border border-border shadow-sm mb-10 flex flex-col md:flex-row items-center md:items-start gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-display font-bold mb-1">{t('dashboard_title')} — {user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Saved Plans */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center"><Map className="mr-2 h-6 w-6 text-primary" /> Trip Plans</h2>
                <Button variant="ghost" onClick={() => setLocation('/planner')}>Create New</Button>
              </div>
              
              {savedPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedPlans.map((plan: any) => (
                    <Card key={plan.id} className="p-0 overflow-hidden rounded-2xl group cursor-pointer hover:shadow-md transition-all border-border/60">
                      <div className="h-32 w-full relative">
                        <img src={plan.image || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1000"} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute bottom-3 left-4 text-white">
                          <h3 className="font-bold text-lg">{plan.destination}</h3>
                        </div>
                      </div>
                      <div className="p-4 bg-card">
                        <div className="flex justify-between text-sm text-muted-foreground mb-3">
                          <span className="capitalize">{plan.days} Days • {plan.budget}</span>
                        </div>
                        <Button variant="secondary" className="w-full bg-secondary/10 text-secondary hover:bg-secondary/20">View Itinerary</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-muted/30 border border-dashed border-border rounded-2xl p-8 text-center">
                  <Map className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground mb-4">No trip plans yet.</p>
                  <Button onClick={() => setLocation('/planner')}>Plan a Trip</Button>
                </div>
              )}
            </section>

            {/* Favorite Destinations */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center"><Heart className="mr-2 h-6 w-6 text-primary" /> Saved Places</h2>
              
              {favoriteDestinations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteDestinations.map(dest => (
                    <div key={dest.id} className="flex items-center p-3 bg-card border border-border rounded-2xl cursor-pointer hover:bg-accent/5 transition-colors" onClick={() => setLocation(`/destinations/${dest.id}`)}>
                      <img src={dest.images[0]} alt={dest.name} className="h-16 w-16 rounded-xl object-cover" />
                      <div className="ml-4 flex-1">
                        <h4 className="font-bold">{dest.name}</h4>
                        <p className="text-sm text-muted-foreground">{dest.country}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-muted/30 border border-dashed border-border rounded-2xl p-8 text-center">
                  <p className="text-muted-foreground">You haven't saved any destinations yet.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Camera History */}
            <section className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center"><Camera className="mr-2 h-5 w-5 text-primary" /> Recent Scans</h2>
              {cameraScans.length > 0 ? (
                <div className="space-y-4">
                  {cameraScans.map((scan: any) => (
                    <div key={scan.id} className="flex flex-col border-b border-border/50 pb-4 last:border-0 last:pb-0">
                      <span className="font-medium">{scan.name}</span>
                      <span className="text-sm text-muted-foreground flex justify-between">
                        <span className="text-xs">{scan.date}</span>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mb-2">No scans yet. Try the AI Camera on a landmark photo.</p>
              )}
              <Button variant="outline" className="w-full mt-6" onClick={() => setLocation('/camera')}>Open AI Camera</Button>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
