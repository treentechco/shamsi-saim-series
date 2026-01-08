"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Video,
  Sparkles,
  Heart,
  MapPin,
  Mail,
  Instagram,
  MessageCircle,
  ArrowRight,
  Quote,
  Wand2,
  Aperture,
  Film,
  Gem,
} from "lucide-react";

/**
 * Single-file React page (Next.js App Router friendly).
 * - TailwindCSS required
 * - framer-motion + lucide-react required
 * Drop in: app/page.tsx OR src/App.tsx (adjust export if needed)
 */

const cx = (...c) => c.filter(Boolean).join(" ");

// Assets
const LOGO_URL = "/shamsi-saim-logo.png";

// Replace these with your real wedding photos later (recommended: hosted on your own domain/CDN)
// NOTE: We also use a SafeImage fallback so the UI never breaks if a remote image 404s.
const HERO_IMAGES = [
  "/images/hero_groom.jpg",
  "/images/hero_venue.jpg",
  "/images/hero_couple.jpg",
];

const HIGHLIGHT_IMAGES = [
  "/images/highlight_bangles.jpg",
  "/images/highlight_group.jpg",
  "/images/hero_groom.jpg",
  "/images/hero_venue.jpg",
  "/images/hero_couple.jpg",
];

const FALLBACK_IMG =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(`<?xml version='1.0' encoding='UTF-8'?>
<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
  <defs>
    <radialGradient id='a' cx='25%' cy='20%' r='75%'>
      <stop offset='0' stop-color='rgba(245,158,11,0.35)'/>
      <stop offset='0.5' stop-color='rgba(236,72,153,0.18)'/>
      <stop offset='1' stop-color='rgba(0,0,0,1)'/>
    </radialGradient>
    <pattern id='g' width='140' height='140' patternUnits='userSpaceOnUse'>
      <circle cx='18' cy='22' r='1.2' fill='rgba(255,255,255,0.10)'/>
      <circle cx='90' cy='50' r='1.1' fill='rgba(255,255,255,0.08)'/>
      <circle cx='55' cy='110' r='1.0' fill='rgba(255,255,255,0.08)'/>
    </pattern>
  </defs>
  <rect width='1200' height='800' fill='black'/>
  <rect width='1200' height='800' fill='url(#a)'/>
  <rect width='1200' height='800' fill='url(#g)' opacity='0.75'/>
  <g opacity='0.9'>
    <path d='M460 360c0-85 60-145 140-145s140 60 140 145' fill='none' stroke='rgba(245,158,11,0.55)' stroke-width='6' stroke-linecap='round'/>
    <circle cx='600' cy='410' r='82' fill='rgba(255,255,255,0.06)' stroke='rgba(255,255,255,0.14)' stroke-width='3'/>
    <circle cx='600' cy='410' r='46' fill='rgba(245,158,11,0.18)'/>
    <text x='600' y='560' text-anchor='middle' font-family='ui-sans-serif,system-ui' font-size='26' fill='rgba(255,255,255,0.72)'>Image unavailable</text>
    <text x='600' y='592' text-anchor='middle' font-family='ui-sans-serif,system-ui' font-size='16' fill='rgba(255,255,255,0.45)'>Replace with your portfolio photos</text>
  </g>
</svg>`);



const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function SectionHeader({ kicker, title, desc }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/5 px-3 py-1 text-xs text-amber-100/80">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="tracking-wide">{kicker}</span>
        </div>
      ) : null}
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-sm leading-6 text-zinc-300">{desc}</p> : null}
    </div>
  );
}

function SafeImage({ src, alt, className, loading = "lazy" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src !== FALLBACK_IMG) {
          img.src = FALLBACK_IMG;
        }
      }}
    />
  );
}

function Pill({ icon: Icon, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-20 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.16),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.12),transparent_60%)]" />
      </div>
      <div className="relative flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
          <Icon className="h-5 w-5 text-amber-200" />
        </div>
        <div>
          <div className="text-sm font-semibold text-zinc-50">{title}</div>
          <div className="mt-1 text-sm leading-6 text-zinc-300">{text}</div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ icon: Icon, title, desc, bullets }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60 p-6"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.12),transparent_60%)]" />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
          <Icon className="h-5 w-5 text-amber-200" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-zinc-50">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{desc}</p>
          {bullets?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-zinc-200">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/70" />
                  <span className="text-zinc-300">{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="relative mt-6 flex items-center gap-2 text-xs text-amber-200/80">
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1">Vintage</span>
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1">Sufi Soul</span>
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1">Timeless</span>
      </div>
    </motion.div>
  );
}

