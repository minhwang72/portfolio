'use client';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base background */}
      <div className="absolute inset-0 bg-[#09090B]" />

      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #27272A 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }}
      />

      {/* Aurora blob 1 - Violet */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          top: '10%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)',
          filter: 'blur(100px)',
          animation: 'aurora-float-1 25s ease-in-out infinite',
        }}
      />

      {/* Aurora blob 2 - Cyan */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          top: '50%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)',
          filter: 'blur(120px)',
          animation: 'aurora-float-2 30s ease-in-out infinite',
        }}
      />

      {/* Aurora blob 3 - Pink */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          bottom: '20%',
          left: '40%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%)',
          filter: 'blur(100px)',
          animation: 'aurora-float-3 20s ease-in-out infinite',
        }}
      />
    </div>
  );
}
