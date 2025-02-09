import {GoogleAuth} from "google-auth-library";
import {sheets} from '@googleapis/sheets'

export const configureSheets = () => {
    const email = process.env.GOOGLE_CLIENT_ID;
    const key = process.env.GOOGLE_CLIENT_KEY?.replace(/\\n/g, '\n');
    if(!email || !key) throw Error(`Missing Service Account Key`);
    const jwtClient = new GoogleAuth({
        credentials: {
            "client_email": email,
            "private_key": key,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return sheets({version: 'v4', auth: jwtClient});
}