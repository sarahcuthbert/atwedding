import {Container, Typography, Divider} from "@mui/material";

type EventSectionProps = {
    sectionTitle: string;
    children: React.ReactNode;
}
export const EventSection = ({sectionTitle, children}: EventSectionProps) => {
    return (
        <Container maxWidth="md" sx={{marginY: '0.8rem'}}>
            <Typography variant="h4">{sectionTitle}</Typography>
            {children}
            <Divider sx={{marginX: 'auto', marginY: '0.5rem', width: '30%'}}/>
        </Container>
    )
}