import { Stack, Typography } from '@mui/material';
import logoUrl from '../assets/atcircle-dark.png';

export const Footer = () => {
    return (
        <Stack component="footer" sx={{ mb: '1rem' }}>
            <img
                src={logoUrl}
                width="40px"
                height="40px"
                alt="logo"
                style={{ alignSelf: 'center' }}
            />
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontStyle: 'italic' }}
                mt="0.5rem"
            >
                Made by the Maid of Honour
            </Typography>
        </Stack>
    );
};
