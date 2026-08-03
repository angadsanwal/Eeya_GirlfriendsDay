'use client'

import { useState } from 'react'
import { useMedia } from './MediaContext'

interface AdminLoginProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AdminLogin({ open, onClose, onSuccess }: AdminLoginProps) {
  const { login } = useMedia()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      setPassword('')
      setError(false)
      onSuccess()
    } else {
      setError(true)
    }
  }

  const handleClose = () => {
    setPassword('')
    setError(false)
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" />
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Admin login"
        onClick={handleClose}
      >
        <form
          onSubmit={handleSubmit}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-xs bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-3"
        >
          <div>
            <h2 className="font-bold text-gf-navy text-base">Admin login</h2>
            <p className="text-gf-navy/50 text-xs mt-0.5">Enter the password to make changes.</p>
          </div>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            placeholder="Password"
            className={`w-full border rounded-lg px-3 py-2 text-sm text-gf-navy focus:outline-none focus:ring-2 ${
              error ? 'border-red-300 focus:ring-red-200' : 'border-purple-100 focus:ring-gf-purple/30'
            }`}
          />
          {error && <p className="text-xs text-red-500 -mt-1">Wrong password, try again.</p>}
          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-100 text-gf-navy text-sm font-semibold py-2.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gf-purple text-white text-sm font-semibold py-2.5 rounded-full hover:bg-purple-700 transition-colors"
            >
              Unlock
            </button>
          </div>
        </form>
      </div>
    </>
  )
}'use client'

import { useMedia } from './MediaContext'
import EditableText from './EditableText'

interface StickyNavProps {
  onCustomize: () => void
  onCoupons: () => void
  onBack?: () => void
}

export default function StickyNav({ onCustomize, onCoupons, onBack }: StickyNavProps) {
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

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Birthday coupons */}
          <button
            onClick={onCoupons}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-sm hover:bg-gray-50 transition-colors flex-shrink-0"
            aria-label="Birthday Coupons"
            title="Birthday Coupons"
          >
            🎟️
          </button>

          {/* Make it yours — only visible once logged in as admin */}
          {media.isAuthenticated && (
            <button
              onClick={onCustomize}
              className="bg-gf-purple text-white text-xs font-semibold rounded-full px-3 py-1.5 hover:bg-purple-700 transition-colors whitespace-nowrap"
            >
              Make it yours
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
