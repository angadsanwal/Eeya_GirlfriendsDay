'use client'

import { useState } from 'react'
import { useMedia } from './MediaContext'
import EditableText from './EditableText'

interface IntroScreenProps {
  onBegin: () => void
}

type Phase = 'idle' | 'opening' | 'letter-rise' | 'exit'

export default function IntroScreen({ onBegin }: IntroScreenProps) {
  const { media } = useMedia()
  const [phase, setPhase] = useState<Phase>('idle')

  const handleClick = () => {
    if (phase !== 'idle') return
    // Phase 1: envelope flap opens
    setPhase('opening')
    // Phase 2: letter rises out
    setTimeout(() => setPhase('letter-rise'), 600)
    // Phase 3: whole screen scales/fades out, onBegin fires
    setTimeout(() => setPhase('exit'), 1400)
    setTimeout(onBegin, 1900)
  }

  const isOpening = phase === 'opening' || phase === 'letter-rise' || phase === 'exit'
  const letterRisen = phase === 'letter-rise' || phase === 'exit'
  const exiting = phase === 'exit'

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-50 cursor-pointer select-none overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(160deg, #f0e8ff 0%, #e8e0f5 40%, #ddd4f0 100%)',
        transition: exiting ? 'opacity 0.5s ease, transform 0.5s ease' : 'none',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.06)' : 'scale(1)',
      }}
      role="button"
      aria-label="Tap to begin"
    >
      {/* Dot background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(147,112,219,0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative stars */}
      <div className="absolute top-16 left-12 text-gf-purple-light opacity-60" aria-hidden="true">
        <StarIcon size={18} />
      </div>
      <div className="absolute top-24 right-16 text-amber-300 opacity-80" aria-hidden="true">
        <StarIcon size={22} />
      </div>
      <div className="absolute bottom-32 left-8 text-gf-purple-light opacity-40" aria-hidden="true">
        <StarIcon size={14} />
      </div>

      {/* ── Envelope + letter stack ── */}
      <div className="relative flex flex-col items-center w-full px-5" style={{ maxWidth: '280px' }}>

        {/* Letter card — rises out of envelope */}
        <div
          className="absolute left-1/2 bg-white rounded-xl shadow-lg border border-purple-100 px-5 py-4 text-center z-20"
          style={{
            width: '210px',
            transform: `translateX(-50%) translateY(${letterRisen ? '-160px' : '-20px'})`,
            transition: letterRisen
              ? 'transform 0.7s cubic-bezier(0.22,1,0.36,1)'
              : 'none',
            top: '20px',
            opacity: isOpening ? 1 : 1,
          }}
        >
          <div className="flex justify-between mb-1">
            <HeartIcon className="text-gf-purple opacity-60" size={12} />
            <HeartIcon className="text-gf-purple opacity-60" size={12} />
          </div>
          <EditableText
            textKey="introCardTitle"
            tag="p"
            className="font-bold text-gf-navy text-sm leading-tight"
          />
          <EditableText
            textKey="introCardSubtitle"
            tag="p"
            className="font-script text-gf-purple text-sm mt-1"
          />
          <EditableText
            textKey="introCardSigned"
            tag="p"
            className="font-script text-gray-400 text-xs mt-1"
          />
        </div>

        {/* Tag above envelope */}
        <div
          className="relative z-30 bg-white rounded-xl px-5 py-2.5 shadow-sm border border-purple-100 mb-1"
          style={{ marginTop: letterRisen ? '0' : '0' }}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-gf-navy tracking-widest uppercase">
            <HeartIcon className="text-gf-pink" size={14} />
            <EditableText textKey="introTag" tag="span" />
          </div>
        </div>

        {/* Envelope body */}
        <div className="relative" style={{ width: '280px', height: '180px' }}>

          {/* Top flap — rotates open */}
          <div
            className="absolute top-0 left-0 right-0 z-10"
            style={{
              height: '90px',
              transformOrigin: 'top center',
              transform: isOpening
                ? 'perspective(600px) rotateX(160deg)'
                : 'perspective(600px) rotateX(0deg)',
              transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
            }}
            aria-hidden="true"
          >
            <div
              className="w-full h-full"
              style={{
                clipPath: 'polygon(0 0, 50% 70%, 100% 0)',
                background: 'linear-gradient(to bottom, #e8d5fb, #d8b4fe)',
              }}
            />
          </div>

          {/* Envelope body */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-b-2xl overflow-hidden"
            style={{ height: '150px', background: '#fecaca' }}
            aria-hidden="true"
          >
            {/* Side flaps */}
            <div
              className="absolute top-0 left-0 bottom-0"
              style={{
                width: '50%',
                background: '#fecaca',
                clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)',
              }}
            />
            <div
              className="absolute top-0 right-0 bottom-0"
              style={{
                width: '50%',
                background: '#fecaca',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 40% 100%)',
              }}
            />
            {/* Bottom triangle flap */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '55%',
                background: 'linear-gradient(to bottom, #fecaca, #fca5a5)',
                clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)',
              }}
            />
            {/* Heart seal */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11 h-11 bg-gf-pink rounded-full flex items-center justify-center shadow-md z-10">
              <span className="text-white font-bold text-base">E</span>
            </div>
          </div>
        </div>
      </div>

      {/* Small character illustration */}
      <div
        className="absolute bottom-28 right-8 w-16 h-16 bg-white rounded-2xl shadow-md border border-purple-100 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <CharacterIllustration />
      </div>

      {/* Tap to begin */}
      <EditableText
        textKey="introTap"
        tag="p"
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-gf-purple text-xs tracking-[0.25em] uppercase font-semibold whitespace-nowrap"
        style={{
          animation: phase === 'idle' ? 'pulse 2s ease-in-out infinite' : 'none',
          opacity: isOpening ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

function HeartIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 14s-6-3.9-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4.1-6 8-6 8z" />
    </svg>
  )
}

function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0l1.5 5H15l-4.5 3.3 1.7 5.2L8 10.5l-4.2 3 1.7-5.2L1 5h5.5z" />
    </svg>
  )
}

function CharacterIllustration() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <ellipse cx="30" cy="38" rx="14" ry="12" fill="#f5f0ff" stroke="#d8b4fe" strokeWidth="1.5" />
      <circle cx="30" cy="24" r="13" fill="#f5f0ff" stroke="#d8b4fe" strokeWidth="1.5" />
      <circle cx="17" cy="24" r="5" fill="#d8b4fe" />
      <circle cx="43" cy="24" r="5" fill="#d8b4fe" />
      <circle cx="17" cy="24" r="3" fill="#ede9fe" />
      <circle cx="43" cy="24" r="3" fill="#ede9fe" />
      <circle cx="25" cy="25" r="2.5" fill="#1e1b4b" />
      <circle cx="35" cy="25" r="2.5" fill="#1e1b4b" />
      <circle cx="26" cy="24" r="1" fill="white" />
      <circle cx="36" cy="24" r="1" fill="white" />
      <ellipse cx="22" cy="29" rx="3" ry="2" fill="#fecdd3" opacity="0.7" />
      <ellipse cx="38" cy="29" rx="3" ry="2" fill="#fecdd3" opacity="0.7" />
      <path d="M27 31 Q30 34 33 31" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M42 10 Q43 8 45 9 Q47 8 48 10 Q48 12 45 14 Q42 12 42 10Z" fill="#f472b6" />
    </svg>
  )
}
