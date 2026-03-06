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
          backgroundImage: 'radial-gradient(circle, #1E1E22 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }}
      />

      {/* Aurora blob 1 - Warm champagne */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{
          top: '10%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(196,168,130,0.3), transparent 70%)',
          filter: 'blur(120px)',
          animation: 'aurora-float-1 30s ease-in-out infinite',
        }}
      />

      {/* Aurora blob 2 - Cool slate */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          top: '50%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(148,163,184,0.25), transparent 70%)',
          filter: 'blur(140px)',
          animation: 'aurora-float-2 35s ease-in-out infinite',
        }}
      />
    </div>
  );
}
