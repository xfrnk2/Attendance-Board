function updateAll() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const main_sheet = sheet.getSheetByName('출석부');
    const settings_sheet = sheet.getSheetByName('설정');
    const sub_sheet = sheet.getSheetByName('기록');
    const lastRow = sub_sheet.getLastRow();
    const people_lastRow = main_sheet.getLastRow();


    for (let i = 2; i <= lastRow; i++) {
        var record_list = sub_sheet.getRange(i, 3, lastRow - 1).getValue();

        for (let j = 4; j <= 34; j++) {
            if (!main_sheet.getRange(7, j).isBlank()) {
                var range = main_sheet.getRange(7, j).getValue();
                var record = sub_sheet.getRange(i, 2, lastRow - 1).getValue();
                var targetDate = Utilities.formatDate(range, "GMT", "MM-dd-yyyy");
                var recordDate = Utilities.formatDate(record, "GMT", "MM-dd-yyyy");


                if (targetDate === recordDate) {

                    for (k = 8; k <= settings_sheet.getRange("B3").getValue() + 8 - 1; k++) {

                        if (main_sheet.getRange(k, 2).isBlank()) {
                            continue;
                        }
                        if (main_sheet.getRange(k, j).isBlank() && record_list.indexOf(main_sheet.getRange(k, 2).getValue()) > -1) {
                            {
                                console.log('출석체크');
                                main_sheet.getRange(k, j).setValue("O");

                            }
                        }
                    }
                }
            }


        }
    }


}

