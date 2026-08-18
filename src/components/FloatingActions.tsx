import { ArrowUp } from 'lucide-react'
import { usePageContent } from '../i18n'
import { RegistrationLink } from './RegistrationLink'

interface FloatingActionsProps {
  showRegistration: boolean
  showBackToTop: boolean
}

export function FloatingActions({ showRegistration, showBackToTop }: FloatingActionsProps) {
  const content = usePageContent()
  return <>
    <div className={`mobile-registration${showRegistration ? ' visible' : ''}`} aria-hidden={!showRegistration}>
      <span><strong>DB × AI</strong><small>{content.register.mobileSupporting}</small></span>
      <RegistrationLink position="mobile_sticky" tabIndex={showRegistration ? 0 : -1}>{content.common.register}</RegistrationLink>
    </div>
    <button className={`back-to-top${showBackToTop ? ' visible' : ''}`} type="button" aria-label={content.common.backToTop} tabIndex={showBackToTop ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp aria-hidden="true" /></button>
  </>
}
