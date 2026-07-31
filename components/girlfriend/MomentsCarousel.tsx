'use client'

import { useState } from 'react'
import { useMedia } from './MediaContext'
import EditableText from './EditableText'

interface MomentsCarouselProps {
  onWhyAdore: () => void
}

export default function MomentsCarousel({ onWhyAdore }: MomentsCarouselProps) {
  const { media } = useMedia()
  const [current, setCurrent] = useState(0)
  const total = 3

  const prev = () => setCurrent(c => (c - 1 + total) % total)
  const next = () => setCurrent(c => (c + 1) % total)

  const photos = media.albumPhotos
  const captions = media.momentCaptions

  return (
    <section
      id="moments"
      className="relative px-4 pt-10 pb-14"
      style={{ background: '#e8e0f5' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(147,112,219,0.15) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="absolute top-6 left-3 pointer-events-none" aria-hidden="true"><PinkRoseSmall /></div>
      <div className="absolute bottom-24 right-5 pointer-events-none" aria-hidden="true"><TulipIcon /></div>

      <div className="relative max-w-md mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="bg-white rounded-full px-5 py-1.5 border border-pink-200 shadow-sm mb-5">
          <span className="text-gf-navy text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
            <HeartFillIcon className="text-gf-pink" size={12} />
            <EditableText textKey="momentsBadge" tag="span" />
          </span>
        </div>

        <EditableText textKey="momentsTitle" tag="h2" className="font-bold text-gf-navy text-3xl text-center text-balance" />
        <p className="text-gf-navy/60 text-sm text-center mt-1 flex items-center gap-1">
          <EditableText textKey="momentsSubtitle" tag="span" />
          &nbsp;&#9825;
        </p>

        {/* Carousel card */}
        <div className="relative w-full mt-8 flex items-center justify-center">
          <button
            onClick={prev}
            className="absolute left-0 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gf-purple hover:bg-purple-50 transition-colors"
            aria-label="Previous photo"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative mx-14 bg-white rounded-2xl shadow-xl overflow-hidden w-full">
            {/* Tape strip */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-20 h-7 rounded z-10 overflow-hidden">
              <div
                className="w-full h-full opacity-70"
                style={{ background: 'repeating-linear-gradient(45deg, #a78bfa 0px, #a78bfa 6px, #c4b5fd 6px, #c4b5fd 12px)' }}
              />
            </div>

            <div className="w-full bg-gf-lavender flex items-center justify-center overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {photos[current] ? (
                <img src={photos[current]!} alt={`Our moment ${current + 1}`} className="w-full h-full object-cover" />
              ) : (
                <EmptyPhotoSlot index={current} />
              )}
            </div>

            <div className="px-6 py-5 text-center">
              <p className="text-gf-purple text-xs font-bold tracking-widest mb-2">
                {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
              {/* Captions are editable via the customize panel */}
              <p className="font-script text-gf-purple text-xl leading-snug text-pretty">
                {captions[current]}
              </p>
            </div>
          </div>

          <button
            onClick={next}
            className="absolute right-0 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gf-purple hover:bg-purple-50 transition-colors"
            aria-label="Next photo"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L11 8L6 13" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-3 mt-6 bg-white/70 rounded-2xl p-2.5 border border-purple-100">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === current ? 'border-gf-purple shadow-md scale-105' : 'border-white opacity-70'}`}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === current}
            >
              {photos[i] ? (
                <img src={photos[i]!} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: ['#fce7f3', '#ede9fe', '#fdf4ff'][i] }}
                >
                  <span className="text-lg" aria-hidden="true">{['✿', '✦', '❀'][i]}</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onWhyAdore}
          className="mt-8 w-full bg-gf-purple text-white font-bold text-sm tracking-widest uppercase py-4 rounded-full shadow-md hover:bg-purple-700 transition-colors"
        >
          <EditableText textKey="momentsCta" tag="span" /> &nbsp;&rarr;
        </button>
      </div>
    </section>
  )
}

function EmptyPhotoSlot({ index }: { index: number }) {
  const msgs = ['add your first photo', 'add a sweet memory', 'add your favourite shot']
  const colors = ['#f9a8d4', '#a78bfa', '#f472b6']
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 w-full">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <rect x="8" y="14" width="40" height="32" rx="5" stroke={colors[index]} strokeWidth="2.5" />
        <circle cx="20" cy="26" r="4.5" fill={colors[index]} opacity="0.5" />
        <path d="M8 38l12-10 8 7 7-6 13 9" stroke={colors[index]} strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.6" />
      </svg>
      <p className="text-sm text-gf-purple/60 font-medium">{msgs[index]}</p>
    </div>
  )
}

function HeartFillIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 14s-6-3.9-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4.1-6 8-6 8z" />
    </svg>
  )
}

function PinkRoseSmall() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="16" fill="#fce7f3" opacity="0.8" />
      <circle cx="22" cy="18" r="11" fill="#f9a8d4" opacity="0.75" />
      <circle cx="17" cy="26" r="9" fill="#f472b6" opacity="0.4" />
      <circle cx="27" cy="26" r="9" fill="#fce7f3" opacity="0.5" />
      <circle cx="22" cy="21" r="7" fill="#fbcfe8" />
      <circle cx="22" cy="22" r="4" fill="#fce7f3" />
    </svg>
  )
}

function TulipIcon() {
  return (
    <svg width="36" height="48" viewBox="0 0 36 48" fill="none">
      <path d="M18 44 L18 24" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 34 Q12 28 12 20 Q12 12 18 10 Q24 12 24 20 Q24 28 18 34Z" fill="#a78bfa" />
    </svg>
  )
}
