import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Nfc, QrCode, User, PawPrint, Droplets, Feather,
  Shield, Smartphone, Layers, Palette, Lock, CheckCircle2,
  Star, Mail, Instagram, Facebook, Twitter, ChevronDown, ArrowRight,
} from "lucide-react";

import tagColors from "../assets/tag-colors.jpg.asset.json";
import collar from "../assets/collar.jpg.asset.json";
import features from "../assets/features.jpg.asset.json";
// logo asset available at src/assets/logo.jpg.asset.json (unused – wordmark rendered as text)

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:image", content: features.url },
      { name: "twitter:image", content: features.url },
    ],
  }),
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const COLORS = [
  { name: "Black",  hex: "#111111" },
  { name: "Pink",   hex: "#F48FB1" },
  { name: "Blue",   hex: "#4FC3F7" },
  { name: "Green",  hex: "#4CAF50" },
  { name: "Orange", hex: "#FF8A00" },
];

function Index() {
  useReveal();
  const [activeColor, setActiveColor] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Colors active={activeColor} setActive={setActiveColor} />
      <Features />
      <HowItWorks />
      <Benefits />
      <Gallery />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/60" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-extrabold text-primary text-xl tracking-tight">
          <PawPrint className="h-6 w-6 text-accent" />
          Petty
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how" className="hover:text-primary transition-colors">How it works</a>
          <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </nav>
        <a href="#order" className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-sm">
          Order <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            <PawPrint className="h-3.5 w-3.5" /> Smart Pet Tag
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-[1.02] text-primary">
            Never Lose <br /> Your Best Friend.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed">
            The smart NFC & QR pet tag that helps lost pets find their way home — instantly, safely, and beautifully designed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#order" className="group inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-3.5 font-semibold shadow-lg shadow-accent/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30 transition-all">
              Order Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#features" className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur px-7 py-3.5 font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              Learn More
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-foreground/60">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> No batteries</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> iOS & Android</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Waterproof</div>
          </div>
        </div>
        <div className="relative animate-reveal">
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl" />
          <div className="relative rounded-[3rem] overflow-hidden border border-border shadow-2xl animate-float">
            <img src={features.url} alt="Petty smart pet tag" className="w-full h-auto" loading="eager" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COLORS ---------------- */
function Colors({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-14 items-center">
        <div className="reveal order-2 md:order-1 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
          <img src={tagColors.url} alt="Petty tags in five colors" className="w-full h-auto" />
        </div>
        <div className="reveal order-1 md:order-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Choose your color</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            One tag. Five personalities.
          </h2>
          <p className="mt-4 text-primary-foreground/70 text-lg max-w-lg">
            Match Petty to your pet's vibe. Every tag is built with the same premium 3D-printed shell and NFC + QR chip inside.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {COLORS.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActive(i)}
                className={`group flex flex-col items-center gap-2 transition-all ${active === i ? "scale-110" : "opacity-70 hover:opacity-100"}`}
              >
                <span
                  className={`h-14 w-14 rounded-full border-4 transition-all ${active === i ? "border-accent shadow-lg" : "border-white/30"}`}
                  style={{ background: c.hex }}
                />
                <span className="text-xs font-medium">{c.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur px-5 py-2.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Selected: <strong>{COLORS[active].name}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURES ---------------- */
const FEATURES = [
  { icon: Nfc, title: "NFC Tap", desc: "Tap the tag with any NFC-enabled phone to instantly view pet info." },
  { icon: QrCode, title: "QR Code", desc: "Anyone with a camera can scan the QR for instant access." },
  { icon: User, title: "Owner Contact", desc: "Quick access to your phone, WhatsApp and email." },
  { icon: PawPrint, title: "Pet Profile", desc: "Name, breed, allergies, medical notes — all in one place." },
  { icon: Droplets, title: "Waterproof", desc: "Water and dust resistant. Built for every adventure." },
  { icon: Feather, title: "Lightweight", desc: "Feather-light and comfortable for pets of any size." },
];

function Features() {
  return (
    <section id="features" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl reveal">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Features</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-primary leading-tight">
            Small tag. Big peace of mind.
          </h2>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="reveal group rounded-3xl bg-card p-8 border border-border hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-primary">{f.title}</h3>
              <p className="mt-2 text-foreground/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
const STEPS = [
  { n: "01", title: "Attach the tag", desc: "Clip Petty securely onto your pet's collar in seconds." },
  { n: "02", title: "Create their profile", desc: "Add name, photo, medical notes and your contact info." },
  { n: "03", title: "Anyone scans or taps", desc: "A stranger who finds your pet uses any modern phone." },
  { n: "04", title: "They see your details", desc: "You get contacted instantly. Reunited in minutes." },
];

function HowItWorks() {
  return (
    <section id="how" className="py-28 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">How it works</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-primary">Four steps to bring them home</h2>
        </div>
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.n} className="reveal relative rounded-3xl bg-background border border-border p-8 hover:shadow-lg transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-6xl font-black text-accent/20">{s.n}</div>
              <h3 className="mt-4 text-lg font-bold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BENEFITS ---------------- */
const BENEFITS = [
  { icon: Droplets, label: "Waterproof" },
  { icon: Shield, label: "Durable" },
  { icon: Smartphone, label: "iOS & Android" },
  { icon: Layers, label: "3D Printed" },
  { icon: Palette, label: "Multiple Colors" },
  { icon: Lock, label: "Secure Attachment" },
];

function Benefits() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-14 items-center">
        <div className="reveal">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Why Petty</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-primary leading-tight">
            Built to last. Designed to belong.
          </h2>
          <p className="mt-5 text-foreground/70 text-lg leading-relaxed max-w-lg">
            Every Petty tag is 3D printed with premium materials and tested for real-world adventures — from muddy trails to sudden downpours.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-accent/40 hover:bg-accent/5 transition-all">
                <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground grid place-items-center">
                  <b.icon className="h-5 w-5" />
                </div>
                <span className="font-semibold text-primary">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal relative">
          <div className="absolute inset-0 rounded-[3rem] bg-accent/20 blur-3xl" />
          <div className="relative rounded-[2.5rem] overflow-hidden border border-border shadow-2xl">
            <img src={collar.url} alt="Petty tag on a collar" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery() {
  const items = [
    { src: features.url, label: "Never Lose Your Best Friend", tall: true },
    { src: collar.url, label: "Made for real adventures" },
    { src: tagColors.url, label: "Five colors, one promise" },
  ];
  return (
    <section id="gallery" className="py-28 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl reveal">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Gallery</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-primary">See Petty in the wild</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className={`reveal group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-2xl transition-all ${it.tall ? "md:row-span-2" : ""}`}>
              <img src={it.src} alt={it.label} className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-primary-foreground font-semibold">{it.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const REVIEWS = [
  { name: "Sarah & Milo", role: "Golden Retriever mom", text: "Milo slipped out of the yard last month. A neighbor tapped his Petty tag and called me in 5 minutes. Life saver.", img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop" },
  { name: "James & Luna", role: "Rescue cat parent", text: "Beautifully designed, super light, and Luna doesn't even notice it. The QR profile is genius.", img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200&h=200&fit=crop" },
  { name: "Aya & Cooper", role: "Border Collie", text: "We hike every weekend — the tag survived rivers, mud and snow. Best purchase for peace of mind.", img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop" },
];

function Testimonials() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto reveal">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Loved by pet parents</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-primary">Stories from the pack</h2>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={r.name} className="reveal rounded-3xl bg-card border border-border p-8 hover:-translate-y-1 hover:shadow-xl transition-all" style={{ transitionDelay: `${i*80}ms` }}>
              <div className="flex text-accent gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-5 text-foreground/80 leading-relaxed">"{r.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={r.img} alt={r.name} className="h-12 w-12 rounded-full object-cover border-2 border-accent/40" />
                <div>
                  <p className="font-bold text-primary">{r.name}</p>
                  <p className="text-xs text-foreground/60">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: "Does it require batteries?", a: "No. Petty uses passive NFC and printed QR — no batteries, no charging, ever." },
  { q: "Does it work on iPhone?", a: "Yes. Every iPhone from XS onward reads NFC automatically. Any phone with a camera can scan the QR." },
  { q: "Is it waterproof?", a: "Fully waterproof and dust-resistant. Rated for swimming, rain, and rough outdoor use." },
  { q: "Can I update my information?", a: "Absolutely. Log into your Petty profile anytime to update contact info, photos and medical notes." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28 bg-secondary/50">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center reveal">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">FAQ</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-primary">Questions, answered.</h2>
        </div>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="reveal rounded-2xl border border-border bg-background overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-semibold text-primary">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-foreground/70 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section id="order" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal relative overflow-hidden rounded-[3rem] bg-primary text-primary-foreground p-12 md:p-20 text-center">
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <PawPrint className="h-12 w-12 text-accent mx-auto" />
            <h2 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
              Bring them home. <br /> Every time.
            </h2>
            <p className="mt-5 text-primary-foreground/70 text-lg max-w-xl mx-auto">
              Join thousands of pet parents who trust Petty with the ones they love most.
            </p>
            <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-8 py-4 font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
              Order Your Petty Tag <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-2xl font-extrabold text-primary">
            <PawPrint className="h-7 w-7 text-accent" />
            Petty
          </div>
          <p className="mt-4 text-foreground/70 max-w-sm">
            Small tag. Big peace of mind. Designed for pet parents who never want to say goodbye.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 grid place-items-center rounded-full border border-border text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-primary uppercase tracking-wider">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            <li><a href="#features" className="hover:text-primary">Features</a></li>
            <li><a href="#how" className="hover:text-primary">How it works</a></li>
            <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-primary uppercase tracking-wider">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@petty.pet</li>
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-10 pt-6 border-t border-border text-xs text-foreground/50 flex flex-wrap justify-between gap-2">
        <span>© {new Date().getFullYear()} Petty. All rights reserved.</span>
        <span>Made with ♥ for pets everywhere.</span>
      </div>
    </footer>
  );
}
