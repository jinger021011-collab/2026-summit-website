import { ArrowUp } from 'lucide-react'
import { RegistrationLink } from './RegistrationLink'

interface FloatingActionsProps {
  showRegistration: boolean
  showBackToTop: boolean
}

export function FloatingActions({ showRegistration, showBackToTop }: FloatingActionsProps) {
  return <>
    <div className={`mobile-registration${showRegistration ? ' visible' : ''}`} aria-hidden={!showRegistration}>
      <span><strong>DB × AI</strong><small>线下席位有限</small></span>
      <RegistrationLink position="mobile_sticky" tabIndex={showRegistration ? 0 : -1}>立即报名</RegistrationLink>
    </div>
    <button className={`back-to-top${showBackToTop ? ' visible' : ''}`} type="button" aria-label="返回顶部" tabIndex={showBackToTop ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp aria-hidden="true" /></button>
  </>
}
