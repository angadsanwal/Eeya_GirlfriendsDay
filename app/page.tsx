'use client'

import { useState } from 'react'
import { MediaProvider } from '@/components/girlfriend/MediaContext'
import IntroScreen from '@/components/girlfriend/IntroScreen'
import StickyNav from '@/components/girlfriend/StickyNav'
import HeroSection from '@/components/girlfriend/HeroSection'
import MomentsCarousel from '@/components/girlfriend/MomentsCarousel'
import BouquetSection from '@/components/girlfriend/BouquetSection'
import LetterSection from '@/components/girlfriend/LetterSection'
import CouponsSection from '@/components/girlfriend/CouponsSection'
import CustomizePanel from '@/components/girlfriend/CustomizePanel'
import FloatingAudioToggle from '@/components/girlfriend/FloatingAudioToggle'

// 0 = intro, 1 = hero, 2 = moments, 3 = bouquet, 4 = letter, 5 = coupons
type SectionIndex = 0 | 1 | 2 | 3 | 4 | 5

export default function GirlfriendsDayPage() {
  const [section, setSection] = useState<SectionIndex>(0)
  const [customizeOpen, setCustomizeOpen] = useState(false)
  // Track exit direction for animation
  const [transitioning, setTransitioning] = useState(false)
  // Remembers which section to return to when leaving the coupons page,
  // since coupons can be reached from any section via the nav button.
  const [prevSection, setPrevSection] = useState<SectionIndex>(1)

  const goTo = (next: SectionIndex) => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setSection(next)
      setTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 400)
  }

  const goToCoupons = () => {
    if (section !== 0 && section !== 5) setPrevSection(section)
    goTo(5)
  }

  return (
    <MediaProvider>
      <FloatingAudioToggle />

      {/* ── Intro ── */}
      {section === 0 && (
        <IntroScreen onBegin={() => { setSection(1); window.scrollTo({ top: 0, behavior: 'instant' }) }} />
      )}

      {/* ── Sections 1-4: each full-screen with fade-slide ── */}
      {section !== 0 && (
        <div
          key={section}
          className="min-h-screen"
          style={{
            background: '#e8e0f5',
            animation: 'sectionIn 0.45s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          <StickyNav
            onCustomize={() => setCustomizeOpen(true)}
            onCoupons={goToCoupons}
            onBack={
              section === 5
                ? () => goTo(prevSection)
                : section > 1
                  ? () => goTo((section - 1) as SectionIndex)
                  : undefined
            }
          />

          {section === 1 && (
            <HeroSection onSeeAlbum={() => goTo(2)} />
          )}
          {section === 2 && (
            <MomentsCarousel onWhyAdore={() => goTo(3)} />
          )}
          {section === 3 && (
            <BouquetSection onReadLetter={() => goTo(4)} />
          )}
          {section === 4 && (
            <LetterSection onReadAgain={() => goTo(0)} />
          )}
          {section === 5 && (
            <CouponsSection />
          )}
        </div>
      )}

      <CustomizePanel open={customizeOpen} onClose={() => setCustomizeOpen(false)} />

      <style>{`
        @keyframes sectionIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </MediaProvider>
  )
}
