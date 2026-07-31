'use client'

import { useState, useEffect } from 'react'
import { useMedia } from './MediaContext'

export default function SongPlayer() {
  const { media, audioRef, isPlaying, setIsPlaying } = useMedia()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => { if (!isNaN(audio.duration)) setDuration(audio.duration) }
    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('loadedmetadata', handleDurationChange)
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('loadedmetadata', handleDurationChange)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioRef, setIsPlaying])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || !media.songUrl) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  const formatTime = (t: number) => {
    if (!isFinite(t)) return '0:00'
    return `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-purple-100">
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gf-lavender flex-shrink-0 flex items-center justify-center">
        <MusicNoteIcon />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-bold text-gf-navy text-sm leading-tight">Our Song</p>
        <p className="text-gf-purple text-xs uppercase tracking-wider truncate mt-0.5">
          {media.songName ? media.songName : "A TRACK THAT'S JUST FOR US..."}
        </p>
        <div
          className="mt-2 h-1.5 bg-purple-100 rounded-full cursor-pointer"
          onClick={handleSeek}
          role="slider"
          aria-label="Song progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full bg-gf-purple rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play / pause */}
      <button
        onClick={togglePlay}
        disabled={!media.songUrl}
        className="w-11 h-11 bg-gf-purple rounded-full flex items-center justify-center text-white flex-shrink-0 disabled:opacity-40 hover:bg-purple-700 transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <rect x="2" y="1" width="4" height="12" rx="1" />
            <rect x="8" y="1" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M3 1.5L12 7L3 12.5V1.5Z" />
          </svg>
        )}
      </button>
    </div>
  )
}

function MusicNoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M11 20V8l10-2v12" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="3" fill="#a78bfa" />
      <circle cx="19" cy="18" r="3" fill="#c4b5fd" />
    </svg>
  )
}
