export const desktop = 1200
export const mobile = 768
export const desktopMedia = `@media screen and (min-width: ${desktop}px)`
export const notDesktopMedia = `@media screen and (max-width: ${desktop - 1}px)`
export const mobileMedia = `@media screen and (max-width: ${mobile - 1}px)`
export const notMobileMedia = `@media screen and (min-width: ${mobile}px)`
export const tabletMedia = `@media screen and (min-width: ${mobile}px) and (max-width: ${
  desktop - 1
}px)`
export const fullHDMedia = '@media screen and (min-width: 1920px)'

export const desktop4kMedia = '@media screen and (min-width: 3000px)'

export const headerChangeMediaFirst = `@media screen and (min-width: ${
  mobile + 1
}px) and (max-width: 1024px)`
export const headerChangeMediaSecond = '@media screen and (min-width: 1280px)'
