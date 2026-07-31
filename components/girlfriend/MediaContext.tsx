'use client'

import { createContext, useContext, useState, useRef, useEffect, type ReactNode, type RefObject } from 'react'

export interface TextContent {
  // Nav
  navTitle: string
  // Hero
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  heroBody: string
  heroCta: string
  // Moments
  momentsBadge: string
  momentsTitle: string
  momentsSubtitle: string
  momentsCta: string
  // Bouquet
  bouquetBadge: string
  bouquetTitle: string
  bouquetSubtitle: string
  bouquetCta: string
  bouquetReasons: string[]
  // Letter
  letterBadge: string
  letterGreeting: string
  letterBody1: string
  letterBody2: string
  letterBody3: string
  letterSignature: string
  letterFrom: string
  letterFooter: string
  // Intro
  introTag: string
  introCardTitle: string
  introCardSubtitle: string
  introCardSigned: string
  introTap: string
}

const DEFAULT_TEXTS: TextContent = {
  navTitle: 'only and only for my love',
  heroBadge: 'FOR MY FAVOURITE PERSON',
  heroTitle: "Happy Girlfriend's Day",
  heroSubtitle: 'for you, always',
  heroBody: "Today is all about you. I built this tiny corner of the internet to say what I don't say often enough — that you make ordinary days feel like the good kind of story. Stay a while, my love.",
  heroCta: 'SEE OUR LITTLE ALBUM',
  momentsBadge: 'OUR MOMENTS',
  momentsTitle: 'us, in a few frames',
  momentsSubtitle: "a handful of moments I'd relive on loop",
  momentsCta: 'WHY I ADORE YOU',
  bouquetBadge: 'A LITTLE BOUQUET',
  bouquetTitle: 'a bloom for every reason I adore you',
  bouquetSubtitle: 'picked just for you',
  bouquetCta: 'READ MY LETTER',
  bouquetReasons: [
    'you feel like home',
    'your laugh is my favourite sound',
    'you make ordinary days magic',
    "you're my calm and my spark",
    'you make me want to be better',
    "it's you. it's always you.",
  ],
  letterBadge: 'A LETTER, JUST FOR YOU',
  letterGreeting: 'My darling,',
  letterBody1: "I'm better with actions than with words, so I made you a little page instead — a song, our pictures, and a few things I mean with my whole heart.",
  letterBody2: 'thank you for being the calm in my chaos and the spark in my ordinary. for the late-night talks, the terrible puns, and the way you always know when I need a hug before I do.',
  letterBody3: "I hope today feels soft and warm and completely yours. I hope you feel even a fraction of how much you're adored. and I hope you always know — even on the days I forget to say it — I choose you, every single time.",
  letterSignature: 'yours, completely,',
  letterFrom: 'YOUR PERSON',
  letterFooter: 'WITH ALL MY LOVE · ME',
  introTag: 'FOR THE GIRL I ADORE',
  introCardTitle: 'a little world, made for you',
  introCardSubtitle: "happy girlfriend's day, my love",
  introCardSigned: 'yours, always',
  introTap: 'TAP ANYWHERE TO BEGIN',
}

const DEFAULT_CAPTIONS = [
  'the day I realised you were my favourite hello.',
  'every quiet moment with you is my favourite kind.',
  "I'd choose this — us, exactly like this — every time.",
]

interface MediaState {
  avatarUrl: string | null
  songUrl: string | null
  songName: string | null
  albumPhotos: (string | null)[]
  stickerImages: (string | null)[]
  videoUrl: string | null
  momentCaptions: string[]
  texts: TextContent
  isAdmin: boolean
}

interface MediaContextType {
  media: MediaState
  audioRef: RefObject<HTMLAudioElement | null>
  isPlaying: boolean
  setIsPlaying: (v: boolean) => void
  setAvatarUrl: (url: string | null) => void
  setSong: (url: string | null, name: string | null) => void
  setAlbumPhoto: (index: number, url: string | null) => void
  setStickerImage: (index: number, url: string | null) => void
  setVideoUrl: (url: string | null) => void
  setMomentCaption: (index: number, caption: string) => void
  setText: (key: keyof TextContent, value: string) => void
  setBouquetReason: (index: number, value: string) => void
  setIsAdmin: (v: boolean) => void
}

const MediaContext = createContext<MediaContextType | null>(null)

export function MediaProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const [media, setMedia] = useState<MediaState>({
    avatarUrl: null,
    songUrl: null,
    songName: null,
    albumPhotos: [null, null, null],
    stickerImages: [null, null, null],
    videoUrl: null,
    momentCaptions: [...DEFAULT_CAPTIONS],
    texts: { ...DEFAULT_TEXTS },
    isAdmin: false,
  })

  // Sync audio src when songUrl changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (media.songUrl) {
      audio.src = media.songUrl
    }
  }, [media.songUrl])

  const setAvatarUrl = (url: string | null) =>
    setMedia(prev => ({ ...prev, avatarUrl: url }))

  const setSong = (url: string | null, name: string | null) => {
    const audio = audioRef.current
    if (audio && isPlaying) { audio.pause(); setIsPlaying(false) }
    setMedia(prev => ({ ...prev, songUrl: url, songName: name }))
  }

  const setAlbumPhoto = (index: number, url: string | null) =>
    setMedia(prev => {
      const p = [...prev.albumPhotos]; p[index] = url
      return { ...prev, albumPhotos: p }
    })

  const setStickerImage = (index: number, url: string | null) =>
    setMedia(prev => {
      const s = [...prev.stickerImages]; s[index] = url
      return { ...prev, stickerImages: s }
    })

  const setVideoUrl = (url: string | null) =>
    setMedia(prev => ({ ...prev, videoUrl: url }))

  const setMomentCaption = (index: number, caption: string) =>
    setMedia(prev => {
      const c = [...prev.momentCaptions]; c[index] = caption
      return { ...prev, momentCaptions: c }
    })

  const setText = (key: keyof TextContent, value: string) =>
    setMedia(prev => ({ ...prev, texts: { ...prev.texts, [key]: value } }))

  const setBouquetReason = (index: number, value: string) =>
    setMedia(prev => {
      const r = [...prev.texts.bouquetReasons]; r[index] = value
      return { ...prev, texts: { ...prev.texts, bouquetReasons: r } }
    })

  const setIsAdmin = (v: boolean) =>
    setMedia(prev => ({ ...prev, isAdmin: v }))

  return (
    <MediaContext.Provider value={{
      media, audioRef, isPlaying, setIsPlaying,
      setAvatarUrl, setSong, setAlbumPhoto, setStickerImage,
      setVideoUrl, setMomentCaption, setText, setBouquetReason, setIsAdmin,
    }}>
      {/* Single persistent audio element */}
      <audio ref={audioRef} loop />
      {children}
    </MediaContext.Provider>
  )
}

export function useMedia() {
  const ctx = useContext(MediaContext)
  if (!ctx) throw new Error('useMedia must be used within MediaProvider')
  return ctx
}
