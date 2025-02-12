import {Typography, Tabs, Tab, Stack} from "@mui/material";
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";

const tabStyle = {
    fontSize: "1rem",
    ":hover": {fontStyle: "normal", fontSize: "1.1rem"},
    '&.Mui-selected': {
        fontSize: "1.05rem",
        fontStyle: "normal",
    }
}

export const Header = () => {
    const {pathname} = useLocation();

    const [tabValue, setTabValue] = useState(pathname || "/");

    return (
        <Stack sx={{mb: "1rem", mt: "2rem"}}>
            <Typography variant="h1">
                Amy & Tristan
            </Typography>
            <Tabs
                value={tabValue}
                onChange={(_e, newValue) => setTabValue(newValue)}
                aria-label="navigation"
                role="navigation"
                centered
                sx={{
                    marginY: "1rem",
                    fontStyle: "italic",
                    '& .MuiTabs-indicator': {
                        display: 'none'
                    },
                    '& .MuiTabs-flexContainer': {
                        flexWrap: 'wrap',
                    }
                }}
            >
                <Tab label="Home" value="/" component={Link} to="/" sx={tabStyle}/>
                <Tab label="Event Details" value="/event-details" component={Link} to="/event-details"
                     sx={tabStyle}/>
                <Tab label="Schedule" value="/schedule" component={Link} to="/schedule" sx={tabStyle}/>
                <Tab label="FAQ" value="/faq" component={Link} to="/faq" sx={tabStyle}/>
                <Tab label="RSVP" value="/rsvp" component={Link} to="/rsvp" sx={{
                    ...tabStyle,
                    color: 'secondary.main',
                    '&.Mui-selected': {
                        ...tabStyle["&.Mui-selected"],
                        color: 'secondary.main',
                    },
                }}/>
            </Tabs>
        </Stack>
    )
}