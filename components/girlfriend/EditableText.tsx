'use client'

import { useRef, useEffect } from 'react'
import { useMedia } from './MediaContext'
import type { TextContent } from './MediaContext'

interface EditableTextProps {
  textKey: keyof TextContent
  tag?: 'p' | 'h1' | 'h2' | 'span'
  className?: string
  style?: React.CSSProperties
}

export default function EditableText({ textKey, tag: Tag = 'span', className = '', style }: EditableTextProps) {
  const { media, setText } = useMedia()
  const ref = useRef<HTMLElement>(null)
  const isAdmin = media.isAdmin
  const value = media.texts[textKey] as string

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value
    }
  }, [value])

  if (!isAdmin) {
    return <Tag className={className} style={style}>{value}</Tag>
  }

  return (
    <Tag
      ref={ref as React.RefObject<any>}
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-none cursor-text relative`}
      style={{
        ...style,
        borderBottom: '1.5px dashed rgba(124,58,237,0.5)',
        borderRadius: '2px',
      }}
      onBlur={e => setText(textKey, e.currentTarget.textContent ?? '')}
      aria-label={`Edit: ${textKey}`}
      spellCheck={false}
    >
      {value}
    </Tag>
  )
}

interface EditableBouquetReasonProps {
  index: number
  className?: string
}

export function EditableBouquetReason({ index, className = '' }: EditableBouquetReasonProps) {
  const { media, setBouquetReason } = useMedia()
  const isAdmin = media.isAdmin
  const value = media.texts.bouquetReasons[index]
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value
    }
  }, [value])

  if (!isAdmin) {
    return <span className={className}>{value}</span>
  }

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-none cursor-text`}
      style={{ borderBottom: '1.5px dashed rgba(124,58,237,0.5)' }}
      onBlur={e => setBouquetReason(index, e.currentTarget.textContent ?? '')}
      spellCheck={false}
    >
      {value}
    </span>
  )
}
