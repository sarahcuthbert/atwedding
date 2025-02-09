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
                <Link href="https://farbridge.org.uk" variant="body1" underline="hover" sx={{fontStyle: "italic"}}>Farbridge
                    Website</Link>
            </EventSection>
            <EventSection sectionTitle="Dress Code">
                <Typography variant="body1">
                    Our dress code is cocktail attire.
                </Typography>
            </EventSection>
            <EventSection sectionTitle="Places to Stay">
                <Typography variant="body1" mb="1rem">
                    <Link href="https://www.goodwood.com/visit-eat-stay/the-goodwood-hotel/">The Goodwood Hotel</Link>
                </Typography>
                <Typography variant="body1" mb="1rem">
                    <Link href="https://www.harbourhotels.co.uk/our-hotels/sussex/harbour-hotel-chichester">The Harbour
                        Hotel</Link>
                </Typography>
                <Typography variant="body1" mb="1rem">
                    <Link href="https://www.travelodge.co.uk/uk/west-sussex/chichester/index.html">The Travelodge</Link>
                </Typography>
                <Typography variant="body2"> There is a more extensive list available on the {" "}
                    <Link href={"https://farbridge.org.uk/suppliers/accommodation/"}>Farbridge website</Link>.
                </Typography>
            </EventSection>
            <EventSection sectionTitle="Taxis">
                <Typography variant="body1">
                    Premier Cars
                </Typography>
                <Typography variant="body2" mb="1rem">
                    01243 779366
                </Typography>
                <Typography variant="body2"> There are a few more companies available on the {" "}
                    <Link href={"https://farbridge.org.uk/suppliers/transport/"}>Farbridge website</Link>.
                </Typography>
            </EventSection>
        </>
    )
}