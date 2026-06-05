window.tailwind = window.tailwind || {};

const theme = {
  colors: {
    cream: '#FFF8F0',
    softPink: '#FADADD',
    chocolate: '#6B4226',
    darkBrown: '#3A2A1A',
    white: '#FFFFFF',
    softGray: '#F8F8F8',
    lineGray: '#EEEEEE',
    black: '#111111'
  },
  typography: {
    heading: ['"Playfair Display"', 'serif'],
    body: ['Poppins', 'sans-serif'],
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    scale: {
      heroMobile: '2.5rem',
      heroTablet: '3.5rem',
      heroDesktop: '4.5rem',
      sectionMobile: '2.25rem',
      sectionDesktop: '3rem',
      body: '1rem',
      bodyLarge: '1.125rem'
    }
  },
  spacing: {
    section: '4.5rem',
    'section-lg': '7.5rem',
    containerX: '1rem',
    containerXSm: '1.5rem',
    containerXLg: '2rem'
  },
  radius: {
    large: '1rem',
    extraLarge: '1.5rem'
  },
  shadows: {
    soft: '0 18px 45px rgba(107, 66, 38, 0.12)',
    premium: '0 24px 70px rgba(58, 42, 26, 0.14)'
  },
  breakpoints: {
    mobile: '390px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px'
  }
};

const utilityLayer = {
  container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
  section: 'py-section md:py-section-lg',
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2',
  transition: 'transition-all duration-300 ease-out',
  image: 'rounded-3xl object-cover',
  primaryButton: 'rounded-full bg-chocolate px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-darkBrown focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2',
  secondaryButton: 'rounded-full border border-chocolate/30 px-6 py-3 font-semibold text-chocolate transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-chocolate focus:ring-offset-2'
};

window.loveCakeTheme = theme;
window.loveCakeUtilities = utilityLayer;

tailwind.config = {
  theme: {
    extend: {
      colors: {
        cream: theme.colors.cream,
        softPink: theme.colors.softPink,
        chocolate: theme.colors.chocolate,
        darkBrown: theme.colors.darkBrown,
        softGray: theme.colors.softGray,
        lineGray: theme.colors.lineGray
      },
      fontFamily: {
        heading: theme.typography.heading,
        body: theme.typography.body
      },
      fontSize: {
        'hero-mobile': theme.typography.scale.heroMobile,
        'hero-tablet': theme.typography.scale.heroTablet,
        'hero-desktop': theme.typography.scale.heroDesktop,
        'section-mobile': theme.typography.scale.sectionMobile,
        'section-desktop': theme.typography.scale.sectionDesktop,
        'body-lg': theme.typography.scale.bodyLarge
      },
      spacing: theme.spacing,
      borderRadius: {
        '4xl': theme.radius.extraLarge
      },
      boxShadow: {
        soft: theme.shadows.soft,
        premium: theme.shadows.premium
      },
      screens: {
        xs: theme.breakpoints.mobile
      }
    }
  }
};
