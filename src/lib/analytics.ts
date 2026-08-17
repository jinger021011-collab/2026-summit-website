import type { RegistrationPosition } from '../types'

export function trackRegistrationClick(position: RegistrationPosition) {
  window.dispatchEvent(
    new CustomEvent('registration_click', {
      detail: { position },
    }),
  )
}