function ArchBackdrop() {
  // Subtle “mosque arch” lines + film grain dots
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(245,158,11,0.22)" />
          <stop offset="0.55" stopColor="rgba(236,72,153,0.10)" />
          <stop offset="1" stopColor="rgba(99,102,241,0.10)" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="65%">
          <stop offset="0" stopColor="rgba(245,158,11,0.18)" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <pattern id="grain" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="18" r="1" fill="rgba(255,255,255,0.06)" />
          <circle cx="48" cy="70" r="1" fill="rgba(255,255,255,0.05)" />
          <circle cx="92" cy="38" r="1" fill="rgba(255,255,255,0.05)" />
          <circle cx="78" cy="96" r="1" fill="rgba(255,255,255,0.05)" />
        </pattern>
      </defs>

      <rect width="1200" height="800" fill="url(#glow)" />

      {/* arches */}
      <g fill="none" stroke="url(#g1)" strokeWidth="1" opacity="0.65">
        <path d="M120 760 C120 460, 260 260, 420 220 C560 188, 640 240, 700 360 C770 500, 880 760, 1080 760" />
        <path d="M150 760 C170 500, 330 320, 470 290 C610 260, 690 305, 740 420 C800 560, 900 760, 1050 760" opacity="0.45" />
        <path d="M90 760 C90 430, 250 200, 430 160 C600 120, 700 200, 770 340 C850 520, 940 760, 1110 760" opacity="0.32" />
      </g>

      {/* grain */}
      <rect width="1200" height="800" fill="url(#grain)" opacity="0.65" />
    </svg>
  );
}

function CameraRigGraphic() {
  // Minimal camera + light stand SVG that gently floats
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-30px] top-[90px] hidden w-[520px] max-w-[45vw] opacity-80 md:block"
      initial={{ opacity: 0, x: 18, y: -6 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.svg
        viewBox="0 0 900 600"
        className="h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="lens" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(245,158,11,0.85)" />
            <stop offset="0.45" stopColor="rgba(236,72,153,0.25)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.04)" />
          </radialGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
          <radialGradient id="beam" cx="25%" cy="15%" r="85%">
            <stop offset="0" stopColor="rgba(245,158,11,0.22)" />
            <stop offset="0.45" stopColor="rgba(245,158,11,0.10)" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Light beam that "washes" page */}
        <motion.path
          d="M250 100 C420 60, 620 80, 820 180 L820 520 C610 470, 430 450, 220 520 Z"
          fill="url(#beam)"
          initial={{ opacity: 0.25 }}
          animate={{ opacity: [0.15, 0.28, 0.18] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Light stand */}
        <g opacity="0.92">
          <path d="M140 120 L200 160" stroke="rgba(245,158,11,0.55)" strokeWidth="4" />
          <path d="M120 520 L190 160" stroke="url(#metal)" strokeWidth="6" />
          <path d="M70 520 L190 160" stroke="url(#metal)" strokeWidth="6" opacity="0.7" />
          <path d="M170 520 L190 160" stroke="url(#metal)" strokeWidth="6" opacity="0.7" />
          <path d="M190 160 L240 130" stroke="url(#metal)" strokeWidth="6" />
          <path d="M240 130 L300 150" stroke="rgba(245,158,11,0.5)" strokeWidth="5" />
          <path d="M295 145 L330 120" stroke="rgba(245,158,11,0.45)" strokeWidth="4" />
          <circle cx="330" cy="120" r="22" fill="rgba(245,158,11,0.16)" stroke="rgba(245,158,11,0.55)" />
          <circle cx="330" cy="120" r="10" fill="rgba(245,158,11,0.25)" filter="url(#soft)" />
        </g>

        {/* Camera */}
        <motion.g
          initial={{ y: 0 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="420" y="250" width="330" height="180" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)" />
          <rect x="455" y="220" width="120" height="55" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)" />
          <circle cx="585" cy="340" r="80" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.10)" />
          <circle cx="585" cy="340" r="62" fill="url(#lens)" />
          <circle cx="585" cy="340" r="32" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.10)" />
          <path d="M740 305 L820 280 L820 400 L740 370 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)" />
          <circle cx="495" cy="320" r="10" fill="rgba(245,158,11,0.45)" />
          <rect x="465" y="410" width="250" height="14" rx="7" fill="rgba(245,158,11,0.12)" />
        </motion.g>

        {/* Ornamental swirl */}
        <path
          d="M520 170 C560 120, 640 120, 690 160 C740 200, 730 250, 670 255"
          stroke="rgba(236,72,153,0.28)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
}

