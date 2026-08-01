'use client'

import { useMedia } from './MediaContext'
import EditableText from './EditableText'

interface StickyNavProps {
  onCustomize: () => void
  onBack?: () => void
}

export default function StickyNav({ onCustomize, onBack }: StickyNavProps) {
  const { media } = useMedia()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Back button */}
        <button
          onClick={onBack}
          disabled={!onBack}
          className="flex items-center gap-1.5 text-gf-navy text-sm font-semibold border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors disabled:opacity-0 disabled:pointer-events-none flex-shrink-0"
          aria-label="Back"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        {/* Title — editable in admin mode */}
        <EditableText
          textKey="navTitle"
          tag="span"
          className="text-gf-navy font-semibold text-xs text-center leading-tight flex-1 min-w-0"
        />

        {/* Make it yours */}
        <button
          onClick={onCustomize}
          className="bg-gf-purple text-white text-xs font-semibold rounded-full px-3 py-1.5 hover:bg-purple-700 transition-colors flex-shrink-0 whitespace-nowrap"
          >
           Make it yours
          </button>
      </div>
    </header>
  )
}
