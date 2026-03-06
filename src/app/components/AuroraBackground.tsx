'use client';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-white" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #E2E8F0 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.5,
        }}
      />

      {/* Subtle teal gradient accent */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          top: '-20%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.04), transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
}
