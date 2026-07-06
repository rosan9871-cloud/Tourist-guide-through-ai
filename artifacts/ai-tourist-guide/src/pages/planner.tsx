import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { destinations } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Map, Calendar, Wallet, CheckCircle, Save, Loader2, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Planner() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [destinationId, setDestinationId] = useState<string>('');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('moderate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const generatePlan = () => {
    if (!destinationId) return;
    setIsGenerating(true);
    
    // Simulate AI generation time
    setTimeout(() => {
      const dest = destinations.find(d => d.id === destinationId);
      const plan = {
        id: Math.random().toString(36).substr(2, 9),
        destination: dest?.name,
        destinationId: dest?.id,
        image: dest?.images[0],
        days,
        budget,
        createdAt: new Date().toISOString(),
        itinerary: Array.from({ length: days }).map((_, i) => ({
          day: i + 1,
          morning: `Visit ${dest?.nearbyAttractions[i % dest.nearbyAttractions.length] || 'local landmarks'}`,
          afternoon: `Lunch at ${dest?.restaurants[i % dest.restaurants.length] || 'a nice local spot'} and explore the culture`,
          evening: `Dinner and relaxation at a ${budget === 'luxury' ? 'fine dining' : 'casual'} place.`,
        }))
      };
      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 2000);
  };

  const savePlan = () => {
    if (!user) {
      setLocation('/login');
      return;
    }
    
    const saved = localStorage.getItem('wanderlens_plans');
    const plans = saved ? JSON.parse(saved) : [];
    plans.push(generatedPlan);
    localStorage.setItem('wanderlens_plans', JSON.stringify(plans));
    
    toast({
      title: "Plan Saved!",
      description: "You can find this plan in your dashboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">AI Trip Planner</h1>
          <p className="text-xl text-muted-foreground">Design your perfect itinerary in seconds.</p>
        </div>

        {!generatedPlan ? (
          <motion.div 
            className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-lg flex items-center"><Map className="mr-2 h-5 w-5 text-primary" /> Where are you going?</Label>
                  <Select value={destinationId} onValueChange={setDestinationId}>
                    <SelectTrigger className="h-14 text-lg">
                      <SelectValue placeholder="Select a destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map(d => (
                        <SelectItem key={d.id} value={d.id}>{d.name}, {d.country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg flex items-center justify-between">
                    <span className="flex items-center"><Calendar className="mr-2 h-5 w-5 text-primary" /> How many days?</span>
                    <span className="font-bold text-primary">{days} days</span>
                  </Label>
                  <Slider 
                    value={[days]} 
                    onValueChange={(v) => setDays(v[0])} 
                    min={1} 
                    max={14} 
                    step={1} 
                    className="py-4"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-lg flex items-center"><Wallet className="mr-2 h-5 w-5 text-primary" /> Travel Style</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {['budget', 'moderate', 'luxury'].map(b => (
                      <div 
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`cursor-pointer rounded-xl border-2 p-4 text-center capitalize font-medium transition-all ${
                          budget === b ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:border-primary/50'
                        }`}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center items-center p-8 bg-muted/30 rounded-3xl border border-dashed border-border/60">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Play className="h-8 w-8 text-primary ml-1" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center">Ready to craft your journey?</h3>
                <p className="text-muted-foreground text-center mb-8">Our AI considers local secrets, opening times, and optimal routing.</p>
                <Button 
                  size="lg" 
                  className="w-full h-14 text-lg rounded-xl"
                  onClick={generatePlan}
                  disabled={!destinationId || isGenerating}
                >
                  {isGenerating ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...</> : 'Generate Itinerary'}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-6 rounded-3xl border border-border">
              <div>
                <h2 className="text-3xl font-display font-bold">{generatedPlan.destination}</h2>
                <p className="text-muted-foreground capitalize">{generatedPlan.days} Days • {generatedPlan.budget} Style</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" onClick={() => setGeneratedPlan(null)} className="flex-1 md:flex-none">Start Over</Button>
                <Button onClick={savePlan} className="flex-1 md:flex-none"><Save className="mr-2 h-4 w-4" /> Save Plan</Button>
              </div>
            </div>

            <div className="space-y-6">
              {generatedPlan.itinerary.map((day: any) => (
                <Card key={day.day} className="p-6 md:p-8 rounded-3xl border-border/60 shadow-sm">
                  <h3 className="text-2xl font-bold mb-6 text-primary border-b border-border/50 pb-4">Day {day.day}</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="mt-1 bg-secondary/10 p-2 rounded-lg h-fit text-secondary"><CheckCircle className="h-5 w-5" /></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Morning</h4>
                        <p className="text-muted-foreground leading-relaxed">{day.morning}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-accent/10 p-2 rounded-lg h-fit text-accent-foreground"><CheckCircle className="h-5 w-5" /></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Afternoon</h4>
                        <p className="text-muted-foreground leading-relaxed">{day.afternoon}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit text-primary"><CheckCircle className="h-5 w-5" /></div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Evening</h4>
                        <p className="text-muted-foreground leading-relaxed">{day.evening}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
