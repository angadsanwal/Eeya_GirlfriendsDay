'use client'

import { useMedia } from './MediaContext'
import EditableText from './EditableText'

interface LetterSectionProps {
  onReadAgain: () => void
}

export default function LetterSection({ onReadAgain }: LetterSectionProps) {
  const { media } = useMedia()

  return (
    <section
      id="letter"
      className="relative px-4 pt-10 pb-16"
      style={{ background: 'linear-gradient(180deg, #f5f0ff 0%, #ede9fe 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(147,112,219,0.18) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative max-w-md mx-auto">
        {/* Letter card */}
        <div className="bg-white/95 rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
          {/* Card header */}
          <div className="bg-gf-lavender px-8 pt-8 pb-5 text-center">
            <p className="text-gf-purple text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
              <HeartOutlineIcon size={12} />
              <EditableText textKey="letterBadge" tag="span" />
              <HeartOutlineIcon size={12} />
            </p>
            <EditableText
              textKey="letterGreeting"
              tag="h2"
              className="font-script text-gf-purple text-4xl mt-2 block"
            />

            {/* Dashed divider */}
            <div className="flex items-center gap-2 mt-4">
              <SparkleIcon />
              <div className="flex-1 border-t-2 border-dashed border-gf-purple/30" />
              <SparkleIcon />
            </div>
          </div>

          {/* Letter body */}
          <div className="px-8 pt-6 pb-4">
            <EditableText
              textKey="letterBody1"
              tag="p"
              className="text-gf-navy text-base leading-relaxed"
            />

            {/* Sticker row */}
            <div className="grid grid-cols-3 gap-3 my-6">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-sm"
                  style={{ background: ['#fce7f3', '#f5f0ff', '#ede9fe'][i] }}
                >
                  {media.stickerImages[i] ? (
                    <img src={media.stickerImages[i]!} alt={`Sticker ${i + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <DefaultSticker index={i} />
                  )}
                </div>
              ))}
            </div>

            <EditableText
              textKey="letterBody2"
              tag="p"
              className="text-gf-navy text-base leading-relaxed"
            />

            <EditableText
              textKey="letterBody3"
              tag="p"
              className="text-gf-navy text-base leading-relaxed mt-5"
            />

            {/* Video section */}
            {media.videoUrl && (
              <div className="mt-5 rounded-2xl overflow-hidden border border-purple-100">
                <video
                  src={media.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full"
                  aria-label="Our video"
                />
              </div>
            )}

            {/* Heart divider */}
            <div className="flex items-center gap-3 mt-6">
              <HeartFillIcon className="text-gf-pink flex-shrink-0" size={18} />
              <div className="flex-1 border-t-2 border-dashed border-gf-pink/40" />
            </div>

            {/* Signature */}
            <div className="mt-5 pb-2">
              <EditableText
                textKey="letterSignature"
                tag="p"
                className="font-script text-gf-purple text-2xl"
              />
              <p className="text-gf-purple font-bold text-sm tracking-widest uppercase mt-2">
                &mdash;&nbsp; <EditableText textKey="letterFrom" tag="span" />
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-5 mt-8">
          <EditableText
            textKey="letterFooter"
            tag="p"
            className="text-gf-purple text-xs font-bold tracking-widest uppercase"
          />

          <button
            onClick={onReadAgain}
            className="flex items-center gap-2 border-2 border-gf-purple/30 text-gf-purple font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-full hover:bg-gf-purple/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7a5 5 0 1 1 1 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M2 10V7H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            READ IT AGAIN
          </button>
        </div>
      </div>
    </section>
  )
}

function HeartOutlineIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 13.5S2 9.5 2 5.5a3.5 3.5 0 0 1 6-2.4 3.5 3.5 0 0 1 6 2.4c0 4-6 8-6 8z" stroke="#7c3aed" strokeWidth="1.5" />
    </svg>
  )
}

function HeartFillIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 14s-6-3.9-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4.1-6 8-6 8z" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="#a78bfa" aria-hidden="true">
      <path d="M7 1l1 4h4l-3 2.5 1 4L7 9l-3 2.5 1-4L2 5h4z" />
    </svg>
  )
}

function DefaultSticker({ index }: { index: number }) {
  const stickers = [
    <svg key={0} viewBox="0 0 60 60" fill="none" className="w-full h-full p-2">
      <ellipse cx="30" cy="42" rx="18" ry="8" fill="#d97706" opacity="0.3" />
      <path d="M14 38 Q14 28 22 24 L38 24 Q46 28 46 38 Z" fill="#92400e" opacity="0.4" stroke="#92400e" strokeWidth="1" />
      <path d="M18 38 Q30 45 42 38" stroke="#92400e" strokeWidth="1.5" fill="none" />
      <path d="M14 38 L46 38" stroke="#78350f" strokeWidth="1.5" />
      <path d="M22 24 Q30 16 38 24" stroke="#92400e" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="20" r="5" fill="#f472b6" />
      <circle cx="30" cy="15" r="6" fill="#fb7185" />
      <circle cx="36" cy="20" r="5" fill="#f9a8d4" />
      <circle cx="28" cy="19" r="4" fill="#fce7f3" />
    </svg>,
    <svg key={1} viewBox="0 0 60 60" fill="none" className="w-full h-full p-2">
      <rect x="10" y="14" width="40" height="32" rx="4" fill="white" stroke="#e9d5ff" strokeWidth="1.5" />
      <path d="M30 28s-8-5-8-9a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 4-8 9-8 9z" fill="#f472b6" />
      <path d="M16 38 L44 38" stroke="#e9d5ff" strokeWidth="1" strokeDasharray="2,2" />
      <path d="M16 33 L36 33" stroke="#e9d5ff" strokeWidth="1" strokeDasharray="2,2" />
    </svg>,
    <svg key={2} viewBox="0 0 60 60" fill="none" className="w-full h-full p-2">
      <rect x="6" y="6" width="48" height="48" rx="10" fill="#bbf7d0" />
      <circle cx="18" cy="18" r="8" fill="#4ade80" />
      <circle cx="42" cy="18" r="8" fill="#4ade80" />
      <rect x="8" y="16" width="44" height="30" rx="8" fill="#86efac" />
      <circle cx="20" cy="28" r="5" fill="#1e1b4b" />
      <circle cx="40" cy="28" r="5" fill="#1e1b4b" />
      <circle cx="22" cy="26" r="2" fill="white" />
      <circle cx="42" cy="26" r="2" fill="white" />
      <path d="M22 38 Q30 44 38 38" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>,
  ]
  return stickers[index]
}
