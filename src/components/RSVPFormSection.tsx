import {
    Divider,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material';
import { Invitee } from '../model/Invitee.ts';

interface RSVPFormSectionProps {
    invitee: Invitee;
    index: number;
    attending: boolean;
    setAttending: (attending: boolean, key: number) => void;
    dietary: string;
    setDietary: (dietary: string, key: number) => void;
    other: string;
    setOther: (other: string, key: number) => void;
}

export const RSVPFormSection = ({
    invitee,
    attending,
    setAttending,
    dietary,
    setDietary,
    other,
    setOther,
    index
}: RSVPFormSectionProps) => {
    return (
        <>
            {index > 0 && (
                <Divider
                    sx={{ borderColor: 'primary.main', marginY: '1.2rem' }}
                />
            )}
            <Typography variant="h4" marginY="0.5rem">
                RSVP details for {invitee.firstName + ' ' + invitee.lastName}
            </Typography>
            <FormLabel
                id="attending-label"
                sx={{ fontSize: '1.1rem', marginTop: '1.2rem' }}
            >
                Attending?
            </FormLabel>
            <RadioGroup
                row
                id="attending-input"
                aria-labelledby="attending-label"
                value={attending ? 'Yes' : 'No'}
                color={'secondary'}
                sx={{ justifySelf: 'center' }}
                onChange={(e) => setAttending(e.target.value === 'Yes', index)}
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
            <FormLabel
                id="dietary-label"
                sx={{ fontSize: '1.1rem', marginTop: '1.2rem' }}
            >
                Any Dietary Requirements?
            </FormLabel>
            <TextField
                id="dietary-input"
                aria-labelledby="dietary-label"
                label={'Preferences and Allergens'}
                placeholder="e.g. Nut free, Vegetarian"
                value={dietary}
                color={'secondary'}
                margin="dense"
                onChange={(e) => setDietary(e.target.value, index)}
            />
            <FormLabel
                id="dietary-label"
                sx={{ fontSize: '1.1rem', marginTop: '1rem' }}
            >
                Anything else we should be aware of?
            </FormLabel>
            <TextField
                id="other-input"
                aria-labelledby="other-label"
                label={'Other'}
                value={other}
                color={'secondary'}
                margin="dense"
                onChange={(e) => setOther(e.target.value, index)}
            />
        </>
    );
};
