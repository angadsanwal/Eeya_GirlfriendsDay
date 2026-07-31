'use client'

import { useMedia } from './MediaContext'

export default function FloatingAudioToggle() {
  const { media, audioRef, isPlaying, setIsPlaying } = useMedia()

  if (!media.songUrl) return null

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-4 z-[60] w-12 h-12 bg-white/95 backdrop-blur-sm border border-purple-100 shadow-xl rounded-full flex items-center justify-center hover:bg-white transition-colors"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        /* Animated music bars */
        <span className="flex items-end gap-0.5 h-5" aria-hidden="true">
          <span className="w-1 bg-gf-purple rounded-full" style={{ height: '40%', animation: 'musicBar1 0.8s ease-in-out infinite' }} />
          <span className="w-1 bg-gf-purple rounded-full" style={{ height: '100%', animation: 'musicBar2 0.8s ease-in-out infinite 0.2s' }} />
          <span className="w-1 bg-gf-purple rounded-full" style={{ height: '60%', animation: 'musicBar1 0.8s ease-in-out infinite 0.4s' }} />
        </span>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 2.5l9 5.5-9 5.5V2.5Z" fill="#7c3aed" />
        </svg>
      )}
    </button>
  )
}
