import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1A4D2E',
            contrastText: '#E8DFCA'
        },
        secondary: {
            main: '#CD5C08 ',
            contrastText: '#E8DFCA'
        },
        background: {
            default: '#F5EFE6',
            paper: '#F5EFE6'
        },
        text: {
            primary: '#1A4D2E',
            secondary: '#4F6F52',
            disabled: '#adadad'
        },
        divider: '#E8DFCA'
    },

    typography: {
        h1: {
            fontFamily: ['Fleur De Leah', 'serif'].join(',')
        },
        h2: {
            fontSize: '3rem',
            fontStyle: 'italic'
        },
        h3: {
            fontSize: '2.5rem',
            fontStyle: 'italic'
        },
        h4: {
            fontSize: '1.5rem',
            fontStyle: 'italic'
        },
        h5: {
            fontSize: '1.3rem',
            fontStyle: 'italic'
        },
        h6: {
            fontSize: '1.2rem',
            fontStyle: 'italic'
        },
        button: {
            fontSize: '1.2rem'
        },
        fontFamily: ['Sorts Mill Goudy', 'serif'].join(',')
    }
});
