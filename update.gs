function update() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const main_sheet = sheet.getSheetByName('출석부');
    const sub_sheet = sheet.getSheetByName('기록');
    const settings_sheet = sheet.getSheetByName('설정');
    const lastRow = sub_sheet.getLastRow();
    const people_lastRow = main_sheet.getLastRow();
    var max_num = settings_sheet.getRange("B3").getValue();
    max_num = max_num * 2

    var sub_sheet_lastRow = sub_sheet.getLastRow();
    var record_list = sub_sheet.getRange(sub_sheet_lastRow, 3).getValue();
    var record = sub_sheet.getRange(sub_sheet_lastRow, 2).getValue();

    //행공수와 본수련수
    var hang_count = sub_sheet.getRange(sub_sheet_lastRow, 4).getValue();
    var bon_count = sub_sheet.getRange(sub_sheet_lastRow, 5).getValue();

    if ((!hang_count ^ !bon_count)) {
        if (hang_count == '') {
            hang_count = 0
        }
        else if (bon_count == '') {
            bon_count = 0
        }
    }



    var hang_bon = hang_count + "\n/" + bon_count
    // 있으나마나, 구글폼에서 유효성 검사 하기 때문
    // hang_bon.replace(/ /g,"")  // 공백제거

    if (sub_sheet_lastRow == 1) {
        console.log('기록이 하나도 없으므로 종료')
        return 0
    }

    for (let j = 4; j <= 34; j++) {
        if (!main_sheet.getRange(7, j).isBlank()) {
            var range = main_sheet.getRange(7, j).getValue();
            var targetDate = Utilities.formatDate(range, "GMT", "MM-dd-yyyy");
            var recordDate = Utilities.formatDate(record, "GMT", "MM-dd-yyyy");


            if (targetDate === recordDate) {

                for (k = 8; k <= max_num + 7; k += 2) {

                    if (main_sheet.getRange(k, 2).isBlank()) {
                        continue;
                    }
                    if (record_list.indexOf(main_sheet.getRange(k, 2).getValue()) > -1) {
                        console.log('출석체크');
                        var is_attended = sub_sheet.getRange(sub_sheet_lastRow, 6).getValue();

                        if (is_attended == '참여') {
                            console.log('온라인 수련에 참여하였으므로 동그라미를 기록합니다.');
                            main_sheet.getRange(k, j).setValue("O");
                        }
                        else {
                            console.log('온라인 수련에 미참여하였으므로 빈 칸이 됩니다.')
                            main_sheet.getRange(k, j).setValue("");
                        }

                        if (hang_bon != "\n/") {
                            console.log('행공과 본수련수를 기록합니다.')
                            main_sheet.getRange(k + 1, j).setFontSize(10);
                            main_sheet.getRange(k + 1, j).setValue(hang_bon);


                        }
                        else {
                            console.log('행공과 본수련수를 기록하지 않습니다.')
                        }

                    }


                }

            }
        }
    }
}




