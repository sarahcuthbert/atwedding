import { Typography, Link, Divider } from '@mui/material';
import { EventSection } from '../components/EventSection.tsx';

export const EventDetails = () => {
    return (
        <>
            <Typography variant="h3">Event Details</Typography>
            <EventSection sectionTitle="The Venue">
                <Typography variant="h6" sx={{ fontStyle: 'normal' }}>
                    Farbridge
                </Typography>
                <Typography variant="body1">West Dean</Typography>
                <Typography variant="body1">Chichester</Typography>
                <Typography variant="body1">West Sussex</Typography>
                <Typography variant="body1" mb="0.5rem">
                    PO18 0JT
                </Typography>
                <Link
                    href="https://maps.app.goo.gl/ZbVbgBanzE8iCrJF8"
                    variant="body2"
                    underline="hover"
                    sx={{ fontStyle: 'italic' }}
                >
                    Google Maps
                </Link>
                <Divider
                    sx={{
                        borderColor: 'background.default',
                        marginY: '0.5rem'
                    }}
                />
                <Link
                    href="https://farbridge.org.uk"
                    variant="body1"
                    underline="hover"
                    sx={{ fontStyle: 'italic' }}
                >
                    Farbridge Website
                </Link>
            </EventSection>
            <EventSection sectionTitle="Dress Code">
                <Typography variant="body1" mb="1rem">
                    Our dress code is cocktail attire.
                </Typography>
                <Typography variant="body2">
                    For men, this means suits or smart jackets with trousers – ties are optional. For women, dresses, jumpsuits, or similar options work well; floor-length gowns aren’t necessary. You’re welcome to choose any colour or pattern that suits your style.
                </Typography>
            </EventSection>
            <EventSection sectionTitle="Places to Stay">
                <Typography variant="body2" mb="1rem">
                    On-site accommodation at Farbridge is reserved for the
                    bridal party but there are plenty of great hotels and
                    rentals nearby.
                </Typography>
                <Typography variant="body1" mb="1rem">
                    <Link href="https://www.goodwood.com/visit-eat-stay/the-goodwood-hotel/">
                        The Goodwood Hotel
                    </Link>
                </Typography>
                <Typography variant="body1" mb="1rem">
                    <Link href="https://www.harbourhotels.co.uk/our-hotels/sussex/harbour-hotel-chichester">
                        The Harbour Hotel
                    </Link>
                </Typography>
                <Typography variant="body1" mb="1rem">
                    <Link href="https://www.travelodge.co.uk/uk/west-sussex/chichester/index.html">
                        The Travelodge
                    </Link>
                </Typography>
                <Typography variant="body2">
                    {' '}
                    There is a more extensive list available on the{' '}
                    <Link
                        href={
                            'https://farbridge.org.uk/suppliers/accommodation/'
                        }
                    >
                        Farbridge website
                    </Link>
                    .
                </Typography>
            </EventSection>
            <EventSection sectionTitle="Taxis">
                <Typography variant="body1">Premier Cars</Typography>
                <Typography variant="body2" mb="1rem">
                    01243 779366
                </Typography>
                <Typography variant="body2">
                    {' '}
                    There are a few more companies available on the{' '}
                    <Link
                        href={'https://farbridge.org.uk/suppliers/transport/'}
                    >
                        Farbridge website
                    </Link>
                    .
                </Typography>
                <Divider
                    variant="middle"
                    sx={{
                        marginX: 'auto',
                        marginTop: '2rem',
                        width: '30%',
                        borderColor: 'primary.main'
                    }}
                />
            </EventSection>
        </>
    );
};
