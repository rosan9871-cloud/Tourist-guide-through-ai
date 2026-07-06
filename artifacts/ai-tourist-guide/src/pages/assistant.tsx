import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Mic, Globe, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { chatStarterQuestions } from '@/lib/data';
import { useAuth } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { languages as appLanguages } from '@/lib/i18n';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

const dummyReplies = [
  "Great question! Based on what locals recommend, I'd suggest starting early in the morning to beat the crowds and the heat.",
  "That's one of the most beloved spots in the area. Try to visit during golden hour for the best photos and a quieter atmosphere.",
  "You'll want to try the regional specialty dishes — ask for what's freshest that day, locals usually know best.",
  "A great walking route would connect the main square, the old quarter, and end near the waterfront for sunset.",
  "This neighborhood has a rich history dating back centuries, blending old-world charm with a lively modern culture.",
];

function makeReply() {
  return dummyReplies[Math.floor(Math.random() * dummyReplies.length)];
}

export default function Assistant() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [chatLanguage, setChatLanguage] = useState(appLanguages[0].label);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hi${user ? ` ${user.name.split(' ')[0]}` : ''}! I'm your Wanderlens AI guide. Ask me anything about local food, history, routes, or hidden gems.`,
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: Math.random().toString(36).slice(2, 9), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply: Message = {
        id: Math.random().toString(36).slice(2, 9),
        role: 'assistant',
        text: makeReply(),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="border-b border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">{t('assistant_title')}</h1>
              <p className="text-sm text-muted-foreground">{t('assistant_subtitle')}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Globe className="h-4 w-4" /> {chatLanguage}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {appLanguages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setChatLanguage(lang.label)}>
                  {lang.flag} {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 max-w-3xl w-full flex flex-col">
        <div className="flex-1 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="h-9 w-9 shrink-0">
                {msg.role === 'assistant' ? (
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                ) : (
                  <AvatarFallback>{user ? user.name.charAt(0) : 'U'}</AvatarFallback>
                )}
              </Avatar>
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm md:text-base leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-card border border-border rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1.5 items-center">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length <= 1 && (
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-3 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-primary" /> Try asking
            </p>
            <div className="flex flex-wrap gap-2">
              {chatStarterQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-4 py-2 rounded-full border border-border text-sm hover:border-primary/50 hover:bg-primary/5 transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border/50 bg-card/50 sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-3"
          >
            <Button type="button" variant="outline" size="icon" className="h-12 w-12 rounded-full shrink-0" aria-label="Voice input">
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about food, routes, history..."
              className="h-12 rounded-full flex-1"
            />
            <Button type="submit" size="icon" className="h-12 w-12 rounded-full shrink-0" disabled={!input.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
