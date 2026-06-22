import { motion, useReducedMotion, type Variants } from "framer-motion";

export type PhotoFrameProps = {
  src?: string;
  alt?: string;
  name?: string;
  role?: string;
  unitLabel?: string;
  statusLabel?: string;
  serial?: string;
  className?: string;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function PhotoFrame({
  src = "/perfil.jpeg",
  alt = "Foto de perfil",
  name = "Murilo Filheiro de Paula",
  role = "Full Stack Developer · C# .NET + React",
  unitLabel = "UNIT_01",
  statusLabel = "AUTH_VERIFIED",
  serial = "DEV.PORT.24",
  className = "",
}: PhotoFrameProps) {
  const reduce = useReducedMotion();

  const floatAnim = reduce
    ? undefined
    : { y: [0, -12, 0] };

  const glowAnim = reduce
    ? undefined
    : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] };

  const containerVariants: Variants = {
    rest: {},
    hover: {},
  };

  const tagVariants: Variants = {
    rest: { x: 0 },
    hover: { x: 16 },
  };

  const scanVariants: Variants = {
    rest: { opacity: 0, y: "-100%" },
    hover: {
      opacity: 1,
      y: "100%",
      transition: {
        y: { repeat: Infinity, duration: 3, ease: "linear" },
        opacity: { duration: 0.4 },
      },
    },
  };

  return (
    <div
      className={`relative isolate flex min-h-screen items-center justify-center bg-void p-8 selection:bg-accent-blue/30 ${className}`}
    >
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/10 blur-[120px]"
          animate={glowAnim}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {!reduce && (
          <>
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2"
              style={{ transformOrigin: "0 0" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 translate-x-[140px] rounded-full bg-accent-blue/40 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </motion.div>
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2"
              style={{ transformOrigin: "0 0" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-1 w-1 -translate-x-1/2 -translate-y-1/2 translate-x-[180px] rounded-full bg-white/20" />
            </motion.div>
          </>
        )}
      </div>

      <motion.div
        className="group relative"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        variants={containerVariants}
        whileHover="hover"
        
      >
        <div className="pointer-events-none absolute -inset-8 rounded-full border border-white/5 transition-colors duration-700 group-hover:border-accent-blue/20" />
        <div className="pointer-events-none absolute -inset-16 rounded-full border border-white/[0.02]" />

        <div className="absolute -left-12 -top-12 flex flex-col gap-1 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            {unitLabel}
          </span>
          <span className="font-mono text-[9px] text-accent-blue/60">
            {statusLabel}
          </span>
        </div>

        <div className="absolute -bottom-12 -right-12 flex flex-col items-end gap-1 opacity-40 transition-opacity duration-500 group-hover:opacity-100">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            {serial}
          </span>
          <div className="flex gap-1">
            <div className="size-1 rounded-full bg-accent-blue/60" />
            <div className="size-1 rounded-full bg-white/10" />
            <div className="size-1 rounded-full bg-white/10" />
          </div>
        </div>

        <motion.div
          className="relative"
          animate={floatAnim}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="relative size-64 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-2xl backdrop-blur-xl transition-[border-color,box-shadow] duration-500 group-hover:border-accent-blue/30 group-hover:shadow-accent-blue/20 md:size-80"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                className="h-px w-full bg-accent-blue/50 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                variants={scanVariants}
              />
            </div>

            <div className="relative h-full w-full overflow-hidden rounded-[calc(1rem-2px)] bg-void">
              <img
                src={src}
                alt={alt}
                width={800}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[calc(1rem-2px)] ring-1 ring-inset ring-white/10" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          <motion.div
            variants={tagVariants}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="absolute -right-4 top-1/3 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 backdrop-blur-md"
            aria-label="System status: active"
          >
            <motion.div
              className="size-1.5 rounded-full bg-accent-blue"
              animate={reduce ? undefined : { opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-mono text-[10px] tracking-tight text-white/80">
              SYSTEM_ACTIVE
            </span>
          </motion.div>
        </motion.div>

        <div className="mt-12 text-center">
          <h1 className="mb-2 font-display text-2xl font-bold tracking-tight text-white transition-colors duration-500 group-hover:text-accent-blue md:text-3xl">
            {name}
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
            {role}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default PhotoFrame;