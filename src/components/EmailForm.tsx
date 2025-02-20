import {Alert, Box, Button, FormHelperText, TextField, Typography} from "@mui/material";
import {useState} from "react";

interface EmailFormProps {
    onSubmitEmail: (e: string) => Promise<boolean>,
}

export const EmailForm = ({onSubmitEmail}: EmailFormProps): React.ReactElement => {
    const [email, setEmail] = useState<string>("");
    const [isError, setIsError] = useState<boolean>();
    const [isValid, setIsValid] = useState<boolean>(true);

    const onSubmitEmailForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsError(false);
        if (!email || email.length < 3 || !email.includes('@')) {
            setIsValid(false);
            return;
        }
        const isSuccess = await onSubmitEmail(email);
        if (!isSuccess) {
            setIsError(true)
        }
    };

    return (
        <Box component="form" bgcolor="background.paper" maxWidth={500} marginX="auto" marginY="1rem" p="1rem" alignItems="center"
             display="grid"
             justifyContent="center" gap={1} onSubmit={onSubmitEmailForm}>
            <Typography variant="h4">Please enter your email address</Typography>
            <FormHelperText id="my-helper-text">This will be the email address that you received the link to the website
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
            <Button size="small" variant="contained" type="submit">Continue</Button>
            {isError && <Alert severity="error">
                Error retrieving invitee details. Please try again!
            </Alert>}
        </Box>
    );
}