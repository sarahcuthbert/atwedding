import {
    TimelineItem,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineSeparator,
    TimelineOppositeContent
} from '@mui/lab';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

type TimelineItemProps = {
    icon: ReactNode;
    itemTitle: string;
    time: string;
};

export const ScheduleItem = ({ icon, itemTitle, time }: TimelineItemProps) => {
    return (
        <TimelineItem>
            <TimelineOppositeContent
                alignSelf="center"
                variant="h5"
                color="text.secondary"
            >
                {time}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'primary.contrast' }} />
                <TimelineDot color="primary">{icon}</TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent alignSelf="center">
                <Typography variant="h4" component="span">
                    {itemTitle}
                </Typography>
            </TimelineContent>
        </TimelineItem>
    );
};
