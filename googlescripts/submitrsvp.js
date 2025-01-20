// Function to submit RSVP (attendance)
function postRSVP(event) {
    const data = JSON.parse(event.body);
    const invitees = data.invitees;
    const sheetId = 'SHEET_ID';
    const rsvpSheetName = 'RSVPs';
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(rsvpSheetName);

    invitees.forEach(invitee => {
        const name = invitee.name.trim();
        const attending = invitee.attending;

        if (!name || attending === undefined) {
            return ContentService.createTextOutput(JSON.stringify({
                status: '400',
                message: 'Missing required fields.'
            })).setMimeType(ContentService.MimeType.JSON);
        }

        sheet.appendRow([new Date(), name, attending]);
    })

    return ContentService.createTextOutput(JSON.stringify({
        status: '200',
        message: 'RSVP successfully recorded'
    })).setMimeType(ContentService.MimeType.JSON);
}
