import {Alert, Box, Button, LinearProgress} from "@mui/material";
import {FormEvent, ReactElement} from "react";
import {RequestState} from "../model/RequestState.ts";

interface GenericFormProps {
    onSubmitForm: (e: FormEvent) => void;
    requestState: RequestState;
    mainFormBody: ReactElement;
    buttonText: string;
    errorAlertText: string;
    successAlertText?: string;
}

export const GenericForm = ({
                         onSubmitForm,
                         requestState,
                         mainFormBody,
                         buttonText,
                         errorAlertText,
                         successAlertText
                     }: GenericFormProps) => {
    return (
        <Box component="form" bgcolor="background.paper" maxWidth={500} marginX="auto" marginY="1rem" p="1rem"
             alignItems="center"
             display="grid"
             justifyContent="center" gap={1} onSubmit={onSubmitForm}>
            {mainFormBody}
            {requestState !== RequestState.SUCCESS && <Button size="small" variant="contained" type="submit" sx={{marginY: "1rem"}}
                    disabled={requestState === RequestState.SENDING}>{buttonText}</Button>}
            {requestState === RequestState.SENDING && <LinearProgress/>}
            {requestState === RequestState.SUCCESS && successAlertText &&
                <Alert severity="success">{successAlertText}</Alert>}
            {requestState === RequestState.ERROR &&
                <Alert severity="error">{errorAlertText}</Alert>}
        </Box>
    )
}