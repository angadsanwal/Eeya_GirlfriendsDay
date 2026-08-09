'use client'

import { createContext, useContext, useState, useRef, useEffect, type ReactNode, type RefObject } from 'react'
import { supabase } from '@/lib/supabase'

export interface Coupon {
  id: string
  emoji: string
  title: string
  note: string
}

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
  couponsBadge: string
  couponsTitle: string
  couponsSubtitle: string
  coupons: Coupon[]
}

const DEFAULT_TEXTS: TextContent = {
  navTitle: 'only and only for my love',
  heroBadge: 'FOR MY FAVOURITE GIRL',
  heroTitle: "Happy Birthday, my love",
  heroSubtitle: 'yours, always',
  heroBody: "Today is all about you. I wanted to make you something that wasn’t just another birthday message, something you could come back to whenever you wanted. Happy birthday, my love. I’m so lucky I get to call you mine.",
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
  couponsBadge: 'EST. WITH LOVE',
  couponsTitle: 'Birthday Coupon Vault',
  couponsSubtitle: 'redeem whenever your heart desires',
  coupons: [
    { id: 'BDAY-001', emoji: '🎀', title: '20 Kisses Coupon 💋', note: 'Emotional damages not covered under warranty.' },
    { id: 'BDAY-002', emoji: '🙅', title: 'One Screen-Free Night, Just Us', note: 'For certified partner use only.' },
    { id: 'BDAY-003', emoji: '🤗', title: '10-Minute Hug Session', note: 'Redeemable subject to availability.' },
    { id: 'BDAY-004', emoji: '😴', title: 'Cuddle & Nap Together Pass ☁️', note: 'Naps guaranteed to be too short.' },
    { id: 'BDAY-005', emoji: '💆', title: 'Full Body Massage', note: 'Unauthorized duplication strictly prohibited.' },
    { id: 'BDAY-006', emoji: '💇', title: 'Head Massage + Hair Oil Champi', note: 'Use before I fall asleep first.' },
    { id: 'BDAY-007', emoji: '📸', title: 'One Cute Picture, No Questions Asked', note: 'Valid under birthday compliance standards.' },
    { id: 'BDAY-008', emoji: '🧖', title: 'Face Massage & Skincare Night 🧴', note: 'High-priority romantic infrastructure enabled.' },
    { id: 'BDAY-009', emoji: '🍳', title: "I'll Cook Your Favourite Meal 🍰", note: "Chef's mood may vary." },
    { id: 'BDAY-010', emoji: '🎒', title: 'One Mini Adventure Together 🚇', note: 'Excessive smugness prohibited.' },
    { id: 'BDAY-011', emoji: '⚠️', title: 'One "Yes Hour"', note: 'Non-transferable birthday asset.' },
    { id: 'BDAY-012', emoji: '💌', title: 'I Plan the Entire Date Day', note: 'Redeemable subject to my planning skills.' },
    { id: 'BDAY-013', emoji: '📞', title: 'Cute Video Call Coupon 💖', note: 'Battery percentage not guaranteed.' },
    { id: 'BDAY-014', emoji: '👑', title: 'Dedicated Princess Day', note: 'Crown provided. Attitude optional.' },
    { id: 'BDAY-015', emoji: '🎧', title: 'Mandatory Playlist Takeover', note: 'You listen, no skipping allowed.' },
    { id: 'BDAY-016', emoji: '🛍️', title: 'One Guilt-Free Shopping Trip', note: 'Budget subject to negotiation.' },
    { id: 'BDAY-017', emoji: '🍿', title: 'Movie Night, Your Pick', note: "Even if it's the one I hate." },
    { id: 'BDAY-018', emoji: '🧁', title: 'Dessert of Your Choice, On Me', note: 'Sugar rush not included in refund policy.' },
    { id: 'BDAY-019', emoji: '🧹', title: 'Skip-a-Chore Pass', note: 'Redeem before I change my mind.' },
    { id: 'BDAY-020', emoji: '🙊', title: 'One Free Pass on an Argument', note: 'Terms and conditions apply, mostly to me.' },
    { id: 'BDAY-021', emoji: '💃', title: 'A Dance in the Kitchen', note: 'Off-key singing guaranteed.' },
    { id: 'BDAY-022', emoji: '🎁', title: 'One Surprise, Details Withheld', note: 'No hints. No bribes.' },
    { id: 'BDAY-023', emoji: '🌙', title: "Late Night Talk Till We're Sleepy", note: 'Deep topics only, no small talk.' },
    { id: 'BDAY-024', emoji: '💍', title: 'A Lifetime of More Birthdays Together', note: 'Terms: forever. No expiry date.' },
  ],
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
  isAuthenticated: boolean
  loadingSlots: Set<string>
  redeemedCoupons: Record<string, boolean>
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
  setCouponField: (index: number, field: 'title' | 'note', value: string) => void
  toggleCoupon: (id: string, redeemed: boolean) => void
  login: (password: string) => boolean
  logout: () => void
}

