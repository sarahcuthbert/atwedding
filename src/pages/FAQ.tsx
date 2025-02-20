import { Typography, Box, Link } from '@mui/material';
import { QuestionAndAnswer } from '../components/QuestionAndAnswer.tsx';

export const FAQ = () => {
    return (
        <>
            <Typography variant="h3">Frequently Asked Questions</Typography>
            <Box
                component="div"
                maxWidth={600}
                m={'auto'}
                p="1rem"
                alignItems="center"
            >
                <QuestionAndAnswer
                    question="What is the date and time of the wedding?"
                    answer="Our wedding will take place on Saturday October 18, 2025 at 2pm. Please arrive a slightly earlier to ensure you’re seated on time."
                    name="date-time"
                />
                <QuestionAndAnswer
                    question="Where is the ceremony and reception being held?"
                    answer="The ceremony will be held at Farbridge, Chicester and the reception will follow at the same location."
                    name="location"
                />
                <QuestionAndAnswer
                    question="Can I take photos at the wedding?"
                    answer="We would love for you to capture as many moments as you want throughout the day, but we will be having an unplugged ceremony. Our very talented photographer doesnt want to spend hours editting out phones..."
                    name="photos"
                />
                <QuestionAndAnswer
                    question="Is there a dress code or theme for the wedding?"
                    answer="Our dress code is cocktail attire. For men, this means suits or smart jackets with trousers – ties are optional. For women, dresses, jumpsuits, or similar options work well; floor-length gowns aren’t necessary. You’re welcome to choose any colour or pattern that suits your style."
                    name="dress-code"
                />
                <QuestionAndAnswer
                    question="Are children allowed at the wedding?"
                    answer="While we love your little ones, our wedding will be an adults-only celebration. Thank you for understanding!"
                    name="children"
                />
                <QuestionAndAnswer
                    question="How do I RSVP, and what is the deadline?"
                    answer={
                        <span>
                            Please RSVP by 23rd August 2025{' '}
                            <Link href="/rsvp">here</Link> using the RSVP tab of
                            this website. Let us know if you have any questions!
                        </span>
                    }
                    name="photos"
                />
                <QuestionAndAnswer
                    question="Can I bring a plus-one?"
                    answer="Plus ones are extended by invitation only. Due to space constraints, we’re keeping the guest list to invited individuals, and we appreciate your understanding. If you’re unsure, feel free to contact Amy or Tristan directly."
                    name="plus-one"
                />
                <QuestionAndAnswer
                    question="What should I do if I have dietary restrictions?"
                    answer="Please let us know of any dietary restrictions when you RSVP (there is only one option on the day)."
                    name="dietary"
                />
                <QuestionAndAnswer
                    question="Are there recommended hotels nearby?"
                    answer={
                        <span>
                            We are recommending{' '}
                            <Link href="https://www.goodwood.com/visit-eat-stay/the-goodwood-hotel/">
                                The Goodwood Hotel
                            </Link>
                            ,{' '}
                            <Link href="https://www.harbourhotels.co.uk/our-hotels/sussex/harbour-hotel-chichester">
                                The Harbour Hotel
                            </Link>{' '}
                            and{' '}
                            <Link href="https://www.travelodge.co.uk/uk/west-sussex/chichester/index.html">
                                The Travelodge
                            </Link>{' '}
                            but there is a more extensive list available on the{' '}
                            <Link
                                href={
                                    'https://farbridge.org.uk/suppliers/accommodation/'
                                }
                            >
                                Farbridge website
                            </Link>
                            .
                        </span>
                    }
                    name="hotels"
                />
                <QuestionAndAnswer
                    question="What time should I arrive at the ceremony/reception?"
                    answer="Guests should arrive by 1:45pm to ensure you’re seated and ready for the ceremony to begin promptly at 2pm"
                    name="arrival"
                />
                <QuestionAndAnswer
                    question="Will there be parking available at the venue?"
                    answer="Yes, there is plenty of parking available."
                    name="parking"
                />
                <QuestionAndAnswer
                    question="Where are you registered, and what types of gifts are preferred?"
                    answer={
                        <span>
                            Your presence is the greatest gift, but we
                            appreciate this question! We are currently working
                            on this and will update here when we have a
                            solution.{' '}
                        </span>
                    }
                    name="registry"
                />
            </Box>
        </>
    );
};
