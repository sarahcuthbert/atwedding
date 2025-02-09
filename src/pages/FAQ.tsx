import {Typography, Box} from "@mui/material";
import {QuestionAndAnswer} from "../components/QuestionAndAnswer.tsx";

export const FAQ = () => {
    return <>
        <Typography variant="h3">Frequently Asked Questions</Typography>
        <Box component="div" maxWidth={600} m={"auto"} p="1rem" alignItems="center">
            <QuestionAndAnswer question="What should I wear?" answer="clothes" name="clothing"/>
            <QuestionAndAnswer question="Can I have a plus one?" answer="No" name="plus-one"/>
            <QuestionAndAnswer question="When should I arrive?" answer="12:30" name="arrival-time"/>
        </Box>
    </>
}