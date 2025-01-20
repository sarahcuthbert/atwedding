import {Typography} from "@mui/material";
import {Timeline} from '@mui/lab';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TapasIcon from '@mui/icons-material/Tapas';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import {ScheduleItem} from "../components/ScheduleItem.tsx";

export const Schedule = () => {
    return (
        <>
            <Typography variant="h3">Schedule of Events</Typography>
            <Timeline position="alternate">
                <ScheduleItem itemTitle="Ceremony" time="2:00 pm" icon={<FavoriteBorderIcon/>}/>
                <ScheduleItem itemTitle="Drinks and Canapes" time="2:30 pm" icon={<LocalBarIcon/>}/>
                <ScheduleItem itemTitle="Wedding Breakfast" time="4:00 pm" icon={<RestaurantIcon/>}/>
                <ScheduleItem itemTitle="Dancing" time="7:00 pm" icon={<MusicNoteIcon/>}/>
                <ScheduleItem itemTitle="Late Night Snack" time="9:00 pm" icon={<TapasIcon/>}/>
                <ScheduleItem itemTitle="Home Time" time="12:00 am" icon={<BedtimeIcon/>}/>
            </Timeline>
        </>
    )
}