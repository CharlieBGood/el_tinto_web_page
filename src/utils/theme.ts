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
    h1: {
      fontWeight: 700,
      '@media (max-width:960px)': {
        fontSize: '32px',
      },
      '@media (min-width:960px)': {
        fontSize: '57px',
      },
      '@media (min-width:1920px)': {
        fontSize: '90px',
      }
    },
    h2: {
      fontWeight: 700,
      '@media (max-width:960px)': {
        fontSize: '30px',
      },
      '@media (min-width:960px)': {
        fontSize: '35px',
      },
      '@media (min-width:1920px)': {
        fontSize: '45px',
      }
    },
    h3: {
      fontWeight: 700,
      '@media (max-width:960px)': {
        fontSize: '22px',
      },
      '@media (min-width:960px)': {
        fontSize: '30px',
      },
      '@media (min-width:1920px)': {
        fontSize: '35px',
      }
    },
    body1: {
      '@media (max-width:960px)': {
        fontSize: '16px',
      },
      '@media (min-width:960px)': {
        fontSize: '21px',
      },
      '@media (min-width:1920px)': {
        fontSize: '26px',
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
      color: '#FFFFFF',
      '@media (max-width:960px)': {
        fontSize: '14px',
      },
      '@media (min-width:960px)': {
        fontSize: '16px',
      },
    },
    caption: {
      color: '#FFFFFF',
      '@media (max-width:960px)': {
        fontSize: '14px',
      },
      '@media (min-width:960px)': {
        fontSize: '12px',
      },
      '@media (min-width:1920px)': {
        fontSize: '12px',
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