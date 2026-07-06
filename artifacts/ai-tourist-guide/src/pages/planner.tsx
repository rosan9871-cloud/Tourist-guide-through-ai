import React, { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { destinations } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Map,
  Calendar,
  Wallet,
  CheckCircle,
  Save,
  Loader2,
  Sparkles,
  Users,
  Gauge,
  Sun,
  Moon,
  Coffee,
  Utensils,
  Backpack,
  PieChart,
  RefreshCcw,
  Pencil,
  Plane,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const interestOptions = [
  { id: 'food', label: 'Food & Dining', icon: Utensils },
  { id: 'culture', label: 'Culture & History', icon: Map },
  { id: 'adventure', label: 'Adventure', icon: Gauge },
  { id: 'relaxation', label: 'Relaxation', icon: Sun },
  { id: 'nightlife', label: 'Nightlife', icon: Moon },
  { id: 'nature', label: 'Nature', icon: Backpack },
];

const paceOptions = [
  { id: 'relaxed', label: 'Relaxed', desc: '1-2 activities/day' },
  { id: 'balanced', label: 'Balanced', desc: '3 activities/day' },
  { id: 'packed', label: 'Packed', desc: '4+ activities/day' },
];

const budgetDailyCost: Record<string, number> = { budget: 60, moderate: 150, luxury: 400 };

const packingByCategory: Record<string, string[]> = {
  Beaches: ['Swimsuit', 'Reef-safe sunscreen', 'Sandals', 'Light cover-up', 'Waterproof phone pouch'],
  Seas: ['Windbreaker', 'Non-slip shoes', 'Motion sickness tablets', 'Sunglasses', 'Light layers'],
  Heritage: ['Modest clothing', 'Comfortable walking shoes', 'Reusable water bottle', 'Sun hat'],
  Culture: ['Comfortable walking shoes', 'Modest clothing for temples', 'Portable charger', 'Guidebook or offline maps'],
  Adventure: ['Hiking boots', 'Layered clothing', 'First aid kit', 'Trekking poles', 'Headlamp'],
  Romance: ['Nice outfit for dinners', 'Camera', 'Comfortable shoes for walks'],
};

function generateItineraryDay(
  dayNum: number,
  destName: string,
  attractions: string[],
  restaurants: string[],
  interests: string[],
  pace: string
) {
  const pick = (arr: string[], offset: number) => arr[(dayNum + offset) % arr.length] || `local highlights in ${destName}`;
  const activityCount = pace === 'relaxed' ? 2 : pace === 'packed' ? 4 : 3;

  const slots = [
    { time: 'Morning', icon: 'sun', activity: `Explore ${pick(attractions, 0)}` },
    { time: 'Afternoon', icon: 'utensils', activity: `Lunch at ${pick(restaurants, 0)} and visit ${pick(attractions, 1)}` },
    { time: 'Evening', icon: 'moon', activity: `Dinner at ${pick(restaurants, 1)}${interests.includes('nightlife') ? ' followed by local nightlife' : ''}` },
  ];

  if (activityCount >= 4) {
    slots.push({ time: 'Night', icon: 'sparkles', activity: interests.includes('relaxation') ? 'Relax and unwind at your accommodation' : `Sunset views near ${pick(attractions, 2)}` });
  }

  return { day: dayNum, slots };
}

export default function Planner() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [tripName, setTripName] = useState('');
  const [destinationId, setDestinationId] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState('moderate');
  const [pace, setPace] = useState('balanced');
  const [interests, setInterests] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const selectedDest = useMemo(() => destinations.find((d) => d.id === destinationId), [destinationId]);

  const toggleInterest = (id: string) => {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const generatePlan = () => {
    if (!destinationId) return;
    setIsGenerating(true);

    setTimeout(() => {
      const dest = destinations.find((d) => d.id === destinationId);
      if (!dest) {
        setIsGenerating(false);
        return;
      }

      const itinerary = Array.from({ length: days }).map((_, i) =>
        generateItineraryDay(i + 1, dest.name, dest.nearbyAttractions, dest.restaurants, interests, pace)
      );

      const dailyCost = budgetDailyCost[budget];
      const accommodationPct = 0.4;
      const foodPct = 0.25;
      const activitiesPct = 0.2;
      const transportPct = 0.15;
      const totalCost = dailyCost * days * travelers;

      const plan = {
        id: Math.random().toString(36).substring(2, 9),
        tripName: tripName.trim() || `${dest.name} Adventure`,
        destination: dest.name,
        destinationId: dest.id,
        image: dest.images[0],
        startDate,
        days,
        travelers,
        budget,
        pace,
        interests,
        createdAt: new Date().toISOString(),
        itinerary,
        budgetBreakdown: [
          { label: 'Accommodation', pct: accommodationPct, amount: Math.round(totalCost * accommodationPct) },
          { label: 'Food & Dining', pct: foodPct, amount: Math.round(totalCost * foodPct) },
          { label: 'Activities', pct: activitiesPct, amount: Math.round(totalCost * activitiesPct) },
          { label: 'Transport', pct: transportPct, amount: Math.round(totalCost * transportPct) },
        ],
        totalCost: Math.round(totalCost),
        packingList: packingByCategory[dest.category] || ['Comfortable shoes', 'Travel adapter', 'Reusable water bottle'],
      };
      setGeneratedPlan(plan);
      setIsGenerating(false);
    }, 2200);
  };

  const regenerateDay = (dayIndex: number) => {
    if (!selectedDest) return;
    setGeneratedPlan((prev: any) => {
      if (!prev) return prev;
      const newDay = generateItineraryDay(
        dayIndex + 1 + Math.floor(Math.random() * 5),
        selectedDest.name,
        selectedDest.nearbyAttractions,
        selectedDest.restaurants,
        interests,
        pace
      );
      const itinerary = [...prev.itinerary];
      itinerary[dayIndex] = { ...newDay, day: dayIndex + 1 };
      return { ...prev, itinerary };
    });
    toast({ title: 'Day refreshed', description: `Day ${dayIndex + 1} has new activity suggestions.` });
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
      title: 'Plan Saved!',
      description: 'You can find this plan in your dashboard.',
    });
  };

  const slotIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Sun className="h-4 w-4" />;
      case 'utensils':
        return <Utensils className="h-4 w-4" />;
      case 'moon':
        return <Moon className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">AI Trip Planner</h1>
          <p className="text-xl text-muted-foreground">Design a personalized, day-by-day itinerary in seconds.</p>
        </div>

        {!generatedPlan ? (
          <motion.div
            className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-lg flex items-center">
                  <Pencil className="mr-2 h-5 w-5 text-primary" /> Trip name (optional)
                </Label>
                <Input
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="e.g. Summer Escape"
                  className="h-14 text-lg"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-lg flex items-center">
                  <Map className="mr-2 h-5 w-5 text-primary" /> Where are you going?
                </Label>
                <Select value={destinationId} onValueChange={setDestinationId}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}, {d.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" /> Start date
                </Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-14 text-lg" />
              </div>

              <div className="space-y-3">
                <Label className="text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" /> Days
                  </span>
                  <span className="font-bold text-primary">{days}</span>
                </Label>
                <Slider value={[days]} onValueChange={(v) => setDays(v[0])} min={1} max={14} step={1} className="py-4" />
              </div>

              <div className="space-y-3">
                <Label className="text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" /> Travelers
                  </span>
                  <span className="font-bold text-primary">{travelers}</span>
                </Label>
                <Slider value={[travelers]} onValueChange={(v) => setTravelers(v[0])} min={1} max={8} step={1} className="py-4" />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg flex items-center">
                <Wallet className="mr-2 h-5 w-5 text-primary" /> Travel Style
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {['budget', 'moderate', 'luxury'].map((b) => (
                  <div
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`cursor-pointer rounded-xl border-2 p-4 text-center capitalize font-medium transition-all ${
                      budget === b ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    {b}
                    <p className="text-xs font-normal text-muted-foreground mt-1">${budgetDailyCost[b]}/day</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg flex items-center">
                <Gauge className="mr-2 h-5 w-5 text-primary" /> Travel Pace
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {paceOptions.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setPace(p.id)}
                    className={`cursor-pointer rounded-xl border-2 p-4 text-center font-medium transition-all ${
                      pace === p.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    {p.label}
                    <p className="text-xs font-normal text-muted-foreground mt-1">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary" /> What are you interested in?
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {interestOptions.map((opt) => {
                  const Icon = opt.icon;
                  const checked = interests.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleInterest(opt.id)}
                      className={`cursor-pointer rounded-xl border-2 p-4 flex items-center gap-3 transition-all ${
                        checked ? 'border-primary bg-primary/10' : 'border-border bg-background hover:border-primary/50'
                      }`}
                    >
                      <Checkbox checked={checked} onCheckedChange={() => toggleInterest(opt.id)} />
                      <Icon className={`h-4 w-4 ${checked ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-3xl border border-dashed border-border/60">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Plane className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Ready to craft your journey?</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                Our AI factors in your interests, pace, and budget to build a realistic itinerary with cost estimates.
              </p>
              <Button size="lg" className="w-full max-w-sm h-14 text-lg rounded-xl" onClick={generatePlan} disabled={!destinationId || isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Crafting your trip...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" /> Generate Itinerary
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            <div className="relative rounded-3xl overflow-hidden h-56">
              <img src={generatedPlan.image} alt={generatedPlan.destination} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col md:flex-row justify-between md:items-end gap-4 text-white">
                <div>
                  <h2 className="text-3xl font-display font-bold">{generatedPlan.tripName}</h2>
                  <p className="text-white/80 capitalize">
                    {generatedPlan.destination} • {generatedPlan.days} Days • {generatedPlan.travelers} Traveler{generatedPlan.travelers > 1 ? 's' : ''} • {generatedPlan.budget} Style
                  </p>
                  {generatedPlan.startDate && <p className="text-white/70 text-sm mt-1">Starting {new Date(generatedPlan.startDate).toLocaleDateString()}</p>}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="bg-background/20 backdrop-blur border-white/30 text-white hover:bg-background/30" onClick={() => setGeneratedPlan(null)}>
                    Start Over
                  </Button>
                  <Button onClick={savePlan}>
                    <Save className="mr-2 h-4 w-4" /> Save Plan
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {generatedPlan.itinerary.map((day: any, idx: number) => (
                  <Card key={day.day} className="p-6 md:p-8 rounded-3xl border-border/60 shadow-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
                      <h3 className="text-2xl font-bold text-primary">Day {day.day}</h3>
                      <Button variant="ghost" size="sm" onClick={() => regenerateDay(idx)}>
                        <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {day.slots.map((slot: any) => (
                        <div key={slot.time} className="flex gap-4">
                          <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit text-primary">{slotIcon(slot.icon)}</div>
                          <div>
                            <h4 className="font-bold text-lg mb-1">{slot.time}</h4>
                            <p className="text-muted-foreground leading-relaxed">{slot.activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <Card className="p-6 rounded-3xl border-border/60 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-primary" /> Budget Estimate
                  </h3>
                  <p className="text-3xl font-display font-bold mb-4">
                    ${generatedPlan.totalCost.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground"> total</span>
                  </p>
                  <div className="space-y-3">
                    {generatedPlan.budgetBreakdown.map((b: any) => (
                      <div key={b.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">{b.label}</span>
                          <span className="font-medium">${b.amount.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${b.pct * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 rounded-3xl border-border/60 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Backpack className="mr-2 h-5 w-5 text-primary" /> Packing List
                  </h3>
                  <ul className="space-y-3">
                    {generatedPlan.packingList.map((item: string) => (
                      <li key={item} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 mr-2 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {generatedPlan.interests.length > 0 && (
                  <Card className="p-6 rounded-3xl border-border/60 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Coffee className="mr-2 h-5 w-5 text-primary" /> Tailored For
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedPlan.interests.map((i: string) => {
                        const opt = interestOptions.find((o) => o.id === i);
                        return (
                          <Badge key={i} variant="secondary" className="capitalize">
                            {opt?.label || i}
                          </Badge>
                        );
                      })}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
