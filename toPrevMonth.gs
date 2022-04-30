function toPrevMonth() {

    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const settings_sheet = sheet.getSheetByName('설정');
    const main_sheet = sheet.getSheetByName('출석부');

    var day_range = main_sheet.getRange(6, 4, 1, 31);
    var max_num = settings_sheet.getRange("B3").getValue()
    max_num = max_num * 2

    // 전체 칸 배경을 화이트로 변경
    main_sheet.getRange('D8:AH' + (max_num + 7).toString()).setBackground("white")


    // 연이나 월이 이전으로 넘어가게 함
    var month = main_sheet.getRange("AI3").getValue();
    var bg_color = { 11: "#f6f4e9", 12: "#f6f4e9", 1: "#f6ebe9", 2: "#f6ebe9", 3: "#f6ebe9", 4: "#e9f6eb", 5: "#e9f6eb", 6: "#e9f6eb", 7: "#e9f5f6", 8: "#e9f5f6", 9: "#e9f5f6", 10: "#f6f4e9" }

    if (month === 1) {
        var year = main_sheet.getRange("AI2").getValue();
        main_sheet.getRange("AI2").setValue(year - 1);
        main_sheet.getRange("AI3").setValue(12);
    }
    else {
        main_sheet.getRange("AI3").setValue(month - 1);
    }




    // 이번달 주말칸 화이트 -> 그레이로 변경
    var cellRange = day_range.getValues();
    console.log(cellRange)

    for (i = 0; i < cellRange[0].length; i++) {
        if (!cellRange[0][i]) {
            //      console. log(i+5)
            main_sheet.getRange(8, i + 4, max_num).setBackground(bg_color[Number(month)])
        }
    }


}
