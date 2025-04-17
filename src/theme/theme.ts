// theme.ts
export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    white: string;
    grey: string;
    error: string;
    success: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: number;
  shadows: {
    small: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    medium: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  typography: {
    fontFamily: string;
    fontWeights: {
      light: "300";
      regular: "400";
      semiBold: "600";
    };
    sizes: {
      small: number;
      body: number;
      button: number;
      title: number;
      heading: number;
    };
  };
};

// theme.ts
export const theme: Theme = {
  colors: {
    primary: '#63b7af',
    secondary: '#f7d6e0',
    accent: '#f0b8b8',
    text: '#333',
    background: '#fdfafb',
    white: '#fff',
    grey: '#f0f0f0',
    error: '#ff6b6b',
    success: '#4caf50',
  },
  spacing: {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 25,
  },
  borderRadius: 8,
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 2,
    },
  },
  typography: {
    fontFamily: 'Poppins',
    fontWeights: {
      light: '300',
      regular: '400',
      semiBold: '600',
    },
    sizes: {
      small: 12,
      body: 14,
      button: 16,
      title: 18,
      heading: 22,
    },
  },
};
