'use client'

import { useMedia } from './MediaContext'
import EditableText from './EditableText'
import { EditableBouquetReason } from './EditableText'

interface BouquetSectionProps {
  onReadLetter: () => void
}

const FLOWER_COMPONENTS = [
  <PinkPeony key={0} />,
  <CherryBlossom key={1} />,
  <PurpleTulip key={2} />,
  <PurpleAnemone key={3} />,
  <PeachRose key={4} />,
  <WhiteDaisy key={5} />,
]

export default function BouquetSection({ onReadLetter }: BouquetSectionProps) {
  const { media } = useMedia()

  return (
    <section id="bouquet" className="relative pt-10 pb-0" style={{ background: '#e8e0f5' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(147,112,219,0.15) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative max-w-md mx-auto flex flex-col items-center px-4">
        {/* Badge */}
        <div className="bg-white rounded-full px-5 py-1.5 border border-pink-200 shadow-sm mb-5">
          <span className="text-gf-navy text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
            <HeartFillIcon className="text-gf-pink" size={12} />
            <EditableText textKey="bouquetBadge" tag="span" />
          </span>
        </div>

        <EditableText
          textKey="bouquetTitle"
          tag="h2"
          className="font-bold text-gf-navy text-3xl text-center text-balance leading-tight"
        />
        <p className="font-script text-gf-purple text-xl mt-2 flex items-center gap-1.5">
          <EditableText textKey="bouquetSubtitle" tag="span" />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 18S2 13 2 7a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6-8 11-8 11z" stroke="#7c3aed" strokeWidth="1.5" fill="none" />
          </svg>
        </p>

        {/* Flower grid */}
        <div className="grid grid-cols-2 gap-3 w-full mt-7">
          {FLOWER_COMPONENTS.map((flower, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3 shadow-sm border border-purple-50">
              <div className="w-14 h-14 flex items-center justify-center" aria-hidden="true">
                {flower}
              </div>
              <p className="text-gf-navy text-sm font-medium text-center leading-snug text-pretty">
                <EditableBouquetReason index={i} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave border */}
      <div className="relative mt-10 overflow-hidden" style={{ height: '48px' }}>
        <svg viewBox="0 0 400 48" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full" fill="#7c3aed" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <circle key={i} cx={i * 22 - 5} cy={40} r={12} />
          ))}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gf-purple" />
      </div>

      {/* CTA on purple bg */}
      <div className="bg-gf-purple px-4 py-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={onReadLetter}
            className="w-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 font-bold text-sm tracking-widest uppercase py-4 rounded-full shadow-md transition-colors"
          >
            <EditableText textKey="bouquetCta" tag="span" /> &nbsp;&rarr;
          </button>
        </div>
      </div>
    </section>
  )
}

function HeartFillIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 14s-6-3.9-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4.1-6 8-6 8z" />
    </svg>
  )
}

function PinkPeony() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
      <circle cx="28" cy="28" r="20" fill="#fce7f3" opacity="0.7" />
      <circle cx="28" cy="23" r="14" fill="#f9a8d4" opacity="0.8" />
      <circle cx="22" cy="31" r="12" fill="#f472b6" opacity="0.45" />
      <circle cx="34" cy="31" r="12" fill="#fce7f3" opacity="0.55" />
      <circle cx="28" cy="26" r="9" fill="#fbcfe8" />
      <circle cx="28" cy="28" r="5" fill="#fce7f3" />
    </svg>
  )
}

function CherryBlossom() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = ((angle - 90) * Math.PI) / 180
        const cx = Math.round((28 + Math.cos(rad) * 14) * 100) / 100
        const cy = Math.round((28 + Math.sin(rad) * 14) * 100) / 100
        return <ellipse key={i} cx={cx} cy={cy} rx="8" ry="10" fill="#fbcfe8" transform={`rotate(${angle} ${cx} ${cy})`} />
      })}
      <circle cx="28" cy="28" r="7" fill="#fde68a" />
      <circle cx="28" cy="28" r="4" fill="#fbbf24" />
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const r = ((a - 90) * Math.PI) / 180
        const cx = Math.round((28 + Math.cos(r) * 5.5) * 100) / 100
        const cy = Math.round((28 + Math.sin(r) * 5.5) * 100) / 100
        return <circle key={i} cx={cx} cy={cy} r="1" fill="#f59e0b" />
      })}
    </svg>
  )
}

function PurpleTulip() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
      <path d="M28 52 L28 28" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 38 Q20 30 20 20 Q20 10 28 8 Q36 10 36 20 Q36 30 28 38Z" fill="#a78bfa" />
      <path d="M28 38 Q24 30 24 22" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function PurpleAnemone() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = ((angle - 90) * Math.PI) / 180
        const cx = Math.round((28 + Math.cos(rad) * 14) * 100) / 100
        const cy = Math.round((28 + Math.sin(rad) * 14) * 100) / 100
        return <ellipse key={i} cx={cx} cy={cy} rx="7" ry="10" fill="#c4b5fd" opacity="0.8" transform={`rotate(${angle} ${cx} ${cy})`} />
      })}
      <circle cx="28" cy="28" r="8" fill="#7c3aed" />
      <circle cx="28" cy="28" r="5" fill="#5b21b6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = (a * Math.PI) / 180
        const cx = Math.round((28 + Math.cos(r) * 6) * 100) / 100
        const cy = Math.round((28 + Math.sin(r) * 6) * 100) / 100
        return <circle key={i} cx={cx} cy={cy} r="1.2" fill="#a78bfa" />
      })}
    </svg>
  )
}

function PeachRose() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
      <circle cx="28" cy="28" r="20" fill="#fed7aa" opacity="0.6" />
      <circle cx="28" cy="23" r="14" fill="#fdba74" opacity="0.75" />
      <circle cx="22" cy="31" r="12" fill="#fb923c" opacity="0.35" />
      <circle cx="34" cy="31" r="12" fill="#fed7aa" opacity="0.5" />
      <circle cx="28" cy="26" r="9" fill="#ffedd5" />
      <circle cx="28" cy="28" r="5" fill="#fed7aa" />
      <circle cx="28" cy="28" r="3" fill="#ffedd5" />
    </svg>
  )
}

function WhiteDaisy() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = ((angle - 90) * Math.PI) / 180
        const cx = Math.round((28 + Math.cos(rad) * 14) * 100) / 100
        const cy = Math.round((28 + Math.sin(rad) * 14) * 100) / 100
        return <ellipse key={i} cx={cx} cy={cy} rx="5" ry="8" fill="white" stroke="#e5e7eb" strokeWidth="0.5" transform={`rotate(${angle} ${cx} ${cy})`} />
      })}
      <circle cx="28" cy="28" r="8" fill="#fde68a" />
      <circle cx="28" cy="28" r="5" fill="#fbbf24" />
    </svg>
  )
}
