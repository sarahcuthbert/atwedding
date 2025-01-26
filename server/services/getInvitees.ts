import {configureSheets} from "../helpers/googleConfig";

const range = 'InvitedGuests!A2:D';

interface Invitee {
    firstName: string;
    lastName: string;
    email: string;
    secondEmail: string;
}

export const getInviteesByEmail = async (email: string): Promise<Invitee[]> => {
    const sheets = configureSheets();
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    const res = await sheets.spreadsheets.values.get({spreadsheetId, range});

    const rows = res.data.values;

    if(!rows) {
        throw Error("No data returned");
    }

    if (rows.length) {
        const guestNames = rows.map(row => {
            return {
                firstName: row[0],
                lastName: row[1],
                email: row[2],
                secondEmail: row[3]
            } as Invitee
        });
        return guestNames.filter(guest=> guest.email === email || guest.secondEmail === email);
    } else {
        return [];
    }
}