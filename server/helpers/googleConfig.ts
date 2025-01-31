import {GoogleAuth} from "google-auth-library";
import {sheets} from '@googleapis/sheets'

export const configureSheets = () => {
    const jsonKeyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE;
    if(!jsonKeyFile) throw Error("Missing Service Account Key");
    const jwtClient = new GoogleAuth({
        credentials: {
            "client_email": process.env.GOOGLE_CLIENT_ID,
            "private_key": process.env.GOOGLE_CLIENT_KEY,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return sheets({version: 'v4', auth: jwtClient});
}