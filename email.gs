function sendEmails() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var main_sheet = ss.getSheetByName('출석부');
    var settings_sheet = ss.getSheetByName('설정');
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var startRow = 2;  // First row of data to process
    var numRows = 8;   // Number of rows to process
    var dataRange = sheet.getRange(startRow, 1, numRows, 2)
    var emailAddress = settings_sheet.getRange("B10").getValue();

    if (emailAddress === "") {
        console.log("아무것도 하지 않고 종료")
        return
    }

    console.log("메일 전송작업 진행")
    var year = main_sheet.getRange("AI2").getValue();
    var month = main_sheet.getRange("AI3").getValue();
    var file = DriveApp.getFilesByName(year + '년' + month + '월' + '.pdf')


    // email에 넣을 제목을 입력하세요.
    var subject = (year + "년 " + month + "월 " + "출석부 자동전송 메일입니다.");
    var message = ". ";
    MailApp.sendEmail(emailAddress, subject, message,
        { attachments: file.next().getBlob() }
    );
}
