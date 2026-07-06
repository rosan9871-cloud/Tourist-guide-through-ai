import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera as CameraIcon,
  Upload,
  Loader2,
  Sparkles,
  MapPin,
  Landmark,
  Lightbulb,
  RotateCcw,
  BookOpen,
  Video,
  X,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cameraResultPool, type CameraResult } from '@/lib/data';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/language';

type Status = 'idle' | 'analyzing' | 'result';
type Mode = 'choose' | 'live' | 'preview';

export default function CameraPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<Status>('idle');
  const [mode, setMode] = useState<Mode>('choose');
  const [image, setImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const [result, setResult] = useState<CameraResult>(cameraResultPool[0]);

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsStreamReady(false);
  };

  const startCamera = async (nextFacing: 'environment' | 'user' = facingMode) => {
    setCameraError(null);
    stopStream();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: nextFacing },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsStreamReady(true);
    } catch (err) {
      setCameraError(
        'Could not access your camera. Check browser permissions, or use "Upload Photo" instead.'
      );
      setIsStreamReady(false);
    }
  };

  const openLiveCamera = () => {
    setMode('live');
    startCamera();
  };

  const switchCamera = () => {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    startCamera(next);
  };

  const closeLiveCamera = () => {
    stopStream();
    setMode('choose');
    setCameraError(null);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setImage(dataUrl);
    stopStream();
    setMode('preview');
    setStatus('idle');
  };

  useEffect(() => {
    return () => stopStream();
  }, []);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setMode('preview');
      setStatus('idle');
    };
    reader.readAsDataURL(file);
  };

  const analyze = () => {
    setStatus('analyzing');
    const picked = cameraResultPool[Math.floor(Math.random() * cameraResultPool.length)];
    setTimeout(() => {
      setResult(picked);
      setStatus('result');
      if (user) {
        const saved = localStorage.getItem('wanderlens_scans');
        const scans = saved ? JSON.parse(saved) : [];
        scans.unshift({
          id: Math.random().toString(36).slice(2, 9),
          name: picked.landmarkName,
          date: new Date().toISOString(),
        });
        localStorage.setItem('wanderlens_scans', JSON.stringify(scans.slice(0, 20)));
      }
    }, 2200);
  };

  const reset = () => {
    setImage(null);
    setStatus('idle');
    setMode('choose');
  };

  return (
    <div className="min-h-screen pb-24">
      <section className="relative pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CameraIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight">
              {t('camera_title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              {t('camera_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-3xl">
        <AnimatePresence mode="wait">
          {status !== 'result' ? (
            <motion.div
              key="capture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm">
                {mode === 'choose' && (
                  <div className="border-2 border-dashed border-border rounded-2xl aspect-video flex flex-col items-center justify-center text-center p-8">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <CameraIcon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Capture or upload a photo</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm">
                      Use your camera to capture a landmark in real time, or upload a photo from your device.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={openLiveCamera}>
                        <Video className="mr-2 h-4 w-4" /> {t('camera_open')}
                      </Button>
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> {t('camera_upload')}
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                  </div>
                )}

                {mode === 'live' && (
                  <div>
                    <div className="relative rounded-2xl overflow-hidden aspect-video mb-6 bg-black">
                      <video
                        ref={videoRef}
                        playsInline
                        muted
                        className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                      />
                      <canvas ref={canvasRef} className="hidden" />

                      {!isStreamReady && !cameraError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                          <Loader2 className="h-8 w-8 animate-spin mb-3" />
                          <p className="text-sm text-white/80">Starting camera...</p>
                        </div>
                      )}

                      {cameraError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                          <AlertCircle className="h-8 w-8 mb-3 text-destructive" />
                          <p className="text-sm text-white/90 max-w-xs">{cameraError}</p>
                        </div>
                      )}

                      <button
                        onClick={closeLiveCamera}
                        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        aria-label="Close camera"
                      >
                        <X className="h-5 w-5" />
                      </button>

                      {isStreamReady && (
                        <button
                          onClick={switchCamera}
                          className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                          aria-label="Switch camera"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        size="lg"
                        className="flex-1 h-14 text-lg rounded-xl"
                        onClick={capturePhoto}
                        disabled={!isStreamReady}
                      >
                        <CameraIcon className="mr-2 h-5 w-5" /> {t('camera_capture')}
                      </Button>
                      <Button size="lg" variant="outline" className="h-14 rounded-xl" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> {t('camera_upload')}
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                  </div>
                )}

                {mode === 'preview' && image && (
                  <div>
                    <div className="relative rounded-2xl overflow-hidden aspect-video mb-6">
                      <img src={image} alt="Captured landmark" className="w-full h-full object-cover" />
                      {status === 'analyzing' && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                          <Loader2 className="h-10 w-10 animate-spin mb-4" />
                          <p className="font-medium text-lg">Analyzing landmark...</p>
                          <p className="text-white/70 text-sm mt-1">Our AI is identifying details</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        size="lg"
                        className="flex-1 h-14 text-lg rounded-xl"
                        onClick={analyze}
                        disabled={status === 'analyzing'}
                      >
                        {status === 'analyzing' ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t('camera_analyzing')}
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-5 w-5" /> {t('camera_analyze')}
                          </>
                        )}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-14 rounded-xl"
                        onClick={() => {
                          setImage(null);
                          setMode('choose');
                          setStatus('idle');
                        }}
                        disabled={status === 'analyzing'}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" /> {t('camera_retake')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-video">
                {image && <img src={image} alt="Analyzed landmark" className="w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Badge className="bg-primary/90 border-none mb-3">Identified</Badge>
                  <h2 className="text-3xl md:text-4xl font-display font-bold">
                    {result.landmarkName}
                  </h2>
                  <p className="text-white/80 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1.5" /> {result.country} • {result.coordinates}
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
                <p className="text-lg text-muted-foreground mb-6">{result.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted/30 rounded-2xl p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-1">{t('camera_bestTime')}</h3>
                    <p className="text-sm text-muted-foreground">{result.bestTimeToVisit}</p>
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-1">{t('camera_entryFee')}</h3>
                    <p className="text-sm text-muted-foreground">{result.entryFee}</p>
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-1">{t('camera_hours')}</h3>
                    <p className="text-sm text-muted-foreground">{result.openingHours}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-muted/30 rounded-2xl p-5">
                    <h3 className="font-bold mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-primary" /> {t('camera_history')}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{result.history}</p>
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-5">
                    <h3 className="font-bold mb-2 flex items-center">
                      <Landmark className="h-4 w-4 mr-2 text-primary" /> {t('camera_architecture')}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{result.architecture}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-3 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" /> {t('camera_facts')}
                  </h3>
                  <ul className="space-y-2">
                    {result.interestingFacts.map((fact) => (
                      <li key={fact} className="flex items-start text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-bold mb-3 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" /> {t('camera_nearby')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.nearbyPlaces.map((p) => (
                        <span key={p} className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-xs font-medium border border-secondary/20">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2 text-primary" /> {t('camera_tips')}
                    </h3>
                    <ul className="space-y-1">
                      {result.travelTips.map((tip) => (
                        <li key={tip} className="text-xs text-muted-foreground">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="flex-1 h-12 rounded-xl" onClick={reset}>
                    <CameraIcon className="mr-2 h-4 w-4" /> {t('camera_scanAnother')}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-xl"
                    onClick={() => {
                      if (!user) {
                        setLocation('/login');
                        return;
                      }
                      toast({ title: 'Saved to your dashboard', description: 'Find this scan under Recent Scans.' });
                    }}
                  >
                    {t('camera_saveToDashboard')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
