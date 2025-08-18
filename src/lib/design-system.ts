// Design System Configuration
// Converted from CSS variables to TypeScript constants

export const colors = {
  primary: {
    deepBlue: '#0b1d3a',
    dodgerBlue: '#418dff',
  },
  neutral: {
    black1: '#222222',
    bodyText: '#333333',
    offWhiteBlue: '#f7fafc',
    babyBlueTint: '#bfdbfe',
    lightGray: '#ebebeb',
  },
  white: '#ffffff',
} as const

export const fonts = {
  dmSans: 'DM Sans, sans-serif',
  poppins: 'Poppins, sans-serif',
} as const

export const fontSizes = {
  // Desktop
  h1: '85px',
  h2: '50px',
  h3: '40px',
  h4: '30px',
  body24: '24px',
  body28: '28px',
  body20: '20px',
  // Mobile
  h1Mobile: '35px',
  h2Mobile: '28px',
  h3Mobile: '24px',
  h4Mobile: '20px',
  body16: '16px',
  body14: '14px',
  body12: '12px',
} as const

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const

export const lineHeights = {
  tight: '100',
  normal: '1.5',
} as const

// Typography classes for easy use
export const typography = {
  // Desktop Headings
  h1Regular: {
    fontSize: fontSizes.h1,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.tight,
  },
  h2Regular: {
    fontSize: fontSizes.h2,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.tight,
  },
  h2Semibold: {
    fontSize: fontSizes.h2,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
  },
  h3Regular: {
    fontSize: fontSizes.h3,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.regular,
  },
  h3Medium: {
    fontSize: fontSizes.h3,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.medium,
  },
  h4Semibold: {
    fontSize: fontSizes.h4,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.semibold,
  },
  
  // Desktop Body Text
  body20Regular: {
    fontSize: fontSizes.body20,
    fontFamily: fonts.poppins,
    fontWeight: fontWeights.regular,
  },
  body20Semibold: {
    fontSize: fontSizes.body20,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.semibold,
  },
  body24Regular: {
    fontSize: fontSizes.body24,
    fontFamily: fonts.poppins,
    fontWeight: fontWeights.regular,
  },
  body24Semibold: {
    fontSize: fontSizes.body24,
    fontFamily: fonts.poppins,
    fontWeight: fontWeights.semibold,
  },
  body28Regular: {
    fontSize: fontSizes.body28,
    fontFamily: fonts.poppins,
    fontWeight: fontWeights.regular,
  },
  
  // Mobile Headings
  h1Mobile: {
    fontSize: fontSizes.h1Mobile,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.regular,
  },
  h2Mobile: {
    fontSize: fontSizes.h2Mobile,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.regular,
  },
  h2SemiboldMobile: {
    fontSize: fontSizes.h2Mobile,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.semibold,
  },
  h3RegularMobile: {
    fontSize: fontSizes.h3Mobile,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.regular,
  },
  h3MediumMobile: {
    fontSize: fontSizes.h3Mobile,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.medium,
  },
  h3SemiboldMobile: {
    fontSize: fontSizes.h3Mobile,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.semibold,
  },
  h4SemiboldMobile: {
    fontSize: fontSizes.h4Mobile,
    fontFamily: fonts.dmSans,
    fontWeight: fontWeights.semibold,
  },
  
  // Mobile Body Text
  body16Regular: {
    fontSize: fontSizes.body16,
    fontFamily: fonts.poppins,
    fontWeight: fontWeights.regular,
  },
  body14Regular: {
    fontSize: fontSizes.body14,
    fontFamily: fonts.poppins,
    fontWeight: fontWeights.regular,
  },
  body14Medium: {
    fontSize: fontSizes.body14,
    fontFamily: fonts.poppins,
    fontWeight: fontWeights.medium,
  },
  body12Regular: {
    fontSize: fontSizes.body12,
    fontFamily: fonts.poppins,
    fontWeight: fontWeights.regular,
  },
  body12Medium: {
    fontSize: fontSizes.body12,
    fontFamily: fonts.poppins,
    fontWeight: fontWeights.medium,
  },
} as const

// Background color classes
export const backgrounds = {
  primaryDeepBlue: colors.primary.deepBlue,
  secondaryDodgerBlue: colors.primary.dodgerBlue,
  white: colors.white,
  neutralBlack1: colors.neutral.black1,
  neutralBodyText: colors.neutral.bodyText,
  neutralOffWhiteBlue: colors.neutral.offWhiteBlue,
  neutralBabyBlueTint: colors.neutral.babyBlueTint,
  neutralLightGray: colors.neutral.lightGray,
} as const

// Export everything for easy access
export type ColorKey = keyof typeof colors
export type TypographyKey = keyof typeof typography
export type BackgroundKey = keyof typeof backgrounds 