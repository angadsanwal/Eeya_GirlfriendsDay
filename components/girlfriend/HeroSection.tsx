'use client'

import SongPlayer from './SongPlayer'
import { useMedia } from './MediaContext'
import EditableText from './EditableText'

interface HeroSectionProps {
  onSeeAlbum: () => void
}

const DEFAULT_THUMBNAILS = [
  { bg: '#fce7f3' },
  { bg: '#ede9fe' },
  { bg: '#fdf4ff' },
]

export default function HeroSection({ onSeeAlbum }: HeroSectionProps) {
  const { media } = useMedia()

  return (
    <section
      id="hero"
      className="relative px-4 pt-6 pb-10"
      style={{ background: 'linear-gradient(180deg, #f5f0ff 0%, #e8e0f5 100%)' }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(147,112,219,0.18) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Decorative flowers */}
      <div className="absolute top-4 left-2 pointer-events-none" aria-hidden="true">
        <PinkPeonyFlower />
      </div>
      <div className="absolute top-4 right-2 pointer-events-none" aria-hidden="true">
        <WhiteDaisyFlower />
      </div>

      <div className="relative max-w-md mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="bg-white rounded-full px-5 py-1.5 border border-purple-100 shadow-sm mb-5">
          <span className="text-gf-purple text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
            <HeartIcon className="text-gf-pink" size={12} />
            <EditableText textKey="heroBadge" tag="span" />
          </span>
        </div>

        {/* Avatar */}
        <div className="relative mb-5">
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #e9d5ff, #fbcfe8)' }}
          >
            {media.avatarUrl ? (
              <img src={media.avatarUrl} alt="Eeya" className="w-full h-full object-cover" />
            ) : (
              <DefaultAvatar />
            )}
          </div>
          <div
            className="absolute -inset-1.5 rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #c4b5fd, #fbcfe8)', zIndex: -1 }}
          />
        </div>

        {/* Title */}
        <EditableText
          textKey="heroTitle"
          tag="h1"
          className="font-bold text-gf-navy text-3xl text-center leading-tight text-balance"
        />
        <p className="font-script text-gf-purple text-xl mt-1 flex items-center gap-2">
          <EditableText textKey="heroSubtitle" tag="span" />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 15.5S2 11 2 6a4.5 4.5 0 0 1 7-3.7A4.5 4.5 0 0 1 16 6c0 5-7 9.5-7 9.5z"
              stroke="#7c3aed" strokeWidth="1.5" fill="none" />
          </svg>
        </p>

        {/* Body text */}
        <EditableText
          textKey="heroBody"
          tag="p"
          className="text-gf-navy/80 text-base leading-relaxed text-center mt-4 text-pretty"
        />

        {/* Song player */}
        <div className="w-full mt-5">
          <SongPlayer />
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-3 gap-3 w-full mt-5">
          {DEFAULT_THUMBNAILS.map((t, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-sm"
              style={{ background: t.bg }}
            >
              {media.albumPhotos[i] ? (
                <img
                  src={media.albumPhotos[i]!}
                  alt={`Our moment ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <PhotoPlaceholder index={i} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={onSeeAlbum}
          className="mt-6 w-full bg-gf-purple text-white font-bold text-sm tracking-widest uppercase py-4 rounded-full shadow-md hover:bg-purple-700 transition-colors"
        >
          <EditableText textKey="heroCta" tag="span" /> &nbsp;&rarr;
        </button>
      </div>
    </section>
  )
}

function HeartIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 14s-6-3.9-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4.1-6 8-6 8z" />
    </svg>
  )
}

function DefaultAvatar() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="48" cy="48" r="48" fill="#ede9fe" />
      <circle cx="48" cy="40" r="18" fill="#f5f0ff" stroke="#c4b5fd" strokeWidth="2" />
      <circle cx="36" cy="40" r="6" fill="#c4b5fd" />
      <circle cx="60" cy="40" r="6" fill="#c4b5fd" />
      <circle cx="36" cy="40" r="4" fill="#ede9fe" />
      <circle cx="60" cy="40" r="4" fill="#ede9fe" />
      <circle cx="43" cy="42" r="3" fill="#1e1b4b" />
      <circle cx="53" cy="42" r="3" fill="#1e1b4b" />
      <circle cx="44" cy="41" r="1" fill="white" />
      <circle cx="54" cy="41" r="1" fill="white" />
      <ellipse cx="38" cy="47" rx="4" ry="2.5" fill="#fecdd3" opacity="0.7" />
      <ellipse cx="58" cy="47" rx="4" ry="2.5" fill="#fecdd3" opacity="0.7" />
      <path d="M43 50 Q48 54 53 50" stroke="#1e1b4b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M10 90 Q10 70 48 68 Q86 70 86 90" fill="#ddd6f3" />
    </svg>
  )
}

function PhotoPlaceholder({ index }: { index: number }) {
  const colors = ['#f9a8d4', '#a78bfa', '#c4b5fd']
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="6" y="10" width="28" height="22" rx="3" stroke={colors[index]} strokeWidth="2" />
      <circle cx="14" cy="18" r="3" fill={colors[index]} opacity="0.5" />
      <path d="M6 28l8-7 6 5 5-4 9 7" stroke={colors[index]} strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity="0.6" />
    </svg>
  )
}

function PinkPeonyFlower() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="18" fill="#fce7f3" opacity="0.8" />
      <circle cx="26" cy="21" r="13" fill="#f9a8d4" opacity="0.75" />
      <circle cx="20" cy="29" r="11" fill="#f472b6" opacity="0.45" />
      <circle cx="32" cy="29" r="11" fill="#fce7f3" opacity="0.55" />
      <circle cx="26" cy="24" r="9" fill="#fbcfe8" />
      <circle cx="26" cy="26" r="5" fill="#fce7f3" />
    </svg>
  )
}

function WhiteDaisyFlower() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const cx = Math.round((22 + Math.cos(rad) * 13) * 100) / 100
        const cy = Math.round((22 + Math.sin(rad) * 13) * 100) / 100
        return <ellipse key={i} cx={cx} cy={cy} rx="5" ry="7" fill="white" opacity="0.9" transform={`rotate(${angle} ${cx} ${cy})`} />
      })}
      <circle cx="22" cy="22" r="7" fill="#fbbf24" />
      <circle cx="22" cy="22" r="4" fill="#f59e0b" />
    </svg>
  )
}
