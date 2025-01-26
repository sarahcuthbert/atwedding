import {Container, Typography, Divider} from "@mui/material";

type EventSectionProps = {
    sectionTitle: string;
    children: React.ReactNode;
}
export const EventSection = ({sectionTitle, children}: EventSectionProps) => {
    return (
        <Container maxWidth="md" sx={{marginY: '0.8rem'}}>
            <Divider variant="middle" sx={{marginX: 'auto', marginY: '2rem', width: '30%', borderColor:'primary.main'}}/>
            <Typography variant="h4" mb="1rem">{sectionTitle}</Typography>
            {children}
        </Container>
    )
}