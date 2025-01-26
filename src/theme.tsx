import { createTheme } from '@mui/material/styles';

    export const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#86341e',
                contrastText: '#d4c6a3',
            },
            secondary: {
                main: '#987F46 ',
                contrastText: '#d4c6a3',
            },
            background: {
                default: '#FFFFFF',
                paper: '#d4c6a3',
            },
            text: {
                primary: '#86341e',
                secondary: '#b7684f',
                disabled: '#adadad',
            },
            divider: '#d4c6a3',
        },

        typography: {
            h1: {
                fontFamily: [
                    "Fleur De Leah", "serif"
                ].join(','),
            },
            h2: {
                fontSize: '3rem',
                fontStyle: "italic"
            },
            h3: {
                fontSize: '2.5rem',
                fontStyle: "italic"
            },
            h4: {
                fontSize: '1.5rem',
                fontStyle: "italic"
            },
            h5: {
                fontSize: '1.3rem',
                fontStyle: "italic"
            },
            h6: {
                fontSize: '1.2rem',
                fontStyle: "italic"
            },
            button: {
                fontSize: '1.2rem'
            },
            fontFamily: [
                "Sorts Mill Goudy", "serif"
            ].join(','),
        },
    });