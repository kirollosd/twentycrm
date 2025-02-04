const grayScale = {
  gray100: '#000000',
  gray90: '#141414',
  gray85: '#171717',
  gray80: '#1b1b1b',
  gray75: '#1d1d1d',
  gray70: '#222222',
  gray65: '#292929',
  gray60: '#333333',
  gray55: '#4c4c4c',
  gray50: '#666666',
  gray45: '#818181',
  gray40: '#999999',
  gray35: '#b3b3b3',
  gray30: '#cccccc',
  gray25: '#d6d6d6',
  gray20: '#ebebeb',
  gray15: '#f1f1f1',
  gray10: '#fcfcfc',
  gray0: '#ffffff',
};

export const emailTheme = {
  font: {
    colors: {
      highlighted: grayScale.gray60,
      primary: grayScale.gray50,
      tertiary: grayScale.gray40,
      inverted: grayScale.gray0,
    },
    weight: {
      regular: 400,
      bold: 600,
    },
    size: {
      md: '13px',
      lg: '16px',
    },
  },
  background: {
    colors: { highlight: grayScale.gray15 },
    radialGradient: `radial-gradient(50% 62.62% at 50% 0%, #505050 0%, ${grayScale.gray60} 100%)`,
    radialGradientHover: `radial-gradient(76.32% 95.59% at 50% 0%, #505050 0%, ${grayScale.gray60} 100%)`,
    transparent: {
      medium: 'rgba(0, 0, 0, 0.08)',
      light: 'rgba(0, 0, 0, 0.04)',
    },
  },
};
