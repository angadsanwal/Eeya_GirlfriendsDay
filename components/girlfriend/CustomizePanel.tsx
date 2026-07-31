'use client'

import { useRef, useState } from 'react'
import { useMedia } from './MediaContext'
import type { TextContent } from './MediaContext'

interface CustomizePanelProps {
  open: boolean
  onClose: () => void
}

export default function CustomizePanel({ open, onClose }: CustomizePanelProps) {
  const {
    media, setAvatarUrl, setSong, setAlbumPhoto, setStickerImage,
    setVideoUrl, setMomentCaption, setText, setBouquetReason, setIsAdmin,
  } = useMedia()

  const [tab, setTab] = useState<'media' | 'text'>('media')

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const songInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const albumInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
  const stickerInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, handler: (url: string | null, name?: string | null) => void) => {
    const file = e.target.files?.[0]
    if (!file) return
    handler(URL.createObjectURL(file), file.name.replace(/\.[^/.]+$/, ''))
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Customise your page"
      >
        {/* Header */}
        <div className="border-b border-purple-100 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="font-bold text-gf-navy text-base">Make it yours</h2>
            <p className="text-gf-navy/50 text-xs mt-0.5">Admin mode — only you see this</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Admin toggle */}
        <div className="px-5 pt-4 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between bg-gf-lavender rounded-xl px-4 py-3">
            <div>
              <p className="text-gf-navy text-sm font-semibold">Inline text editing</p>
              <p className="text-gf-navy/50 text-xs mt-0.5">Tap any dashed text to edit it live</p>
            </div>
            <button
              onClick={() => setIsAdmin(!media.isAdmin)}
              className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${media.isAdmin ? 'bg-gf-purple' : 'bg-gray-300'}`}
              aria-label="Toggle inline editing"
              aria-pressed={media.isAdmin}
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                style={{ transform: media.isAdmin ? 'translateX(24px)' : 'translateX(0)' }}
              />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-5 gap-2 pt-2 pb-1 flex-shrink-0">
          {(['media', 'text'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${tab === t ? 'bg-gf-purple text-white' : 'bg-gray-100 text-gf-navy/60'}`}
            >
              {t === 'media' ? 'Photos & Media' : 'Edit Texts'}
            </button>
          ))}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-7">
          {tab === 'media' ? (
            <>
              {/* Profile photo */}
              <section>
                <SectionLabel label="Profile photo" />
                <p className="text-xs text-gray-400 mb-3">Replaces the avatar at the top.</p>
                <UploadSlot url={media.avatarUrl} label="Upload photo" accept="image/*" inputRef={avatarInputRef}
                  onClear={() => setAvatarUrl(null)} onChange={e => handleFile(e, url => setAvatarUrl(url))} square />
              </section>

              {/* Song */}
              <section>
                <SectionLabel label="Our Song" />
                <p className="text-xs text-gray-400 mb-3">Upload an audio file — plays across all sections.</p>
                <input ref={songInputRef} type="file" accept="audio/*" className="hidden"
                  onChange={e => handleFile(e, (url, name) => setSong(url, name ?? null))} />
                {media.songUrl ? (
                  <div className="flex items-center gap-3 bg-gf-lavender rounded-xl px-4 py-3">
                    <div className="w-8 h-8 bg-gf-purple rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="white" aria-hidden="true"><path d="M2 1.5L10 6L2 10.5V1.5Z" /></svg>
                    </div>
                    <p className="text-gf-navy text-sm font-medium truncate flex-1">{media.songName ?? 'Song'}</p>
                    <button onClick={() => setSong(null, null)} className="text-gray-400 hover:text-red-500 text-xs transition-colors">Remove</button>
                  </div>
                ) : (
                  <button onClick={() => songInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gf-purple/30 rounded-xl py-4 text-gf-purple text-sm font-medium hover:border-gf-purple hover:bg-gf-lavender transition-colors">
                    + Upload audio file
                  </button>
                )}
              </section>

              {/* Video */}
              <section>
                <SectionLabel label="Our Video (optional)" />
                <p className="text-xs text-gray-400 mb-3">Shown inside the letter section.</p>
                <input ref={videoInputRef} type="file" accept="video/*" className="hidden"
                  onChange={e => handleFile(e, url => setVideoUrl(url))} />
                {media.videoUrl ? (
                  <div className="rounded-xl overflow-hidden border border-purple-100">
                    <video src={media.videoUrl} className="w-full max-h-40 object-cover" />
                    <div className="p-2 flex justify-end">
                      <button onClick={() => setVideoUrl(null)} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Remove</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => videoInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gf-purple/30 rounded-xl py-4 text-gf-purple text-sm font-medium hover:border-gf-purple hover:bg-gf-lavender transition-colors">
                    + Upload video file
                  </button>
                )}
              </section>

              {/* Album photos */}
              <section>
                <SectionLabel label="Album photos" />
                <p className="text-xs text-gray-400 mb-3">Up to 3 photos shown in the carousel.</p>
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map(i => (
                    <div key={i}>
                      <input ref={albumInputRefs[i]} type="file" accept="image/*" className="hidden"
                        onChange={e => handleFile(e, url => setAlbumPhoto(i, url))} />
                      <UploadSlot url={media.albumPhotos[i]} label={`Photo ${i + 1}`} accept="image/*"
                        inputRef={albumInputRefs[i]} onClear={() => setAlbumPhoto(i, null)}
                        onChange={e => handleFile(e, url => setAlbumPhoto(i, url))} square />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  {[0, 1, 2].map(i => (
                    <div key={i}>
                      <label className="text-xs text-gray-500 mb-1 block">Caption {i + 1}</label>
                      <input type="text" value={media.momentCaptions[i]}
                        onChange={e => setMomentCaption(i, e.target.value)}
                        className="w-full border border-purple-100 rounded-lg px-3 py-2 text-sm text-gf-navy focus:outline-none focus:ring-2 focus:ring-gf-purple/30"
                        placeholder={`Caption for photo ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </section>

              {/* Stickers */}
              <section>
                <SectionLabel label="Sticker images" />
                <p className="text-xs text-gray-400 mb-3">3 images shown in the letter section.</p>
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map(i => (
                    <div key={i}>
                      <input ref={stickerInputRefs[i]} type="file" accept="image/*" className="hidden"
                        onChange={e => handleFile(e, url => setStickerImage(i, url))} />
                      <UploadSlot url={media.stickerImages[i]} label={`Sticker ${i + 1}`} accept="image/*"
                        inputRef={stickerInputRefs[i]} onClear={() => setStickerImage(i, null)}
                        onChange={e => handleFile(e, url => setStickerImage(i, url))} square />
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <TextEditTab setText={setText} setBouquetReason={setBouquetReason} media={media} />
          )}

          <button onClick={onClose} className="w-full bg-gf-purple text-white font-bold py-4 rounded-full hover:bg-purple-700 transition-colors mt-2">
            Done — show Eeya!
          </button>
        </div>
      </div>
    </>
  )
}

/* ── Text editing tab ── */
type SetText = (key: keyof TextContent, value: string) => void
type SetReason = (index: number, value: string) => void

function TextEditTab({ setText, setBouquetReason, media }: { setText: SetText; setBouquetReason: SetReason; media: any }) {
  const t = media.texts as TextContent

  const field = (label: string, key: keyof TextContent, multiline = false) => (
    <div key={key}>
      <label className="text-xs text-gray-500 mb-1 block font-medium">{label}</label>
      {multiline ? (
        <textarea
          value={t[key] as string}
          onChange={e => setText(key, e.target.value)}
          rows={3}
          className="w-full border border-purple-100 rounded-lg px-3 py-2 text-sm text-gf-navy focus:outline-none focus:ring-2 focus:ring-gf-purple/30 resize-none"
        />
      ) : (
        <input
          type="text"
          value={t[key] as string}
          onChange={e => setText(key, e.target.value)}
          className="w-full border border-purple-100 rounded-lg px-3 py-2 text-sm text-gf-navy focus:outline-none focus:ring-2 focus:ring-gf-purple/30"
        />
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-gf-lavender rounded-xl px-4 py-3 text-xs text-gf-navy/70 leading-relaxed">
        Or toggle <span className="font-bold text-gf-purple">Inline text editing</span> above to tap and edit text directly on the page.
      </div>

      <section className="flex flex-col gap-3">
        <SectionLabel label="Intro screen" />
        {field('Tag line', 'introTag')}
        {field('Card title', 'introCardTitle')}
        {field('Card subtitle', 'introCardSubtitle')}
        {field('Card signed', 'introCardSigned')}
        {field('Tap prompt', 'introTap')}
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel label="Navigation" />
        {field('Nav title', 'navTitle')}
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel label="Hero section" />
        {field('Badge', 'heroBadge')}
        {field('Heading', 'heroTitle')}
        {field('Subtitle', 'heroSubtitle')}
        {field('Body text', 'heroBody', true)}
        {field('Button text', 'heroCta')}
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel label="Moments section" />
        {field('Badge', 'momentsBadge')}
        {field('Heading', 'momentsTitle')}
        {field('Subtitle', 'momentsSubtitle')}
        {field('Button text', 'momentsCta')}
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel label="Bouquet section" />
        {field('Badge', 'bouquetBadge')}
        {field('Heading', 'bouquetTitle')}
        {field('Subtitle', 'bouquetSubtitle')}
        {field('Button text', 'bouquetCta')}
        {t.bouquetReasons.map((r, i) => (
          <div key={i}>
            <label className="text-xs text-gray-500 mb-1 block font-medium">Reason {i + 1}</label>
            <input
              type="text"
              value={r}
              onChange={e => setBouquetReason(i, e.target.value)}
              className="w-full border border-purple-100 rounded-lg px-3 py-2 text-sm text-gf-navy focus:outline-none focus:ring-2 focus:ring-gf-purple/30"
            />
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel label="Letter section" />
        {field('Badge', 'letterBadge')}
        {field('Greeting', 'letterGreeting')}
        {field('Body paragraph 1', 'letterBody1', true)}
        {field('Body paragraph 2', 'letterBody2', true)}
        {field('Body paragraph 3', 'letterBody3', true)}
        {field('Signature', 'letterSignature')}
        {field('From (name)', 'letterFrom')}
        {field('Footer', 'letterFooter')}
      </section>
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return <h3 className="font-bold text-gf-navy text-sm">{label}</h3>
}

interface UploadSlotProps {
  url: string | null
  label: string
  accept: string
  inputRef: React.RefObject<HTMLInputElement | null>
  onClear: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  square?: boolean
}

function UploadSlot({ url, label, accept, inputRef, onClear, onChange, square }: UploadSlotProps) {
  return (
    <div className={`relative ${square ? 'aspect-square' : ''}`}>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={onChange} />
      {url ? (
        <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-gf-purple">
          <img src={url} alt={label} className="w-full h-full object-cover" />
          <button onClick={onClear}
            className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
            aria-label={`Remove ${label}`}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 1l8 8M9 1L1 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ) : (
        <button onClick={() => inputRef.current?.click()}
          className="w-full h-full border-2 border-dashed border-gf-purple/30 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:border-gf-purple hover:bg-gf-lavender transition-colors min-h-[72px]"
          aria-label={`Upload ${label}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="2" y="4" width="16" height="12" rx="2" stroke="#a78bfa" strokeWidth="1.5" />
            <circle cx="7" cy="8.5" r="1.5" fill="#a78bfa" />
            <path d="M2 13l4-3.5 3 2.5 3-2.5 6 4" stroke="#a78bfa" strokeWidth="1.2" fill="none" />
          </svg>
          <span className="text-gf-purple text-xs font-medium">{label}</span>
        </button>
      )}
    </div>
  )
}
