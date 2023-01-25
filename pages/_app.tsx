import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        fontFamily: 'Satoshi, sans-serif'
    },
    // components: {
    //     MuiCssBaseline: {
    //         styleOverrides: `
    //             @font-face {
    //                 font-family: 'Satoshi';
    //                 src: https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap
    //             }
    //         `
    //     }
    // }
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}