function Navbar() {
  const items = useMemo(
    () => [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Style", href: "#style" },
      { label: "Services", href: "#services" },
      { label: "Approach", href: "#approach" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  return (
    <div className="sticky top-0 z-50 border-b border-zinc-900/70 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="group inline-flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/20 bg-amber-300/10">
            <SafeImage src={LOGO_URL} alt="Shamsi Saim Weddings" className="h-full w-full object-cover" loading="eager" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-zinc-50">Shamsi Saim</div>
            <div className="text-[11px] text-zinc-400">Weddings • Vintage • Sufi Soul</div>
          </div>
        </a>

        <div className="hidden items-center gap-1.5 md:flex">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="rounded-full px-3 py-2 text-xs text-zinc-300 transition hover:bg-white/5 hover:text-zinc-50"
            >
              {it.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-semibold text-amber-100 transition hover:bg-amber-300/15"
        >
          <Mail className="h-4 w-4" />
          Book Your Wedding
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <a
        href="https://instagram.com/"
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/60 px-3 py-2 text-xs text-zinc-200 shadow-lg backdrop-blur transition hover:border-amber-300/30 hover:bg-white/5"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-300/20 bg-pink-300/10">
          <Instagram className="h-4 w-4 text-pink-200" />
        </span>
        <span className="hidden sm:block">Instagram</span>
      </a>

      <a
        href="https://wa.me/"
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/60 px-3 py-2 text-xs text-zinc-200 shadow-lg backdrop-blur transition hover:border-amber-300/30 hover:bg-white/5"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10">
          <MessageCircle className="h-4 w-4 text-emerald-200" />
        </span>
        <span className="hidden sm:block">WhatsApp</span>
      </a>
    </div>
  );
}

export default function Page() {
  return (
    <div id="home" className="min-h-screen bg-black text-zinc-50">
      <Navbar />
      <FloatingButtons />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ArchBackdrop />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.18),transparent_45%),radial-gradient(circle_at_70%_20%,rgba(236,72,153,0.12),transparent_50%),radial-gradient(circle_at_80%_75%,rgba(99,102,241,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black" />
        </div>

        <CameraRigGraphic />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[1.1fr,0.9fr]">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100/80">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="tracking-wide">Sufi-Inspired Traditional Wedding Stories</span>
            </motion.div>
             <SafeImage src={LOGO_URL} alt="Shamsi Saim Weddings" className="h-full w-full object-cover" loading="eager" />
            <motion.h1 variants={fadeUp} className="bold">
              Shamsi Saim Weddings
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-sm leading-7 text-zinc-200">
              We don’t just capture weddings — we preserve <span className="text-amber-200">روح</span>, <span className="text-amber-200">روایت</span>, and <span className="text-amber-200">محبت</span>.
              <br />
              Timeless frames, warm vintage tones, and stories rooted in tradition.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-xs font-semibold text-black transition hover:brightness-95"
              >
                <Mail className="h-4 w-4" />
                Book Your Wedding
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/30 px-5 py-3 text-xs font-semibold text-zinc-100 backdrop-blur transition hover:bg-white/5"
              >
                <Film className="h-4 w-4 text-amber-200" />
                Explore Services
              </a>

              <div className="ml-0 mt-2 flex items-center gap-3 text-[11px] text-zinc-400 sm:ml-2 sm:mt-0">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Pakistan • Destination Weddings
                </span>
                <span className="hidden h-3 w-px bg-zinc-800 sm:block" />
                <span className="inline-flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5" /> Culture over trends
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Image collage placeholders */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/50">
                <SafeImage src={HERO_IMAGES[0]} alt="Wedding portrait" className="aspect-[4/5] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.22),transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/0" />
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/50">
                <SafeImage src={HERO_IMAGES[1]} alt="Mehndi moment" className="aspect-[4/5] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.18),transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/0" />
              </div>
              <div className="relative col-span-2 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/50">
                <SafeImage src={HERO_IMAGES[2]} alt="Cinematic wedding frame" className="aspect-[16/9] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.14),transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
              </div>
            </div>

            <div className="absolute -left-6 -top-6 hidden h-20 w-20 rounded-full border border-amber-300/20 bg-amber-300/10 blur-[0.2px] md:block" />
            <div className="absolute -right-6 -bottom-6 hidden h-28 w-28 rounded-full border border-pink-300/20 bg-pink-300/10 blur-[0.2px] md:block" />
          </motion.div>
        </div>

        {/* Short Intro */}
        <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="grid gap-6 rounded-3xl border border-zinc-800 bg-zinc-950/50 p-7 sm:p-10 md:grid-cols-[1.2fr,0.8fr]"
          >
            <div>
              <div className="text-xs font-semibold tracking-wide text-amber-200/80">Short Intro</div>
              <h3 className="mt-3 text-xl font-semibold text-zinc-50">Slow. Soulful. Timeless.</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                In a world of fast trends and artificial poses, Shamsi Saim Weddings believes in slowing down.
                We capture weddings with a Sufi soul — warm vintage tones, meaningful moments, and stories rooted in tradition.
                Every frame is crafted to feel timeless, emotional, and deeply personal.
              </p>
            </div>
            <div className="grid gap-3">
              <div className="rounded-2xl border border-zinc-800 bg-black/40 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-50">
                  <Quote className="h-4 w-4 text-amber-200" />
                  Signature
                </div>
                <p className="mt-2 text-sm text-zinc-300">“Weddings with a Sufi Soul.”</p>
                <p className="mt-2 text-xs text-zinc-400">Stories told with warmth, tradition, and timeless emotion.</p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-black/40 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-50">
                  <Gem className="h-4 w-4 text-amber-200" />
                  Based In
                </div>
                <p className="mt-2 text-sm text-zinc-300">Pakistan • Destination Weddings</p>
                <p className="mt-2 text-xs text-zinc-400">Available for travel worldwide.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          kicker="About Us"
          title="Our Philosophy"
          desc="A wedding is not just an event. It is a du’a, a union of families, and a story written with emotions."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          <Pill
            icon={Wand2}
            title="Calmness & Depth"
            text="Inspired by Sufism, old traditions, and cultural heritage — far away from loud trends and artificial perfection."
          />
          <Pill
            icon={Heart}
            title="Emotion Over Poses"
            text="We observe, not direct. We chase real feeling — unscripted moments and honest connections."
          />
          <Pill
            icon={Sparkles}
            title="Timeless Craft"
            text="Every wedding is treated as a sacred story, not a project — edited to feel timeless, not trendy."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60"
        >
          <div className="grid gap-0 md:grid-cols-[1.2fr,0.8fr]">
            <div className="p-7 sm:p-10">
              <h3 className="text-lg font-semibold text-zinc-50">We believe:</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-300/70" />
                  Beauty lies in simplicity
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-300/70" />
                  Emotion is more powerful than poses
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-300/70" />
                  Tradition never goes out of style
                </li>
              </ul>
            </div>
            <div className="relative border-t border-zinc-800 md:border-l md:border-t-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(245,158,11,0.20),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.12),transparent_55%)]" />
              <div className="relative p-7 sm:p-10">
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-50">
                  <Quote className="h-4 w-4 text-amber-200" />
                  A Sacred Story
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  “Every wedding we capture is treated as a sacred story —
                  a memory that grows warmer with time.”
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100/80">
                  <Sparkles className="h-3.5 w-3.5" />
                  Sufi-inspired storytelling
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SIGNATURE STYLE */}
      <section id="style" className="relative border-y border-zinc-900 bg-black">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeader
            kicker="Our Signature Style"
            title="What Makes Us Different"
            desc="A soulful aesthetic with warm tones, heritage focus, and emotion-first storytelling."
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-10 grid gap-4 md:grid-cols-4"
          >
            <Pill
              icon={Sparkles}
              title="🕌 Sufi Aesthetic"
              text="Inspired by qawwali, spirituality, and the quiet beauty of soulful moments."
            />
            <Pill
              icon={Film}
              title="📷 Vintage Look & Warm Tones"
              text="Film-like colors that age beautifully with time — never harsh, never trendy."
            />
            <Pill
              icon={Heart}
              title="🤍 Emotion-Driven Storytelling"
              text="Unscripted moments, real feelings, honest connections — captured gently."
            />
            <Pill
              icon={MapPin}
              title="🏛 Traditional Focus"
              text="Perfect for cultural, desi, and heritage weddings — rituals respected with care."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-7 sm:p-10"
          >
            <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
              <div>
                <div className="text-xs font-semibold tracking-wide text-amber-200/80">Visual Mood</div>
                <h3 className="mt-3 text-lg font-semibold text-zinc-50">Warm Vintage Palette</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-300">
                  Think candlelight, old film grain, and gentle contrast. The vibe is nostalgic and spiritual —
                  like a memory you can feel.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  "bg-amber-300/15 border-amber-300/25",
                  "bg-pink-300/15 border-pink-300/25",
                  "bg-indigo-300/15 border-indigo-300/25",
                  "bg-orange-300/15 border-orange-300/25",
                  "bg-zinc-200/10 border-zinc-200/15",
                  "bg-emerald-300/12 border-emerald-300/18",
                ].map((cls, i) => (
                  <div key={i} className={cx("h-12 rounded-2xl border", cls)} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          kicker="Services"
          title="What We Offer"
          desc="Photography, cinematography, and reels — crafted with a spiritual rhythm and timeless finish."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          <ServiceCard
            icon={Camera}
            title="Wedding Photography"
            desc="Soulful storytelling through timeless frames. From quiet moments to grand traditions — we capture it all with depth and respect."
            bullets={["Candid, calm coverage", "Heritage details & rituals", "Warm vintage grading"]}
          />
          <ServiceCard
            icon={Video}
            title="Wedding Cinematography"
            desc="Cinematic films with a spiritual rhythm. Slow, emotional, and meaningful — not rushed, not noisy."
            bullets={["Narrative edit", "Sound design + ambiance", "Film-like tone"]}
          />
          <ServiceCard
            icon={Film}
            title="Traditional Wedding Reels"
            desc="Short films crafted with Sufi music, vintage color grading, and deep emotional flow. Perfect for couples who value culture over trends."
            bullets={["Sufi-inspired reel style", "Vintage grading", "Deep emotional pacing"]}
          />
        </motion.div>

        {/* Gallery strip placeholders */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60"
        >
          <div className="flex items-center justify-between gap-3 border-b border-zinc-800 px-6 py-4">
            <div className="text-sm font-semibold text-zinc-50">Highlights</div>
          </div>
          <div className="grid grid-cols-2 gap-3 p-6 md:grid-cols-5">
            {HIGHLIGHT_IMAGES.map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-black/40">
                <SafeImage src={src} alt={`Highlight ${i + 1}`} className="aspect-[4/5] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_25%,rgba(245,158,11,0.18),transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* APPROACH */}
      <section id="approach" className="relative border-y border-zinc-900 bg-black">
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeader
            kicker="Our Approach"
            title="How We Work"
            desc="Trust is everything — we listen first, observe gently, and craft a timeless final story."
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-10 grid gap-4 md:grid-cols-3"
          >
            <Pill
              icon={MessageCircle}
              title="1) Understanding Your Story"
              text="We listen before we shoot. Your traditions, your families, your moments — understood with respect."
            />
            <Pill
              icon={Camera}
              title="2) Observing, Not Directing"
              text="Minimal posing, maximum authenticity. We let moments unfold naturally."
            />
            <Pill
              icon={Sparkles}
              title="3) Crafting the Final Story"
              text="Every image & film is edited to feel timeless — not trendy. Warm tones, gentle pacing, real emotion."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-7 sm:p-10"
          >
            <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
              <div>
                <div className="text-xs font-semibold tracking-wide text-amber-200/80">Who We Are For</div>
                <h3 className="mt-3 text-lg font-semibold text-zinc-50">Couples who want meaning, not staging.</h3>
                <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                  {["Love traditional & cultural weddings", "Appreciate depth over drama", "Want their wedding to feel soulful, not staged", "Believe memories should age beautifully"].map(
                    (t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-300/70" />
                        {t}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-black/40 p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.12),transparent_60%)]" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-50">
                    <Quote className="h-4 w-4 text-amber-200" />
                    Signature Line
                  </div>
                  <p className="mt-3 text-base font-semibold text-zinc-50">“Weddings with a Sufi Soul.”</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">Stories told with warmth, tradition, and timeless emotion.</p>
                  <div className="mt-5 flex items-center gap-2 text-[11px] text-zinc-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Aperture className="h-3.5 w-3.5" /> Film feel
                    </span>
                    <span className="h-3 w-px bg-zinc-800" />
                    <span className="inline-flex items-center gap-1.5">
                      <Heart className="h-3.5 w-3.5" /> Emotion-first
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.20),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.12),transparent_60%)]" />

          <div className="relative grid gap-10 p-7 sm:p-10 md:grid-cols-[1.1fr,0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100/80">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="tracking-wide">Let us preserve your wedding</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                The way it deserves to be remembered.
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                Share your date, location, and a little about your story.
                We’ll respond with availability and a simple plan — calm, clear, and respectful.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:hello@shamsisaimweddings.com"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-xs font-semibold text-black transition hover:brightness-95"
                >
                  <Mail className="h-4 w-4" />
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/40 px-5 py-3 text-xs font-semibold text-zinc-100 backdrop-blur transition hover:bg-white/5"
                >
                  <Instagram className="h-4 w-4 text-pink-200" />
                  Instagram
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/40 px-5 py-3 text-xs font-semibold text-zinc-100 backdrop-blur transition hover:bg-white/5"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-200" />
                  WhatsApp
                </a>
              </div>

              <div className="mt-8 grid gap-3 text-xs text-zinc-300 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                  <div className="flex items-center gap-2 font-semibold text-zinc-50">
                    <MapPin className="h-4 w-4 text-amber-200" />
                    Location
                  </div>
                  <div className="mt-1 text-zinc-300">Pakistan | Destination Weddings</div>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                  <div className="flex items-center gap-2 font-semibold text-zinc-50">
                    <Camera className="h-4 w-4 text-amber-200" />
                    Turnaround
                  </div>
                  <div className="mt-1 text-zinc-300">Timeless edits — never rushed.</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-3xl border border-zinc-800 bg-black/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-50">Inquiry Form</div>
                  <div className="mt-1 text-xs text-zinc-400">(Demo UI — wire to email/CRM later)</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-amber-300/20 bg-amber-300/10">
                  <SafeImage src={LOGO_URL} alt="Shamsi Saim Weddings" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Form submitted (demo). Connect this to your email service / backend.");
                }}
                className="mt-5 space-y-3"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1">
                    <span className="text-xs text-zinc-300">Name</span>
                    <input
                      className="w-full rounded-2xl border border-zinc-800 bg-black/50 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-amber-300/30"
                      placeholder="Your full name"
                      required
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs text-zinc-300">Email</span>
                    <input
                      type="email"
                      className="w-full rounded-2xl border border-zinc-800 bg-black/50 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-amber-300/30"
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="space-y-1">
                    <span className="text-xs text-zinc-300">Wedding Date</span>
                    <input
                      type="date"
                      className="w-full rounded-2xl border border-zinc-800 bg-black/50 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-amber-300/30"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs text-zinc-300">City / Venue</span>
                    <input
                      className="w-full rounded-2xl border border-zinc-800 bg-black/50 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-amber-300/30"
                      placeholder="Lahore / Islamabad / Destination"
                    />
                  </label>
                </div>

                <label className="space-y-1">
                  <span className="text-xs text-zinc-300">Message</span>
                  <textarea
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-zinc-800 bg-black/50 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-amber-300/30"
                    placeholder="Tell us your story, traditions, and what matters most to you…"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-300 px-4 py-3 text-sm font-semibold text-black transition hover:brightness-95"
                >
                  📩 Book Your Wedding
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[11px] leading-5 text-zinc-400">
                  By submitting, you agree to be contacted about availability and packages.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-zinc-900 pt-8 text-xs text-zinc-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <SafeImage src={LOGO_URL} alt="Shamsi Saim Weddings" className="h-4 w-4 rounded-sm object-cover" loading="lazy" />
            <span>© {new Date().getFullYear()} Shamsi Saim Weddings</span>
           
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-zinc-300" href="#about">About</a>
            <a className="hover:text-zinc-300" href="#services">Services</a>
            <a className="hover:text-zinc-300" href="#contact">Contact</a>
             <span>© {new Date().getFullYear()} Made by</span>
            <a
                href="https://www.treentech.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                TREENTECHCO
              </a>
          </div>
        </div>
      </section>
    </div>
  );
}
