import {configureSheets} from "../helpers/googleConfig";

const range = 'RSVPs!A:E';

interface RSVPResponse {
    firstName: string,
    lastName: string,
    email: string,
    attending: boolean,
    dietary: string,
    other: string
}

export const postResponses = async (responses: RSVPResponse[]): Promise<void> => {
    const sheets = configureSheets();
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    for (const rsvp of responses) {
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[rsvp.firstName, rsvp.lastName, rsvp.email, rsvp.attending, rsvp.dietary, rsvp.other]],
            },
        });

        const rows = response.data.updates;

        if (!rows) {
            throw Error("Failed to add RSVP");
        }
    }
}