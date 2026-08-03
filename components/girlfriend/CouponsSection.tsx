'use client'

import { useMedia } from './MediaContext'
import { Coupon } from './MediaContext'
import EditableText from './EditableText'

export default function CouponsSection() {
  const { media, toggleCoupon } = useMedia()
  const coupons = media.texts.coupons

  const redeemedCount = coupons.filter(c => media.redeemedCoupons[c.id]).length
  const total = coupons.length
  const remaining = total - redeemedCount
  const progressPct = total ? Math.round((redeemedCount / total) * 100) : 0

  // Unredeemed stay on top; redeemed sink to the bottom, each group keeping its original order.
  const ordered = [...coupons].sort((a, b) => {
    const ra = media.redeemedCoupons[a.id] ? 1 : 0
    const rb = media.redeemedCoupons[b.id] ? 1 : 0
    return ra - rb
  })

  return (
    <section
      id="coupons"
      className="relative px-4 pt-10 pb-16"
      style={{ background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(244,114,182,0.18) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative max-w-md mx-auto">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-gf-pink text-white text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
            💝 <EditableText textKey="couponsBadge" tag="span" />
          </span>
        </div>

        <EditableText
          textKey="couponsTitle"
          tag="h1"
          className="text-center font-script text-gf-purple text-4xl mt-4 leading-tight block"
        />
        <EditableText
          textKey="couponsSubtitle"
          tag="p"
          className="text-center text-gf-navy/60 text-sm mt-2 block"
        />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-white rounded-2xl border border-purple-100 py-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-gf-purple">{remaining}</p>
            <p className="text-[10px] font-bold tracking-widest text-gf-navy/50 uppercase mt-1">Remaining</p>
          </div>
          <div className="bg-white rounded-2xl border border-purple-100 py-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-gf-pink">{redeemedCount}</p>
            <p className="text-[10px] font-bold tracking-widest text-gf-navy/50 uppercase mt-1">Redeemed</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-purple-100 mt-3 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-gf-navy/70">
            <span>💕 Redemption Progress</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-purple-50 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #f472b6, #7c3aed)' }}
            />
          </div>
        </div>

        {/* Coupon list */}
        <div className="flex flex-col gap-3 mt-6">
          {ordered.map(coupon => {
            const isRedeemed = !!media.redeemedCoupons[coupon.id]
            return (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                redeemed={isRedeemed}
                onToggle={() => toggleCoupon(coupon.id, !isRedeemed)}
              />
            )
          })}
        </div>

        {redeemedCount === total && total > 0 && (
          <p className="text-center text-gf-purple font-script text-2xl mt-8">
            every coupon, used with love. 🎉
          </p>
        )}
      </div>
    </section>
  )
}

function CouponCard({
  coupon,
  redeemed,
  onToggle,
}: {
  coupon: Coupon
  redeemed: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left rounded-2xl border transition-all duration-300 px-4 py-4 flex items-start gap-3 shadow-sm ${
        redeemed
          ? 'bg-purple-50/60 border-purple-100 opacity-60'
          : 'bg-white border-pink-100 hover:border-gf-pink/50 hover:shadow-md'
      }`}
    >
      {/* Checkbox */}
      <span
        className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
          redeemed ? 'bg-gf-purple border-gf-purple' : 'border-gf-pink/40'
        }`}
        aria-hidden="true"
      >
        {redeemed && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg leading-none">{coupon.emoji}</span>
          <span className={`font-bold text-sm ${redeemed ? 'line-through text-gf-navy/40' : 'text-gf-navy'}`}>
            {coupon.title}
          </span>
        </div>
        <p className="text-[10px] font-semibold tracking-widest text-gf-purple/50 uppercase mt-1">{coupon.id}</p>
        {coupon.note && (
          <p className="text-xs italic text-gf-navy/50 mt-1.5">{coupon.note}</p>
        )}
      </div>
    </button>
  )
}
