import {Invitee} from "../model/Invitee.ts";
import {RSVPResponse} from "../model/RSVPResponse.ts";
import {useState} from "react";
import {RSVPFormSection} from "./RSVPFormSection.tsx";
import {GenericForm} from "./GenericForm.tsx";
import { RequestState } from "../model/RequestState.ts";

interface RSVPFormProps {
    invitees: Invitee[];
    onSubmitRSVP: (responses: RSVPResponse[]) => Promise<boolean>,
}

export const RSVPForm = ({invitees, onSubmitRSVP}: RSVPFormProps) => {
    const [attendings, setAttendings] = useState<boolean[]>(new Array(invitees.length).fill(true));
    const [dietarys, setDietarys] = useState<string[]>(new Array(invitees.length).fill(""));
    const [others, setOthers] = useState<string[]>(new Array(invitees.length).fill(""));
    const [requestState, setRequestState] = useState<RequestState>(RequestState.NOT_SENT);

    const onSubmitRSVPForm = async (e: React.FormEvent) => {
        e.preventDefault();
        setRequestState(RequestState.SENDING)
        const responses = invitees.map((invitee, index) => {
            return {
                firstName: invitee.firstName,
                lastName: invitee.lastName,
                email: invitee.email,
                attending: attendings[index],
                dietary: dietarys[index],
                other: others[index]
            }
        })
        const isSuccess = await onSubmitRSVP(responses);
        if (isSuccess) {
            setRequestState(RequestState.SUCCESS)
        } else {
            setRequestState(RequestState.ERROR)
        }
    };

    const setAttending = (value: boolean, key: number) => {
        const newAttendings = attendings.map((attending, index) => {
            if (index === key) {
                return value
            }
            return attending
        })
        setAttendings(newAttendings)
    }

    const setDietary = (value: string, key: number) => {
        const newDietarys = dietarys.map((dietary, index) => {
            if (index === key) {
                return value
            }
            return dietary
        })
        setDietarys(newDietarys)
    }

    const setOther = (value: string, key: number) => {
        const newOthers = others.map((other, index) => {
            if (index === key) {
                return value
            }
            return other
        })
        setOthers(newOthers)
    }

    return (
        <GenericForm onSubmitForm={onSubmitRSVPForm}
                     requestState={requestState}
                     mainFormBody={<>
                         {requestState !== RequestState.SUCCESS && invitees.map((invitee, index) => (
                             <RSVPFormSection invitee={invitee} key={index} index={index}
                                              attending={attendings[index]} setAttending={setAttending}
                                              dietary={dietarys[index]} setDietary={setDietary}
                                              other={others[index]} setOther={setOther}/>
                         ))}</>}
                     buttonText={"Submit"}
                     errorAlertText="Error submitting RSVP. Please try again!"
                     successAlertText="RSVP successfully recorded!"/>
    )
}