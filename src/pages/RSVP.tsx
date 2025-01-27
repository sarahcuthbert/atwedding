import {useState} from "react";
import {EmailForm} from "../components/EmailForm.tsx";
import {Invitee} from "../model/Invitee.ts";
import {RSVPForm} from "../components/RSVPForm.tsx";
import {RSVPResponse} from "../model/RSVPResponse.ts";


export const RSVP = () => {
    const [invitees, setInvitees] = useState<Invitee[]>([]);

    const onSubmitEmail = async (email: string) => {
        try {
            const invitees = await fetch(`api/invitees?email=${email}`);
            const data = await invitees.json();
            if(data.invitees.length < 1) {
                return false;
            }
            setInvitees(data.invitees)
            return true;
        } catch (e) {
            return false;
        }
    };

    const onSubmitRSVP = async (response: RSVPResponse[]) => {
        try {
            await fetch('api/rsvp', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"responses": response}),
            });
            return true;
        } catch (e) {
            return false;
        }
    };

    return (
        <>
            {invitees.length > 0 ?
                <RSVPForm invitees={invitees} onSubmitRSVP={onSubmitRSVP}/>
                :
                <EmailForm onSubmitEmail={onSubmitEmail}/>
            }
        </>
    );
}