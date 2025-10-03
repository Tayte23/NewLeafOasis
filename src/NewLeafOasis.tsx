import React, { useEffect, useState, useRef } from "react"; 
import { CheckCircle, HeartHandshake, ShieldCheck, Handshake, Baby, Users, ExternalLink, ChevronRight, MessageCircle, Phone, Mail, Clock, ArrowUp, MapPin } from "lucide-react";
import logoUrl from "../assets/logo/Mum 1.png";

// Slideshow images (ensure these paths match your repo)
import imgChild from "../assets/photos/child centered.jpg";
import imgEvidence from "../assets/photos/Evidence based.jpg";
import imgTherapeutic from "../assets/photos/Therapeutic Support.jpg";
import imgMulti from "../assets/photos/Multi Agency.jpg";
import imgProtecting from "../assets/photos/protecting children.jpg";

// Minimal utility
type Classable = { className?: string };
const cn = (...p: Array<string | undefined>) => p.filter(Boolean).join(" ");

// Primitives
function Button({ children, className, type = "button", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & Classable) {
  return (
    <button
      type={type as any}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition active:scale-[.99]",
        "bg-emerald-600 text-white hover:bg-emerald-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
function Card({ children, className }: React.PropsWithChildren<Classable>) { return <div className={cn("rounded-2xl border bg-white", className)}>{children}</div>; }
function CardHeader({ children, className }: React.PropsWithChildren<Classable>) { return <div className={cn("p-4 border-b rounded-t-2xl", className)}>{children}</div>; }
function CardTitle({ children, className }: React.PropsWithChildren<Classable>) { return <h3 className={cn("font-semibold text-lg", className)}>{children}</h3>; }
function CardContent({ children, className }: React.PropsWithChildren<Classable>) { return <div className={cn("p-4", className)}>{children}</div>; }
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) { const { className, ...rest } = props; return <input className={cn("w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200", className)} {...rest} />; }
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) { const { className, ...rest } = props; return <textarea className={cn("w-full rounded-xl border px-3 py-2 text-sm outline-none resize-y focus:ring-2 focus:ring-emerald-200", className)} {...rest} />; }

// Page
export default function NewLeafOasis(): JSX.Element {
  return (
    <main id="content" className="min-h-screen bg-neutral-50 text-neutral-900 scroll-smooth">
      <a href="#content-start" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 z-[100] bg-white text-neutral-900 rounded px-3 py-2 shadow">Skip to content</a>
      <HeaderNav />
      <Hero />
      <AboutUs />          {/* Why Choose Us merged into this */}
      <ApproachCarousel /> {/* Nav “Why Choose Us” jumps here */}
      <AboutTabs />
      <Values />
      <Services />
      <Process />
      <CTAGetInTouch />
      <ContactDrawer />
      <LiveChatWidget />
      <CookieBanner />
      <BackToTop />
      <Footer />
    </main>
  );
}

// Sections helper
function Section({ id, title, children, compact = false, tightTop = false }: { id?: string; title: string; children: React.ReactNode; compact?: boolean; tightTop?: boolean }) {
  return (
    <section id={id} className={cn(tightTop ? "pt-2 md:pt-4" : "pt-5 md:pt-7", "scroll-mt-32 md:scroll-mt-40", compact ? "pb-4" : "pb-8")} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 id={id ? `${id}-title` : undefined} className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">{title}</h2>
        {children}
      </div>
    </section>
  );
}

// Header (two bars)
function HeaderNav(): JSX.Element {
  const [active, setActive] = useState<string>("");
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const greenRef = useRef<HTMLDivElement | null>(null);
  const [topH, setTopH] = useState(0);
  const [greenH, setGreenH] = useState(0);

  useEffect(() => {
    const measure = () => {
      setTopH(topBarRef.current?.offsetHeight || 0);
      setGreenH(greenRef.current?.offsetHeight || 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    // Track sections for underline state
    const ids = ["about", "values", "services", "slideshow", "process"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive((e.target as HTMLElement).id)),
      { rootMargin: "-30% 0px -60% 0px", threshold: 0.01 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Green primary nav links: larger/bold; active is extra-bold
  const navLink = (id: string) =>
    cn("text-white/90 hover:text-white font-semibold", active === id && "text-white font-extrabold underline decoration-2 underline-offset-4");

  return (
    <header role="banner">
      {/* Top white bar */}
      <div ref={topBarRef} className="fixed top-0 left-0 right-0 z-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Bigger square + full logo fit */}
            <div className="relative h-[72px] w-[72px] md:h-[96px] md:w-[96px] shrink-0">
              <img src={logoUrl} alt="New Leaf Oasis logo" className="absolute inset-0 h-full w-full object-contain" />
            </div>
            <div>
              {/* “New Leaf Oasis” title bigger & bold */}
              <p className="text-lg md:text-xl font-bold leading-tight">New Leaf Oasis</p>
              {/* Tagline up-sized */}
              <p className="text-sm md:text-base text-neutral-500 leading-tight">Where Safety Meets Support</p>
            </div>
          </div>
          {/* Top-right nav links: larger (text-base), bolder (font-semibold), more spacing */}
          <nav className="hidden md:flex items-center gap-7 text-base font-semibold tracking-wide" aria-label="Top navigation">
            <a href="#team" className="hover:underline">Our Team</a>
            <a href="#partners" className="hover:underline">Our Partners</a>
            <a href="#resources" className="hover:underline">Resources and Support</a>
            <a href="#careers" className="hover:underline">Careers</a>
            <a href="#login" className="hover:underline">My NLO Login</a>
          </nav>
        </div>
      </div>

      {/* Green nav bar */}
      <div ref={greenRef} style={{ top: topH }} className={cn("fixed left-0 right-0 z-30 text-white", "bg-gradient-to-b from-emerald-700 to-emerald-800", "shadow-md ring-1 ring-black/10")}>
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <nav className="flex items-center gap-6 text-base font-semibold overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none]" aria-label="Primary navigation">
            <a href="#about" className={navLink("about")} aria-current={active === "about" ? "page" : undefined}>About Us</a>
            <a href="#values" className={navLink("values")} aria-current={active === "values" ? "page" : undefined}>Our Values</a>
            <a href="#services" className={navLink("services")} aria-current={active === "services" ? "page" : undefined}>Our Services</a>
            {/* now points to the slideshow */}
            <a href="#slideshow" className={navLink("slideshow")} aria-current={active === "slideshow" ? "page" : undefined}>Why Choose Us</a>
            <a href="#process" className={navLink("process")} aria-current={active === "process" ? "page" : undefined}>Referral process</a>
          </nav>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-contact"))}
            className="hidden sm:inline-flex items-center rounded-full border-2 border-white px-4 py-1.5 text-sm font-bold text-white hover:bg-white hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Contact Us
          </button>
        </div>
      </div>

      <div id="content-start" style={{ height: topH + greenH }} aria-hidden />
    </header>
  );
}

function Hero() {
  const bg = imgProtecting;
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="absolute inset-0">
        <img src={bg} alt="New Leaf Oasis banner" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-neutral-900/40" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 pt-20 md:pt-40 lg:pt-72 pb-10">
        <h1 id="hero-title" className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">Safe Beginnings, Strong Futures</h1>
        <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed max-w-3xl">Residential placement and assessment for young mothers and children, and women leaving domestic abuse — delivered with safeguarding, compassion, and professionalism.</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a href="#services" className="order-2 md:order-1 w-full sm:w-auto justify-center inline-flex items-center gap-2 rounded-2xl px-4 py-2 md:py-2.5 text-sm md:text-base font-semibold bg-white text-emerald-900 border border-emerald-300 shadow-md shadow-emerald-700/10 hover:bg-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2">Explore Services <ChevronRight className="h-4 w-4" /></a>
          <button aria-label="Make a referral (priority action)" onClick={() => (window.location.href = "/referrals")} className="order-1 md:order-2 w-full sm:w-auto justify-center inline-flex items-center gap-2 rounded-2xl px-4 py-2 md:py-2.5 text-sm md:text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-700/20 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 transition hover:-translate-y-0.5">Make a Referral <ExternalLink className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}

// About + Why Choose (merged & blended)
function AboutUs() {
  return (
    <Section id="about" title="About Us" compact tightTop>
      <div className="max-w-4xl text-neutral-700 space-y-4">
        <p>New Leaf Oasis is a mother and baby social work assessment unit focused on safeguarding children while supporting and empowering mothers. Founded by two qualified social workers with over 30 years of combined experience, we provide a fair, compassionate and structured environment where parenting potential can be demonstrated safely.</p>
        <p>Our ethos blends robust safeguarding with therapeutic support and professional rigour. We work in partnership with local authorities, health professionals and families to secure the best outcomes for children.</p>
        <p>Choosing the right mother and baby assessment unit is a big decision. At New Leaf Oasis we combine experienced, qualified leadership with a child-centred ethos and a calm, structured environment where mothers and babies can live together safely while being supported. Our therapeutic, compassionate approach helps mothers reflect, learn and grow; our assessments are clear, evidence-based and court-ready; and our strong partnerships with local authorities and health professionals ensure holistic, fair outcomes. We are committed to safeguarding and to creating real opportunities for positive change.</p>
      </div>
    </Section>
  );
}

// Slideshow (now the target for “Why Choose Us”)
function ApproachCarousel() {
  const slides = [
    { title: "Child-centred", tag: "Safety first", src: imgChild, alt: "Happy diverse children lying in a circle" },
    { title: "Evidence-based", tag: "Court-ready reports", src: imgEvidence, alt: "Gavel and stethoscope representing evidence and care" },
    { title: "Therapeutic", tag: "Support & growth", src: imgTherapeutic, alt: "Practitioner celebrating progress with mother and child" },
    { title: "Multi-agency", tag: "LA • Health • Courts", src: imgMulti, alt: "Professionals reviewing a plan together" },
    { title: "Protecting Children", tag: "Safeguarding together", src: imgProtecting, alt: "Children and adult hands together symbolising protection" },
  ];

  const [index, setIndex] = React.useState(0);
  const len = slides.length;
  const next = () => setIndex((i) => (i + 1) % len);
  React.useEffect(() => { const id = setInterval(next, 2000); return () => clearInterval(id); }, []);

  return (
    <section id="slideshow" className="pt-2 md:pt-3 pb-8 scroll-mt-36 md:scroll-mt-44" aria-label="New Leaf Oasis approach">
      <div
        className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 max-w-7xl mx-auto px-4"
        role="region"
        aria-roledescription="carousel"
      >
        {/* Bigger & wider frame; photos fill it */}
        <div className="h-[420px] sm:h-[460px] md:h-[520px] lg:h-[560px] bg-white">
          {slides.map((s, i) => (
            <div
              key={s.title}
              className={cn("absolute inset-0 transition-opacity duration-500", i === index ? "opacity-100" : "opacity-0")}
              aria-hidden={i !== index}
            >
              <img
                src={s.src}
                alt={s.alt}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
              <div className="absolute left-4 right-4 bottom-4 md:left-6 md:right-6 text-white">
                <h3 className="text-xl md:text-3xl font-bold drop-shadow-sm">{s.title}</h3>
                <p className="mt-1 text-sm md:text-base text-white/90 drop-shadow-sm">{s.tag}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute left-0 right-0 bottom-2 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn("h-2.5 w-2.5 rounded-full ring-1 ring-white/60", i === index ? "bg-white" : "bg-white/50")}
            />
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">Slide {index + 1} of {len}</p>
    </section>
  );
}

function AboutTabs() {
  const items = [
    { title: "Our Vision", body: (<p>To be a centre of excellence in mother and baby social work assessments—combining robust safeguarding with compassionate care. Every baby safe; every mother given a fair opportunity to demonstrate parenting potential; every decision delivered with professionalism and integrity.</p>) },
    { title: "Our Mission", body: (<p>Provide a safe, structured home where mothers and babies can live together during assessment. We safeguard children, deliver fair evidence-based, child-centred assessments, and support mothers to reflect, learn and grow.</p>) },
    { title: "Our Purpose", body: (<p>We provide safe, structured living during assessment; deliver clear, evidence-based, child-centred assessments; help mothers reflect, learn and build parenting skills; and work in partnership with local authorities and health partners.</p>) },
    { title: "Led by Experience", body: (<p>Our founders bring decades of frontline practice across safeguarding, fostering & adoption, and family assessment. We combine professional rigour with compassion so babies are safe, mothers are supported and families can turn a new leaf.</p>) },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mb-4 md:mb-6">
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it) => (
          <div key={it.title} tabIndex={0} className="rounded-2xl border border-emerald-300/80 bg-white shadow-lg shadow-emerald-700/10 hover:shadow-2xl hover:shadow-emerald-700/20 transition-all duration-300 ease-out transform-gpu hover:-translate-y-1 focus:-translate-y-1 focus:shadow-2xl focus:shadow-emerald-700/20">
            <div className="p-3"><h3 className="font-semibold text-base md:text-lg text-emerald-800">{it.title}</h3></div>
            <div className="h-px bg-emerald-100" />
            <div className="p-4 bg-white text-neutral-700"><div className="prose max-w-none text-[15px] leading-relaxed">{it.body}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Values() {
  const valuesRef = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = valuesRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { requestAnimationFrame(() => setInView(true)); io.disconnect(); } }); }, { rootMargin: "0px 0px -20% 0px", threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Item = ({ icon, title, desc, row, delay }: { icon: React.ReactNode; title: string; desc: string; row: "top" | "bottom"; delay: number }) => (
    <div tabIndex={0} style={inView ? { animationDelay: `${delay}ms`, animationDuration: '800ms', animationFillMode: 'both' } : {}} className={cn("rounded-2xl border border-emerald-300/80 bg-white shadow-lg shadow-emerald-700/10","hover:shadow-2xl hover:shadow-emerald-700/20 hover:-translate-y-1 focus:-translate-y-1 focus:shadow-2xl focus:shadow-emerald-700/20","transition-all transform-gpu will-change-transform will-change-opacity", inView ? (row === "top" ? "animate-slamDown" : "animate-slamUp") : (row === "top" ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0"))}>
      <div className="p-3 flex gap-3 items-center rounded-t-2xl"><div className="rounded-2xl bg-emerald-600/10 p-2 text-emerald-700">{icon}</div><h3 className="font-semibold text-base md:text-lg">{title}</h3></div>
      <div className="h-px bg-emerald-100" />
      <div className="p-4 rounded-b-2xl bg-emerald-700 text-white"><p className="text-[15px] leading-relaxed">{desc}</p></div>
    </div>
  );
  return (
    <Section id="values" title="Our Values" tightTop compact>
      <style>{`@keyframes slamDown{0%{transform:translateY(-24px);opacity:0}60%{transform:translateY(4px);opacity:1}80%{transform:translateY(-2px)}100%{transform:translateY(0)}}@keyframes slamUp{0%{transform:translateY(24px);opacity:0}60%{transform:translateY(-4px);opacity:1}80%{transform:translateY(2px)}100%{transform:translateY(0)}}.animate-slamDown{animation-name:slamDown}.animate-slamUp{animation-name:slamUp}`}</style>
      <div ref={valuesRef} className="grid md:grid-cols-3 gap-5">
        <Item row="top" delay={0} icon={<ShieldCheck className="h-6 w-6" />} title="Safety First" desc="Secure, structured environment and safeguarding" />
        <Item row="top" delay={120} icon={<HeartHandshake className="h-6 w-6" />} title="Compassion" desc="Dignity, empathy and respect for every family" />
        <Item row="top" delay={240} icon={<CheckCircle className="h-6 w-6" />} title="Growth" desc="We build skills, confidence and resilience" />
        <Item row="bottom" delay={0} icon={<Handshake className="h-6 w-6" />} title="Transparency" desc="Open communication with families and professionals" />
        <Item row="bottom" delay={120} icon={<Users className="h-6 w-6" />} title="Collaboration" desc="Working with social care and health partners" />
        <Item row="bottom" delay={240} icon={<Baby className="h-6 w-6" />} title="Child Focus" desc="Decisions made in the child's best interests" />
      </div>
    </Section>
  );
}

function Services() {
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = gridRef.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "0px 0px -20% 0px", threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const ServiceTab = ({ title, bullets, index }: { title: string; bullets: string[]; index: number; }) => (
    <div tabIndex={0} style={inView ? { animationDelay: `${index * 140}ms`, animationDuration: "850ms", animationFillMode: "both" } : undefined} className={cn("rounded-2xl border border-emerald-300/80 bg-white","shadow-lg shadow-emerald-700/10","hover:shadow-2xl hover:shadow-emerald-700/20 hover:-translate-y-1","focus:-translate-y-1 focus:shadow-2xl focus:shadow-emerald-700/20","transition-all transform-gpu will-change-transform will-change-opacity", inView ? (index % 2 === 0 ? "animate-slideInL" : "animate-slideInR") : (index % 2 === 0 ? "-translate-x-8 opacity-0" : "translate-x-8 opacity-0"))}>
      <div className="rounded-t-2xl px-4 py-2 text-white bg-gradient-to-br from-emerald-700 to-emerald-800"><h3 className="font-semibold text-base md:text-lg leading-tight">{title}</h3></div>
      <div className="h-px bg-emerald-100" />
      <div className="p-4">
        <ul className="space-y-2 text-neutral-700">
          {bullets.map((b) => (<li key={b} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-700 mt-0.5" /><span>{b}</span></li>))}
        </ul>
      </div>
    </div>
  );
  const keyframes = `@keyframes slideInL{0%{transform:translateX(-40px);opacity:0}60%{transform:translateX(6px);opacity:1}80%{transform:translateX(-2px)}100%{transform:translateX(0)}}@keyframes slideInR{0%{transform:translateX(40px);opacity:0}60%{transform:translateX(-6px);opacity:1}80%{transform:translateX(2px)}100%{transform:translateX(0)}}.animate-slideInL{animation-name:slideInL}.animate-slideInR{animation-name:slideInR}`;
  const items = [
    { title: "Safe, Supportive Living", bullets: ["Secure, nurturing accommodation","Calm routines and positive interactions"] },
    { title: "Settling-In Period (3 Weeks)", bullets: ["Gentle adjustment before assessment","Relationship building and stabilising routines"] },
    { title: "Parenting Capacity Assessments", bullets: ["Practical care skills and bonding","Safeguarding awareness and insight"] },
    { title: "Risk & Safeguarding", bullets: ["Identify risks and protective factors","Environmental safety and stability"] },
    { title: "Therapeutic Guidance", bullets: ["Role modelling and reflective practice","Confidence, resilience and healthy routines"] },
    { title: "Court-Ready Reports", bullets: ["Clear, evidence-based reporting","Supports planning and decisions"] },
  ];
  return (
    <Section id="services" title="What We Provide" tightTop compact>
      <style>{keyframes}</style>
      <div ref={gridRef} className="grid lg:grid-cols-2 gap-4">
        {items.map((it, i) => (<ServiceTab key={it.title} title={it.title} bullets={it.bullets} index={i} />))}
      </div>
    </Section>
  );
}

function Process() {
  const gridRef = React.useRef<HTMLOListElement | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = gridRef.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "0px 0px -15% 0px", threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const steps = [
    { n: 1, t: "Initial enquiry", d: "Call or email with basic, non confidential details. We will confirm availability." },
    { n: 2, t: "Secure information", d: "We arrange a secure transfer for case information and risk overview." },
    { n: 3, t: "Placement plan", d: "Agree objectives, safeguarding plan and settling in period." },
    { n: 4, t: "Assessment", d: "Parenting capacity, therapeutic support and multi agency work." },
    { n: 5, t: "Court ready report", d: "Clear, evidence based outcomes for planning and decision making." },
  ];
  type CardProps = { n: number; t: string; d: string; index: number; inView: boolean };
  const StepCard = ({ n, t, d, index, inView }: CardProps) => {
    const ref = React.useRef<HTMLLIElement | null>(null);
    const [hovered, setHovered] = React.useState(false);
    const [tf, setTf] = React.useState<string | undefined>();
    const MAX = 7;
    const onMove: React.MouseEventHandler = (e) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left; const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -MAX;
      const ry = ((x / r.width) - 0.5) * MAX;
      setHovered(true); setTf(`perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`);
    };
    const onLeave = () => { setHovered(false); setTf(undefined); };
    return (
      <li
        ref={ref}
        tabIndex={0}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onBlur={onLeave}
        style={hovered ? { transform: tf } : (inView ? { animationDelay: `${index * 120}ms`, animationDuration: "720ms", animationFillMode: "both" } : undefined)}
        className={cn("rounded-2xl border border-emerald-900/5 bg-white/95 backdrop-blur-[1px]","bg-gradient-to-b from-white to-neutral-50","ring-1 ring-black/5 shadow-[0_12px_24px_-12px_rgba(0,0,0,.25)]","p-3 transition-transform duration-300 ease-out will-change-transform will-change-opacity","hover:shadow-[0_18px_34px_-14px_rgba(0,0,0,.32)] hover:-translate-y-0.5 focus:-translate-y-0.5", inView ? "animate-rise" : "opacity-0 translate-y-4 scale-[.985]")}
      >
        <p className="text-xs font-semibold text-emerald-700">Step {n}</p>
        <p className="font-semibold">{t}</p>
        <p className="mt-1 text-neutral-700">{d}</p>
      </li>
    );
  };
  return (
    <Section id="process" title="How Referrals Work" tightTop compact>
      <style>{`@keyframes rise{0%{transform:translateY(16px) scale(.985);opacity:0}60%{transform:translateY(-4px) scale(1.005);opacity:1}100%{transform:translateY(0) scale(1)}}.animate-rise{animation-name:rise}`}</style>
      <ol ref={gridRef} className="grid md:grid-cols-5 gap-2.5 text-sm text-neutral-800">
        {steps.map((s, i) => (<StepCard key={s.n} n={s.n} t={s.t} d={s.d} index={i} inView={inView} />))}
      </ol>
    </Section>
  );
}

function CTAGetInTouch() {
  return (
    <section className="relative py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 ring-1 ring-black/10 shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-center md:text-left">Give Your Loved Ones Quality Care You Can Trust</h2>
          <Button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-contact"))} className="rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 font-semibold">Get in Touch</Button>
        </div>
      </div>
    </section>
  );
}

function BackToTop() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-[75] rounded-full p-3 shadow-lg ring-1 ring-black/10 bg-white text-emerald-700 hover:bg-emerald-50 transition",
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

function Footer() {
  return (
    <footer className="bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <nav aria-label="Quick links" className="order-1">
          <p className="font-semibold tracking-wide">Quick Links</p>
          <ul className="mt-3 space-y-2 text-emerald-100">
            <li><a href="#content-start" className="hover:underline">Home</a></li>
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#services" className="hover:underline">Our Services</a></li>
            <li><a href="#slideshow" className="hover:underline">Why Choose Us</a></li>
            <li><a href="#process" className="hover:underline">How Referrals Work</a></li>
            <li><a href="/referrals" className="hover:underline">Make a Referral</a></li>
            <li><a href="mailto:info@newleafoasis.co.uk" className="hover:underline">Contact Us</a></li>
          </ul>
        </nav>

        <div className="order-3 md:order-2">
          <p className="font-semibold tracking-wide">Services</p>
          <ul className="mt-3 space-y-2 text-emerald-100">
            <li>Safe, Supportive Living</li>
            <li>Settling-in Period</li>
            <li>Parenting Capacity Assessments</li>
            <li>Risk & Safeguarding</li>
            <li>Therapeutic Guidance</li>
            <li>Court-ready Reports</li>
          </ul>
        </div>

        <div className="order-2 md:order-3">
          <p className="font-semibold tracking-wide">Business Hours</p>
          <ul className="mt-3 space-y-2 text-emerald-100">
            <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> 9am – 5pm, Monday–Friday</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> Out of hours: emergencies only</li>
          </ul>
        </div>

        <div className="order-4">
          <p className="font-semibold tracking-wide">Get in Touch</p>
          <ul className="mt-3 space-y-2 text-emerald-100">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1" /> <span>New Leaf Oasis<br/>Bedfordshire (full address available to commissioners)</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a className="underline decoration-emerald-200/70 hover:decoration-2" href="tel:+441234567890">+44 (0)1234 567 890</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a className="underline decoration-emerald-200/70 hover:decoration-2" href="mailto:info@newleafoasis.co.uk">info@newleafoasis.co.uk</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="text-center text-xs text-emerald-100 py-4">© {new Date().getFullYear()} New Leaf Oasis. All rights reserved.</div>
      </div>
    </footer>
  );
}
