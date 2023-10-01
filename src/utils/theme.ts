import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e6',
    },
    secondary: {
      main: '#fca311',
    },
  },
  typography: {
    fontFamily: '"Arial"',
    h2: {
      fontSize: '2.2rem',
      fontWeight: '700',
      '@media (max-width:768px)': {
        fontSize: '1.6rem'
      }
    },
    body1: {
      fontSize: '18px',
      '@media (max-width:768px)': {
        fontSize: '16px'
      }
    },
    body2: {
      fontSize: '18px',
      color: '#c8d4fc !important'
    },
    subtitle1: {
      fontSize: '18px',
      '@media (max-width:768px)': {
        fontSize: '18px'
      }
    },
    subtitle2: {
      fontSize: '16px',
      color: '#FFFFFF',
      '@media (max-width:768px)': {
        fontSize: '14px'
      }
    },
    overline: {
      fontSize: '24px',
      color: '#FFFFFF',
      '@media (max-width:768px)': {
        fontSize: '14px'
      }
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        subtitle1: {
          lineHeight: '150%'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: '1rem',
          padding: '12px!important',
          cursor: "text"
        },
        root: {
          borderRadius: '12px',
        },
        formControl: {
          fontSize: 'inherit'
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          ":before": {
            "border-bottom": 0
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          fontSize: '1'
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#fca311',
          textDecoration: 'none',
          "&:hover": {
            color: "#fca311",
          }
        },
      }
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            'color': '#FFF !important'
          },
          '&.Mui-checked+ .MuiSwitch-track': {
            'background-color': 'green !important',
            'opacity': '1 !important'
          }
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '16px',
          color: '#FFFFFF',
          '@media (max-width:768px)': {
            fontSize: '14px'
          }
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          borderRadius: '4px!important'
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: "#FFF"
        },
        fontSizeMedium: {
          fill: '#4f46e6'
        }
      }
    }
  }
});


export default theme;