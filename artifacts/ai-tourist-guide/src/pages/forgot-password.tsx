import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-24 relative overflow-hidden bg-background">
      <motion.div 
        className="w-full max-w-md bg-card p-8 md:p-12 rounded-3xl shadow-xl border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button 
          onClick={() => setLocation('/login')}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to login
        </button>

        {!submitted ? (
          <>
            <h1 className="text-3xl font-display font-bold mb-2">Reset Password</h1>
            <p className="text-muted-foreground mb-8">Enter your email and we'll send you a link to reset your password.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              <Button type="submit" className="w-full h-12 text-lg rounded-xl shadow-md">
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary/10 p-4">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Check your inbox</h2>
            <p className="text-muted-foreground mb-8">We've sent a password reset link to {email}</p>
            <Button onClick={() => setLocation('/login')} className="w-full h-12 rounded-xl">
              Return to Login
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
