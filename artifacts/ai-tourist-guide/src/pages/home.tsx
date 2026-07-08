import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, Compass, Map, Camera, MessageSquare, MessageCircle, Mail, HelpCircle, Shield, FileText, Cookie, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinations } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/language';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const faqItems = [
  {
    q: 'Is Wanderlens free to use?',
    a: 'Yes! Wanderlens is completely free for all core features including AI Camera, Trip Planner, and AI Travel Guide. This is a college capstone project built for education purposes.',
  },
  {
    q: 'How does the AI Camera work?',
    a: 'Simply point your camera at any landmark or upload a photo. Our AI analyzes the image and instantly provides detailed information about the location — its history, architecture, entry fees, opening hours, and nearby attractions.',
  },
  {
    q: 'Can I save my trip plans?',
    a: 'Absolutely. Once you create an account, all your generated itineraries and favorite destinations are saved to your personal dashboard and synced via your browser\'s local storage.',
  },
  {
    q: 'Which languages does Wanderlens support?',
    a: 'Wanderlens currently supports English, Spanish, French, Hindi, Japanese, and German. You can switch languages anytime using the language selector in the navigation bar.',
  },
  {
    q: 'Is my personal data safe?',
    a: 'We do not collect or transmit any personal data to external servers. All your information — trip plans, favorites, and preferences — is stored locally in your browser. See our Privacy Policy for full details.',
  },
];

const privacyText = `Last updated: July 2026

Wanderlens ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our application.

Information We Collect
We do not collect any personal information from users. Wanderlens is a frontend-only application; all data (trip plans, favorites, preferences, and scan history) is stored exclusively in your browser's localStorage and never transmitted to any external server.

How We Use Your Information
Since we do not collect data, we do not use, sell, share, or disclose personal information to third parties.

Cookies
We use browser localStorage solely to remember your language preference and saved destinations. We do not use tracking cookies or advertising cookies.

Third-Party Services
Wanderlens does not integrate with third-party analytics, advertising networks, or data brokers.

Children's Privacy
Our service is not directed to children under 13. We do not knowingly collect personal information from children.

Changes to This Policy
We may update this policy periodically. Any changes will be reflected on this page with an updated date.

Contact
For questions about this policy, please use our support channels.`;

const termsText = `Last updated: July 2026

Welcome to Wanderlens. By using our application, you agree to the following terms.

Use of Service
Wanderlens is provided for personal, non-commercial use as a travel information and planning tool. This is a college capstone project and is intended for educational and demonstration purposes.

Intellectual Property
All content, design, and code in Wanderlens is the property of the Wanderlens development team. Destination information and landmark data are used for educational purposes.

Disclaimer of Warranties
Wanderlens is provided "as is" without warranties of any kind. Travel information, entry fees, and opening hours are for demonstration purposes and may not reflect real-world accuracy. Always verify travel information with official sources before your trip.

Limitation of Liability
We are not liable for any travel decisions made based on information provided by Wanderlens. Users are responsible for verifying all travel details independently.

Modifications
We reserve the right to modify or discontinue the service at any time without notice.

Contact
If you have questions about these terms, please reach out through our support channels.`;

