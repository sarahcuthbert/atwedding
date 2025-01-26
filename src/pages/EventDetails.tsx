import {Typography, Link} from "@mui/material";
import {EventSection} from "../components/EventSection.tsx";

export const EventDetails = () => {
    return (
        <>
            <Typography variant="h3">Event Details</Typography>
            <EventSection sectionTitle="The Venue">
                <Typography variant="body1" sx={{fontWeight: "700"}}>Farbridge</Typography>
                <Typography variant="body1">West Dean</Typography>
                <Typography variant="body1">Chichester</Typography>
                <Typography variant="body1">West Sussex</Typography>
                <Typography variant="body1" mb="1rem">PO18 0JT</Typography>
                <Link href="https://farbridge.org.uk" variant="body1" underline="hover" sx={{fontStyle: "italic"}}>Farbridge Website</Link>
            </EventSection>
            <EventSection sectionTitle="Dress Code">
                <Typography variant="body1">
                    Not sure
                </Typography>
            </EventSection>
            <EventSection sectionTitle="Places to Stay">
                <Typography variant="body1">
                    X Hotel
                </Typography>
                <Typography variant="body1">
                    Y Hotel
                </Typography>
            </EventSection>
            <EventSection sectionTitle="Taxis">
                <Typography variant="body1">
                   These taxi companies
                </Typography>
            </EventSection>
        </>
    )
}