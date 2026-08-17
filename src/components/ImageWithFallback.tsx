import { useState, type ImgHTMLAttributes, type ReactNode } from 'react'

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode
}

export function ImageWithFallback({ fallback, onError, ...props }: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <>{fallback ?? <span className="image-fallback">图片暂不可用</span>}</>
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
