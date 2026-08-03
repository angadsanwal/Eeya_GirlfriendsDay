'use client'

import { createContext, useContext, useState, useRef, useEffect, type ReactNode, type RefObject } from 'react'
import { supabase } from '@/lib/supabase'

export interface TextContent {
  navTitle: string
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  heroBody: string
  heroCta: string
  momentsBadge: string
  momentsTitle: string
  momentsSubtitle: string
  momentsCta: string
  bouquetBadge: string
  bouquetTitle: string
  bouquetSubtitle: string
  bouquetCta: string
  bouquetReasons: string[]
  letterBadge: string
  letterGreeting: string
  letterBody1: string
  letterBody2: string
  letterBody3: string
  letterSignature: string
  letterFrom: string
  letterFooter: string
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
  loadingSlots: Set<string>
}

interface MediaContextType {
  media: MediaState
  audioRef: RefObject<HTMLAudioElement | null>
  isPlaying: boolean
  setIsPlaying: (v: boolean) => void
  setAvatarUrl: (file: File | null) => Promise<void>
  setSong: (file: File | null) => Promise<void>
  setAlbumPhoto: (index: number, file: File | null) => Promise<void>
  setStickerImage: (index: number, file: File | null) => Promise<void>
  setVideoUrl: (file: File | null) => Promise<void>
  setMomentCaption: (index: number, caption: string) => void
  setText: (key: keyof TextContent, value: string) => void
  setBouquetReason: (index: number, value: string) => void
  setIsAdmin: (v: boolean) => void
}

const BUCKET = 'eeya-media'
const TABLE = 'eeya_birthday'

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
    loadingSlots: new Set(),
  })

  // Load saved content from Supabase on first mount
  useEffect(() => {
    async function loadSlots() {
      const { data, error } = await supabase.from(TABLE).select('*')
      if (error || !data) {
        console.error('Failed to load saved content:', error)
        return
      }
      const bySlot: Record<string, any> = {}
      data.forEach(row => { bySlot[row.slot_key] = row })

      setMedia(prev => ({
        ...prev,
        avatarUrl: bySlot['avatar']?.file_url ?? null,
        songUrl: bySlot['song']?.file_url ?? null,
        songName: bySlot['song']?.file_name ?? null,
        videoUrl: bySlot['video']?.file_url ?? null,
        albumPhotos: [0, 1, 2].map(i => bySlot[`album_${i}`]?.file_url ?? null),
        stickerImages: [0, 1, 2].map(i => bySlot[`sticker_${i}`]?.file_url ?? null),
      }))
    }
    loadSlots()
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (media.songUrl) audio.src = media.songUrl
  }, [media.songUrl])

  // Upload a file to Storage + save its row in the table
  const uploadToSlot = async (slotKey: string, file: File, displayName?: string): Promise<string> => {
    const ext = file.name.split('.').pop()
    const path = `${slotKey}-${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true })
    if (uploadError) throw uploadError

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    const publicUrl = data.publicUrl

    const { error: dbError } = await supabase
      .from(TABLE)
      .upsert(
        { slot_key: slotKey, file_url: publicUrl, file_type: file.type, file_name: displayName ?? file.name },
        { onConflict: 'slot_key' }
      )
    if (dbError) throw dbError

    return publicUrl
  }

  const deleteSlot = async (slotKey: string) => {
    await supabase.from(TABLE).delete().eq('slot_key', slotKey)
  }

  const withLoading = async (slotKey: string, fn: () => Promise<void>) => {
    setMedia(prev => ({ ...prev, loadingSlots: new Set(prev.loadingSlots).add(slotKey) }))
    try {
      await fn()
    } catch (err) {
      console.error(`Failed to save ${slotKey}:`, err)
    } finally {
      setMedia(prev => {
        const next = new Set(prev.loadingSlots)
        next.delete(slotKey)
        return { ...prev, loadingSlots: next }
      })
    }
  }

  const setAvatarUrl = (file: File | null) => withLoading('avatar', async () => {
    if (!file) {
      await deleteSlot('avatar')
      setMedia(prev => ({ ...prev, avatarUrl: null }))
      return
    }
    const url = await uploadToSlot('avatar', file)
    setMedia(prev => ({ ...prev, avatarUrl: url }))
  })

  const setSong = (file: File | null) => withLoading('song', async () => {
    const audio = audioRef.current
    if (audio && isPlaying) { audio.pause(); setIsPlaying(false) }
    if (!file) {
      await deleteSlot('song')
      setMedia(prev => ({ ...prev, songUrl: null, songName: null }))
      return
    }
    const cleanName = file.name.replace(/\.[^/.]+$/, '')
    const url = await uploadToSlot('song', file, cleanName)
    setMedia(prev => ({ ...prev, songUrl: url, songName: cleanName }))
  })

  const setAlbumPhoto = (index: number, file: File | null) => withLoading(`album_${index}`, async () => {
    if (!file) {
      await deleteSlot(`album_${index}`)
      setMedia(prev => { const p = [...prev.albumPhotos]; p[index] = null; return { ...prev, albumPhotos: p } })
      return
    }
    const url = await uploadToSlot(`album_${index}`, file)
    setMedia(prev => { const p = [...prev.albumPhotos]; p[index] = url; return { ...prev, albumPhotos: p } })
  })

  const setStickerImage = (index: number, file: File | null) => withLoading(`sticker_${index}`, async () => {
    if (!file) {
      await deleteSlot(`sticker_${index}`)
      setMedia(prev => { const s = [...prev.stickerImages]; s[index] = null; return { ...prev, stickerImages: s } })
      return
    }
    const url = await uploadToSlot(`sticker_${index}`, file)
    setMedia(prev => { const s = [...prev.stickerImages]; s[index] = url; return { ...prev, stickerImages: s } })
  })

  const setVideoUrl = (file: File | null) => withLoading('video', async () => {
    if (!file) {
      await deleteSlot('video')
      setMedia(prev => ({ ...prev, videoUrl: null }))
      return
    }
    const url = await uploadToSlot('video', file)
    setMedia(prev => ({ ...prev, videoUrl: url }))
  })

  const setMomentCaption = (index: number, caption: string) =>
    setMedia(prev => { const c = [...prev.momentCaptions]; c[index] = caption; return { ...prev, momentCaptions: c } })

  const setText = (key: keyof TextContent, value: string) =>
    setMedia(prev => ({ ...prev, texts: { ...prev.texts, [key]: value } }))

  const setBouquetReason = (index: number, value: string) =>
    setMedia(prev => { const r = [...prev.texts.bouquetReasons]; r[index] = value; return { ...prev, texts: { ...prev.texts, bouquetReasons: r } } })

  const setIsAdmin = (v: boolean) => setMedia(prev => ({ ...prev, isAdmin: v }))

  return (
    <MediaContext.Provider value={{
      media, audioRef, isPlaying, setIsPlaying,
      setAvatarUrl, setSong, setAlbumPhoto, setStickerImage,
      setVideoUrl, setMomentCaption, setText, setBouquetReason, setIsAdmin,
    }}>
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
