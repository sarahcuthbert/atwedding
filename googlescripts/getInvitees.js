// Get the invitees associated with a given email address
function getInviteeDetails(event) {
    const data = JSON.parse(event.body);
    const email = data.email.trim();
    const sheetId = 'SHEET_ID';  // ID of the Google Sheet that contains the guest list
    const invitedSheetName = 'InvitedGuests';

    const invitedGuestList = getInvitedGuestList(sheetId, invitedSheetName);

    const guests = invitedGuestList.filter(guest => guest.email === email);

    if (guests.length === 0) {
        return ContentService.createTextOutput(JSON.stringify({
            statusCode: '404',
            message: 'Invitee not found'
        })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
        status: '200',
        guests: guests
    })).setMimeType(ContentService.MimeType.JSON);
}

// Function to get the invited guest list from the Google Sheet
function getInvitedGuestList(sheetId, sheetName) {
    const sheetValues = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName)
        .getDataRange().getValues();

    return sheetValues.map(function(row) {
        return { name: row[0], email: row[1] };  // Adjust columns based on your sheet
    });
}
