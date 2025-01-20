import { createTheme } from '@mui/material/styles';

    export const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#a9b99f',
                contrastText: '#114511',
            },
            secondary: {
                main: '#d4b057',
                contrastText: '#114511',
            },
            background: {
                default: '#00FFFFFF',
                paper: '#114511',
            },
            text: {
                primary: '#a9b99f',
                secondary: '#8fa881',
                disabled: '#adadad',
            },
            divider: '#114511',
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