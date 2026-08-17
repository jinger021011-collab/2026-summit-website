import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import { SITE } from '../data/site'
import { trackRegistrationClick } from '../lib/analytics'
import type { RegistrationPosition } from '../types'

interface RegistrationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  position: RegistrationPosition
}

export function RegistrationLink({ position, children, ...props }: PropsWithChildren<RegistrationLinkProps>) {
  return (
    <a
      {...props}
      href={SITE.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-registration-position={position}
      onClick={(event) => {
        trackRegistrationClick(position)
        props.onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}
