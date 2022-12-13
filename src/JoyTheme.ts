import colors from '@mui/joy/colors';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

const muiTheme = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using `CssVarsProvider` from Joy UI.
  cssVarPrefix: 'joy',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.blue[900],
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: colors.purple[500],
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        info: {
          main: colors.purple[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});

const joyTheme = extendJoyTheme({
  typography: {
    body1: {
      fontSize: 'var(--joy-fontSize-sm)',
    },
  },
  colorSchemes: {
    light: {
      palette: {
        divider: '#000',
        background: {
          body: '#F4F6F6',
        },
        primary: {
          softBg: '#AEDAFA',
          softColor: '#000',
        },
      },
    },
  },
  components: {
    JoyCircularProgress: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.size === 'sm' && {
            '--CircularProgress-size': '16px',
          }),
        }),
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 0,
          border: '2px solid #000',
          boxShadow: '2px 2px #000',
          ':focus-visible': {
            outline: 'none',
          },
        }),
      },
    },
    JoyCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: '2px solid #000',
        }),
      },
    },
    JoyMenu: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 0,
          border: '2px solid #000',
          boxShadow: '1px 1px #000',
        }),
      },
    },
    JoyListDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: '#000',
          blockSize: '2px',
        }),
      },
    },
    JoyAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: '2px solid #000',
          boxShadow: '1px 1px #000',
        }),
      },
    },
    JoyListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: '2px solid #000',
          boxShadow: '2px 2px #000',
          marginBottom: '2px',
        }),
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: '2px solid #000',
          boxShadow: '4px 4px #000',
        }),
      },
    },
  },
});

// You can use your own `deepmerge` function.
// joyTheme will deeply merge to muiTheme.
export const theme = deepmerge(muiTheme, joyTheme);
