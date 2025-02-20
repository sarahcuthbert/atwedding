import { Stack, Typography } from '@mui/material';

export const Home = () => {
    return (
        <Stack spacing={2} useFlexGap>
            <Typography variant="h3" mb="2rem">
                You are cordially invited to the wedding of
            </Typography>
            <Typography variant="h2" sx={{ fontStyle: 'normal' }}>
                Amy Cuthbert
            </Typography>
            <Typography variant="h4">&</Typography>
            <Typography variant="h2" sx={{ fontStyle: 'normal' }}>
                Tristan Hopper
            </Typography>
            <Typography variant="h5">on</Typography>
            <Typography variant="h4" sx={{ fontStyle: 'normal' }}>
                October 18, 2025
            </Typography>
            <Typography variant="h5">at</Typography>
            <Typography variant="h4" sx={{ fontStyle: 'normal' }}>
                Farbridge, Chichester
            </Typography>
            <Typography variant="h4" sx={{ fontStyle: 'normal' }}>
                UK
            </Typography>
        </Stack>
    );
};
