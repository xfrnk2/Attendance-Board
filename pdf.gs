function toggleShowHide(ss, r) {
    var sheets = ss.getSheets();
    var toggleSet = "hideSheet()"
    console.log("호출")
    if (r === "show") {
        console.log("show로 변환")
        toggleSet = "showSheet()"
    }
    for (var i = 0; i < sheets.length; i++) {
        if (sheets[i].getName() != "출석부") { eval("sheets[i]." + toggleSet) }
    }
}

function savePDFs(optSSId, optSheetId) {

    // If a sheet ID was provided, open that sheet, otherwise assume script is
    // sheet-bound, and open the active spreadsheet.
    var ss = (optSSId) ? SpreadsheetApp.openById(optSSId) : SpreadsheetApp.getActiveSpreadsheet();
    toggleShowHide(ss, "hide")

    // Get folder containing spreadsheet, for later export
    var parents = DriveApp.getFileById(ss.getId()).getParents();
    if (parents.hasNext()) {
        var folder = parents.next();
    }
    else {
        folder = DriveApp.getRootFolder();
    }

    //additional parameters for exporting the sheet as a pdf
    var url_ext = 'export?exportFormat=pdf&format=pdf'   //export as pdf

        // Print either the entire Spreadsheet or the specified sheet if optSheetId is provided
        + (optSheetId ? ('&gid=' + sheet.getSheetId()) : ('&id=' + ss.getId()))

        // following parameters are optional...
        + '&size=letter'      // paper size
        + '&portrait=true'    // orientation, false for landscape
        + '&fitw=true'        // fit to width, false for actual size
        + '&sheetnames=false&printtitle=false&pagenumbers=false'  //hide optional headers and footers
        + '&gridlines=false'  // hide gridlines
        + '&fzr=false';       // do not repeat row headers (frozen rows) on each page

    var options = {
        headers: {
            'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
        }
    }
    var main_sheet = ss.getSheetByName('출석부');
    var year = main_sheet.getRange("AI2").getValue();
    var month = main_sheet.getRange("AI3").getValue();
    var response = UrlFetchApp.fetch("https://docs.google.com/spreadsheets/" + url_ext, options);
    var blob = response.getBlob().setName(year + '년' + month + '월' + '.pdf');

    //from here you should be able to use and manipulate the blob to send and email or create a file per usual.
    //In this example, I save the pdf to drive
    folder = folder.getFoldersByName("지난출석부").next()
    folder.createFile(blob);

    toggleShowHide(ss, "show")
}

function PDFmacro(e) {
    savePDFs();
}