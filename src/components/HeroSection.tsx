import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export type HeroSectionProps = {
  src?: string;
  alt?: string;
  name?: string;
  role?: string;
  tagline?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection({
  src = "/perfil.jpeg",
  alt = "Foto de perfil",
  name = "Murilo Filheiro de Paula",
  role = "Full Stack Developer",
  tagline = "C# · .NET · React · TypeScript",
}: HeroSectionProps) {
    const reduce = useReducedMotion();
    const { i18n } = useTranslation();
    const currentYear = new Date().getFullYear(); 

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-void px-6 py-24"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/15 blur-[160px]"
        animate={
          reduce ? undefined : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(8,8,10,0.85) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 flex items-center gap-3"
        >
          <span className="size-1.5 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/60">
            {i18n.language === 'pt' ? 'Portfólio' : 'Portfolio'} · {currentYear}
          </span>
          <span className="size-1.5 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </motion.div>

        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/25 blur-3xl md:size-[420px]"
            animate={reduce ? undefined : { opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {!reduce && (
            <>
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2"
                style={{ transformOrigin: "0 0" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                <div className="size-1.5 -translate-x-1/2 -translate-y-1/2 translate-x-[150px] rounded-full bg-accent-blue/70 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
              </motion.div>
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2"
                style={{ transformOrigin: "0 0" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div className="size-1 -translate-x-1/2 -translate-y-1/2 translate-x-[200px] rounded-full bg-white/30" />
              </motion.div>
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2"
                style={{ transformOrigin: "0 0" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <div className="size-1 -translate-x-1/2 -translate-y-1/2 translate-x-[250px] rounded-full bg-accent-blue/40" />
              </motion.div>
            </>
          )}

          <motion.div
            className="relative size-44 md:size-56"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-full"
              style={{
                maskImage:
                  "radial-gradient(circle at 50% 45%, black 60%, transparent 95%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 45%, black 60%, transparent 95%)",
              }}
            >
              <img
                src={src}
                alt={alt}
                width={512}
                height={512}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void/70" />
              <div className="pointer-events-none absolute inset-0 mix-blend-color bg-accent-blue/15" />
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="mt-5 font-mono text-sm uppercase tracking-[0.45em] text-accent-blue md:text-base"
        >
          {role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="mt-4 max-w-md text-sm text-white/50 md:text-base"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
            Scroll
          </span>
          <motion.div
            className="h-8 w-px bg-gradient-to-b from-accent-blue/80 to-transparent"
            animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;