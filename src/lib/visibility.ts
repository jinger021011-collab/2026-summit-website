interface MobileRegistrationVisibility {
  pastHero: boolean
  registerVisible: boolean
  footerVisible: boolean
}

export function shouldShowMobileRegistration({ pastHero, registerVisible, footerVisible }: MobileRegistrationVisibility) {
  return pastHero && !registerVisible && !footerVisible
}
