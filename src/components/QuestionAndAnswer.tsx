import {Accordion, AccordionSummary, Typography, AccordionDetails} from "@mui/material"
import {ExpandMore} from '@mui/icons-material';

interface QuestionAndAnswerProps {
    question: string;
    answer: string;
    name: string;
}

export const QuestionAndAnswer = ({question, answer, name}: QuestionAndAnswerProps) => {
    return (
        <Accordion >
            <AccordionSummary
                expandIcon={<ExpandMore color="primary"/>}
                aria-controls={`${name}-content`}
                id={name}
            >
                <Typography variant="h6" component="span">{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {answer}
            </AccordionDetails>
        </Accordion>
    )
}