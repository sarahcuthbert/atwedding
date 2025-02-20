import {FormHelperText, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {RequestState} from "../model/RequestState.ts";
import {GenericForm} from "./GenericForm.tsx";

interface EmailFormProps {
    onSubmitEmail: (e: string) => Promise<boolean>,
}

export const EmailForm = ({onSubmitEmail}: EmailFormProps): React.ReactElement => {
    const [email, setEmail] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [requestState, setRequestState] = useState<RequestState>(RequestState.NOT_SENT);

    const onSubmitEmailForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setRequestState(RequestState.SENDING)
        if (!email || email.length < 3 || !email.includes('@')) {
            setIsValid(false);
            setRequestState(RequestState.NOT_SENT)
            return;
        }
        const isSuccess = await onSubmitEmail(email);
        if (isSuccess) {
            setRequestState(RequestState.SUCCESS)
        } else {
            setRequestState(RequestState.ERROR)
        }
    };

    return (
        <GenericForm onSubmitForm={onSubmitEmailForm}
                     requestState={requestState}
                     mainFormBody={<>
                         <Typography variant="h4">Please enter your email address</Typography>
                         <FormHelperText id="my-helper-text">This will be the email address that you received the link
                             to the website
                             on.</FormHelperText>
                         <TextField
                             id="email-input"
                             label="Email Address"
                             placeholder="Email"
                             value={email}
                             color="secondary"
                             margin="normal"
                             onChange={(e) => {
                                 setIsValid(true);
                                 setEmail(e.target.value)
                             }}
                             error={!isValid}
                             helperText={!isValid && "Please enter a valid email."}
                         />
                     </>}
                     buttonText={"Continue"}
                     errorAlertText="Error retrieving invitee details. Please try again!"
        />
    );
}