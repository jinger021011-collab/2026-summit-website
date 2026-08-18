import { useState, type ImgHTMLAttributes, type ReactNode } from 'react'
import { usePageContent } from '../i18n'

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode
}

export function ImageWithFallback({ fallback, onError, ...props }: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)
  const content = usePageContent()

  if (failed) {
    return <>{fallback ?? <span className="image-fallback">{content.common.imageUnavailable}</span>}</>
  }

  return (
    <img
      {...props}
      onError={(event) => {
        setFailed(true)
        onError?.(event)
      }}
    />
  )
}
