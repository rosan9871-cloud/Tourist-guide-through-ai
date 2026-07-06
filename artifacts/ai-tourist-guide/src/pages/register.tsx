import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Compass, Mail, Lock, User } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && name) {
      login(email, name);
      setLocation('/dashboard');
    }
  };

  const handleGoogle = () => {
    login('google_user@example.com', 'Google User');
    setLocation('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background"></div>
      
      <motion.div 
        className="w-full max-w-md bg-card p-8 md:p-12 rounded-3xl shadow-xl border border-border"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-secondary/10 p-4">
            <Compass className="h-10 w-10 text-secondary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-center mb-2">Create Account</h1>
        <p className="text-muted-foreground text-center mb-8">Start planning your dream trip today.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                id="name" 
                type="text" 
                placeholder="Jane Doe" 
                className="pl-10 h-12 bg-background/50"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                placeholder="hello@example.com" 
                className="pl-10 h-12 bg-background/50"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="pl-10 h-12 bg-background/50"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-lg rounded-xl shadow-md bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            Sign Up
          </Button>
        </form>

        <div className="mt-8 flex items-center before:flex-1 before:border-t before:border-border after:flex-1 after:border-t after:border-border">
          <span className="mx-4 text-sm text-muted-foreground">or</span>
        </div>

        <Button variant="outline" type="button" onClick={handleGoogle} className="w-full mt-6 h-12 rounded-xl">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign up with Google
        </Button>

        <p className="mt-8 text-center text-muted-foreground">
          Already have an account?{' '}
          <button onClick={() => setLocation('/login')} className="text-secondary hover:underline font-medium">
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
}