const cookieText = `Last updated: July 2026

Wanderlens uses browser localStorage — not traditional cookies — to enhance your experience.

What We Store
- Language preference: We remember your selected language so you don't have to switch it every visit.
- Favorites: Destinations you've saved as favorites are stored locally.
- Trip plans: Generated itineraries are stored in your browser for easy access.
- Camera scan history: Recent AI Camera results are saved locally.

We Do Not Use
- Advertising cookies
- Analytics cookies
- Cross-site tracking

Third-Party Cookies
Wanderlens does not load any third-party scripts that set cookies or tracking pixels.

Your Control
You can clear all stored data at any time by clearing your browser's site data or localStorage for this domain. This will reset your preferences, favorites, and trip history.

Contact
Questions about our data practices? Contact us through our support channels.`;

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

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
            {t('home_hero_title1')} <br className="hidden md:block" />
            <span className="text-primary">{t('home_hero_title2')}</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('home_hero_subtitle')}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all" onClick={() => setLocation('/explore')}>
              {t('home_cta_explore')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full" onClick={() => setLocation('/camera')}>
              <Camera className="mr-2 h-5 w-5" /> {t('home_cta_camera')}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('home_features_title')}</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t('home_features_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('home_feature_camera_title'), icon: Camera, desc: t('home_feature_camera_desc') },
              { title: t('home_feature_planner_title'), icon: Map, desc: t('home_feature_planner_desc') },
              { title: t('home_feature_guide_title'), icon: MessageSquare, desc: t('home_feature_guide_desc') },
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('home_trending_title')}</h2>
              <p className="text-lg text-muted-foreground">{t('home_trending_subtitle')}</p>
            </div>
            <Button variant="ghost" onClick={() => setLocation('/explore')} className="hidden sm:flex">
              {t('common_viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
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
            {t('common_viewAll')} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Customer Support Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
                <Phone className="h-4 w-4" /> Support
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('home_support_title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('home_support_subtitle')}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: MessageCircle,
                title: t('home_support_chat_title'),
                desc: t('home_support_chat_desc'),
                btn: t('home_support_chat_btn'),
                color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
              },
              {
                icon: Mail,
                title: t('home_support_email_title'),
                desc: t('home_support_email_desc'),
                btn: t('home_support_email_btn'),
                color: 'bg-green-500/10 text-green-600 dark:text-green-400',
              },
              {
                icon: HelpCircle,
                title: t('home_support_faq_title'),
                desc: t('home_support_faq_desc'),
                btn: t('home_support_faq_btn'),
                color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="bg-background rounded-3xl border border-border/50 p-8 shadow-sm hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 ${card.color}`}>
                  <card.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{card.desc}</p>
                <Button variant="outline" className="w-full rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {card.btn}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* FAQ Accordion */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-display font-bold text-center mb-8">{t('home_support_faq_title')}</h3>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="bg-background rounded-2xl border border-border/50 overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold pr-4">{item.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('home_policy_title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('home_policy_subtitle')}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                title: t('home_policy_privacy'),
                desc: 'We collect no personal data. All your information stays on your device.',
                modal: 'privacy' as const,
                color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
              },
              {
                icon: FileText,
                title: t('home_policy_terms'),
                desc: 'Understand the terms of using Wanderlens and what you can expect from us.',
                modal: 'terms' as const,
                color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
              },
              {
                icon: Cookie,
                title: t('home_policy_cookies'),
                desc: 'We only use localStorage to remember your preferences — no tracking cookies.',
                modal: 'cookies' as const,
                color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="bg-card rounded-3xl border border-border p-8 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => setPolicyModal(card.modal)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 ${card.color}`}>
                  <card.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{card.desc}</p>
                <span className="text-primary text-sm font-semibold group-hover:underline">Read more →</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="flex items-center gap-2 text-foreground">
              <Compass className="h-6 w-6 text-primary" />
              <span className="font-display text-2xl font-bold">Wanderlens</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <button onClick={() => setLocation('/explore')} className="hover:text-foreground transition-colors">{t('nav_explore')}</button>
              <button onClick={() => setLocation('/camera')} className="hover:text-foreground transition-colors">{t('nav_camera')}</button>
              <button onClick={() => setLocation('/assistant')} className="hover:text-foreground transition-colors">{t('footer_support')}</button>
              <button onClick={() => setPolicyModal('privacy')} className="hover:text-foreground transition-colors">{t('footer_privacy')}</button>
              <button onClick={() => setPolicyModal('terms')} className="hover:text-foreground transition-colors">{t('footer_terms')}</button>
              <button onClick={() => setPolicyModal('cookies')} className="hover:text-foreground transition-colors">{t('footer_cookies')}</button>
            </nav>
          </div>
          <div className="border-t border-border pt-6 text-center text-muted-foreground">
            <p className="mb-2 text-sm">{t('home_footer_tagline')}</p>
            <p className="text-xs">© {new Date().getFullYear()} Wanderlens. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Policy Modals */}
      <Dialog open={policyModal === 'privacy'} onOpenChange={() => setPolicyModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5 text-primary" /> {t('home_policy_privacy')}
            </DialogTitle>
          </DialogHeader>
          <pre className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed font-sans">{privacyText}</pre>
        </DialogContent>
      </Dialog>

      <Dialog open={policyModal === 'terms'} onOpenChange={() => setPolicyModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-5 w-5 text-primary" /> {t('home_policy_terms')}
            </DialogTitle>
          </DialogHeader>
          <pre className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed font-sans">{termsText}</pre>
        </DialogContent>
      </Dialog>

      <Dialog open={policyModal === 'cookies'} onOpenChange={() => setPolicyModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Cookie className="h-5 w-5 text-primary" /> {t('home_policy_cookies')}
            </DialogTitle>
          </DialogHeader>
          <pre className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed font-sans">{cookieText}</pre>
        </DialogContent>
      </Dialog>
    </div>
  );
}