const BUCKET = 'eeya-media'
const TABLE = 'eeya_birthday'
const ADMIN_PASSWORD = 'angad'
const AUTH_STORAGE_KEY = 'eeya_admin_authed'

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
    isAuthenticated: false,
    loadingSlots: new Set(),
    redeemedCoupons: {},
  })

  // Restore admin login from this browser, if it was unlocked before
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true') {
      setMedia(prev => ({ ...prev, isAuthenticated: true }))
    }
  }, [])

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

      const redeemedCoupons: Record<string, boolean> = {}
      data.forEach(row => {
        if (row.slot_key.startsWith('coupon_')) {
          redeemedCoupons[row.slot_key.slice('coupon_'.length)] = true
        }
      })

      setMedia(prev => ({
        ...prev,
        avatarUrl: bySlot['avatar']?.file_url ?? null,
        songUrl: bySlot['song']?.file_url ?? null,
        songName: bySlot['song']?.file_name ?? null,
        videoUrl: bySlot['video']?.file_url ?? null,
        albumPhotos: [0, 1, 2].map(i => bySlot[`album_${i}`]?.file_url ?? null),
        stickerImages: [0, 1, 2].map(i => bySlot[`sticker_${i}`]?.file_url ?? null),
        redeemedCoupons,
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

  const login = (password: string): boolean => {
    if (password !== ADMIN_PASSWORD) return false
    if (typeof window !== 'undefined') window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    setMedia(prev => ({ ...prev, isAuthenticated: true }))
    return true
  }

  const logout = () => {
    if (typeof window !== 'undefined') window.localStorage.removeItem(AUTH_STORAGE_KEY)
    setMedia(prev => ({ ...prev, isAuthenticated: false, isAdmin: false }))
  }

  const setCouponField = (index: number, field: 'title' | 'note', value: string) =>
    setMedia(prev => {
      const coupons = [...prev.texts.coupons]
      coupons[index] = { ...coupons[index], [field]: value }
      return { ...prev, texts: { ...prev.texts, coupons } }
    })

  // Redeemed state is the one thing on this page that persists to Supabase,
  // so it survives refreshes on any device — same guarantee as the photos.
  const toggleCoupon = (id: string, redeemed: boolean) => {
    setMedia(prev => ({ ...prev, redeemedCoupons: { ...prev.redeemedCoupons, [id]: redeemed } }))
    ;(async () => {
      try {
        if (redeemed) {
          await supabase
            .from(TABLE)
            .upsert({ slot_key: `coupon_${id}`, file_url: 'redeemed', file_type: 'coupon', file_name: id }, { onConflict: 'slot_key' })
        } else {
          await supabase.from(TABLE).delete().eq('slot_key', `coupon_${id}`)
        }
      } catch (err) {
        console.error(`Failed to sync coupon ${id}:`, err)
      }
    })()
  }

  return (
    <MediaContext.Provider value={{
      media, audioRef, isPlaying, setIsPlaying,
      setAvatarUrl, setSong, setAlbumPhoto, setStickerImage,
      setVideoUrl, setMomentCaption, setText, setBouquetReason, setIsAdmin,
      setCouponField, toggleCoupon, login, logout,
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
