import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import { useTranslation } from 'react-i18next';

export type AboutSectionProps = {
  src?: string;
  name?: string;
  role?: string;
  paragraphs?: string[];
  tags?: { label: string; align?: "left" | "right"; offsetY?: string }[];
};

const DEFAULT_PARAGRAPHS = [
  "Desenvolvedor Full Stack focado em C# .NET e React, construindo interfaces que se sentem como parte do produto — não acopladas a ele.",
  "Meu trabalho conecta arquitetura limpa no back-end a experiências polidas no front-end, priorizando legibilidade, performance e impacto real de negócio.",
  "Aberto a oportunidades Júnior/Trainee onde eu possa contribuir, evoluir tecnicamente e ajudar times a entregar software que importa.",
];

export function AboutSection({
  src = "/perfil.jpeg",
  name = "Murilo de Paula",
  role = "Full Stack Developer · C# .NET + React",
  paragraphs = DEFAULT_PARAGRAPHS,
  tags,
}: AboutSectionProps) {
  const reduce = useReducedMotion();
  const { i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  const activeTags = tags ?? [
    { 
      label: i18n.language === 'pt' ? `● Disponível · ${currentYear}` : `● Available · ${currentYear}`, 
      align: "right" as const, 
      offsetY: "12%" 
    },
    { label: "● C# · .NET · React", align: "left" as const, offsetY: "44%" },
    { 
      label: i18n.language === 'pt' ? "● Júnior / Trainee" : "● Junior / Trainee", 
      align: "right" as const, 
      offsetY: "72%" 
    },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const spring = (v: ReturnType<typeof useTransform<number, number>>) =>
    useSpring(v, { stiffness: 80, damping: 24, mass: 0.6 });

  const photoY = spring(useTransform(scrollYProgress, [0, 1], [120, -120]));
  const photoScale = spring(useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.02, 1.05]));
  const photoOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0.5]);
  const glowY = spring(useTransform(scrollYProgress, [0, 1], [60, -60]));
  const tagsY = spring(useTransform(scrollYProgress, [0, 1], [40, -40]));
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const noMotion = reduce;

  return (
    <section
      ref={sectionRef}
      id="sobre"
      aria-labelledby="about-heading"
      className="relative isolate min-h-screen w-full overflow-hidden bg-void px-6 py-32 md:px-12 lg:px-20"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          y: noMotion ? 0 : gridY,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[15%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-accent-blue/15 blur-[140px]"
        style={{ y: noMotion ? 0 : glowY }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mb-20 flex max-w-7xl items-center gap-4"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/40">
          N° 01
        </span>
        <span className="h-px flex-1 max-w-[60px] bg-white/10" />
        <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/60">
          {i18n.language === 'pt' ? 'Sobre Mim' : 'About me'}
        </span>
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="relative order-2 lg:order-1">
          <div className="pointer-events-none absolute -inset-4 z-10">
            <div className="absolute left-0 top-0 size-6 border-l border-t border-accent-blue/40" />
            <div className="absolute right-0 top-0 size-6 border-r border-t border-accent-blue/40" />
            <div className="absolute bottom-0 left-0 size-6 border-b border-l border-accent-blue/40" />
            <div className="absolute bottom-0 right-0 size-6 border-b border-r border-accent-blue/40" />
          </div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20"
            style={{ y: noMotion ? 0 : tagsY }}
          >
            {activeTags.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, x: t.align === "right" ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`absolute flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-xl ${
                  t.align === "right" ? "right-[-8%]" : "left-[-8%]"
                }`}
                style={{ top: t.offsetY ?? "30%" }}
              >
                <span className="font-mono text-[10px] tracking-tight text-white/85">
                  {t.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="relative aspect-[4/5] w-full"
            style={{
              y: noMotion ? 0 : photoY,
              scale: noMotion ? 1 : photoScale,
              opacity: noMotion ? 1 : photoOpacity,
            }}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-[2rem] bg-accent-blue/20 blur-3xl" />

            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                maskImage:
                  "radial-gradient(ellipse 75% 90% at 50% 40%, black 55%, transparent 95%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 90% at 50% 40%, black 55%, transparent 95%)",
              }}
            >
              <img
                src={src}
                alt={`Retrato de ${name}`}
                width={1200}
                height={1500}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-void/30 to-void" />
              <div className="pointer-events-none absolute inset-0 mix-blend-color bg-accent-blue/20" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-void to-transparent" />
            </div>


            <div className="absolute -bottom-2 left-0 right-0 z-10 flex justify-between px-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              <span>UNIT_01</span>
              <span>DEV.PORT.{currentYear.toString().slice(-2)}</span>
            </div>
          </motion.div>
        </div>

        <div className="relative order-1 lg:order-2">
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {name}
            <span className="mt-3 block font-mono text-sm font-normal uppercase tracking-[0.3em] text-accent-blue">
              {role}
            </span>
          </motion.h2>

          <div className="mt-10 space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
               className="text-[15px] leading-relaxed text-white/65 md:text-base text-justify"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            {["C# / .NET", "React / TS", "SQL", "REST APIs"].map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;