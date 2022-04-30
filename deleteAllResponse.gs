function deleteAllResponses() {
    var form, urlForm = SpreadsheetApp.getActiveSpreadsheet().getFormUrl();
    if (urlForm) {
        form = FormApp.openByUrl(urlForm);
        if (form) form.deleteAllResponses();
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const sub_sheet = sheet.getSheetByName('기록');
    const lastRow = sub_sheet.getLastRow();
    var start = 2;
    var howManyToDelete = lastRow - start + 1;//How many rows to delete -
    //The blank rows after the last row with content will not be deleted

    sub_sheet.deleteRows(start, howManyToDelete);


}

