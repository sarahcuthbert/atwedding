import {Typography} from "@mui/material";
import {Menu} from "../components/Menu.tsx";
import {EventSection} from "../components/EventSection.tsx";

export const EventDetails = () => {
    return (
        <>
            <Typography variant="h3">Event Details</Typography>
            <EventSection sectionTitle="The Venue">
                <Typography variant="body1">
                    XXX
                </Typography>
            </EventSection>
            <EventSection sectionTitle="The Menu">
                <Menu/>
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
            <EventSection sectionTitle="Guest Photos">
                <Typography variant="body1">
                   A link to share photos taken by guests on the day.
                </Typography>
            </EventSection>
        </>
    )
}