import {google} from "googleapis";

export const configureSheets = () => {
    const jsonKeyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE;
    if(!jsonKeyFile) throw Error("Missing Service Account Key");
    const jwtClient = new google.auth.GoogleAuth({
        keyFile: jsonKeyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({version: 'v4', auth: jwtClient});
}