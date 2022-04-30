function setMaxNum() {
    var sheets = SpreadsheetApp.getActiveSpreadsheet();
    var main_sheet = sheets.getSheetByName('출석부');
    var settings_sheet = sheets.getSheetByName('설정');
    var prev_total_row = 0;
    var main_sheet_lastRow = main_sheet.getLastRow();
    var max_num = settings_sheet.getRange("B3").getValue();
    max_num = max_num * 2
    var month = main_sheet.getRange("AI3").getValue();

    if (max_num <= 10) {
        console.log("지정값이 10 이하이므로 스크립트를 실행하지 않습니다.")
        return
    }
    else {
        for (i = 0; i < main_sheet_lastRow; i++) {
            if (main_sheet.getRange(main_sheet_lastRow - i, 2).getValue() === "출석인원") {
                prev_total_row = main_sheet_lastRow - i;
                break
            }
        }

        if (max_num === prev_total_row - 10) {
            console.log("지정값이 기존 최대인원수 값과 같으므로 아무것도 실행하지 않습니다.")
        }
        else if (max_num < prev_total_row - 10) {
            console.log("지정값이 기존 최대인원수 값보다 작으므로 양식을 지정 값에 맞게 조정&축소 시킵니다.")
            var start = max_num + 8;
            var howManyToDelete = prev_total_row - start - 2;//How many rows to delete -    

            main_sheet.deleteRows(start, howManyToDelete);

        }
        else if (max_num > prev_total_row - 10) {

            console.log("지정값이 기존 최대인원수 값보다 크므로 양식을 지정 값에 맞게 조정&확장 시킵니다.")

            console.log('제일 먼저 전체 행 크기를 검사하여, 충분하지 않다면 확장시킵니다')
            if (!main_sheet.getRange(main_sheet_lastRow - 1, 2).isBlank()) {
                main_sheet.insertRowsAfter(main_sheet_lastRow, 1);
            }

            var ran = main_sheet.getRange("A" + prev_total_row.toString() + ":AJ" + prev_total_row.toString())
            var ran_des = main_sheet.getRange("A" + (prev_total_row + 1).toString() + ":AJ" + (prev_total_row + 1).toString())

            ran.copyTo(ran_des, { contentsOnly: false });
            ran.clearContent();
            console.log(prev_total_row);
            main_sheet.deleteRows(prev_total_row, 1);
            main_sheet.insertRows(prev_total_row - 3, max_num - (prev_total_row - 10));
            main_sheet_lastRow = main_sheet_lastRow + (max_num - (prev_total_row - 10))

            console.log(main_sheet_lastRow, "지정값이 기존 최대인원수보다 클 때 내부 변수 main_sheet_lastRow의 값을 표시합니다.")

            for (i = 0; i < main_sheet_lastRow; i++) {
                if (main_sheet.getRange(main_sheet_lastRow - i, 2).getValue() === "출석인원") {
                    ran_des = main_sheet_lastRow - i; // 재사용
                    console.log("지정값이 기존 최대인원수보다 클 때 내부 변수값을 찾는 forloop 안에 진입한 것을 확인. 변수 ran_des를 표시합니다.")
                    console.log(ran_des)
                    break
                }
            }

            main_sheet.getRange("B" + (prev_total_row - 1).toString() + ":AH" + ran_des.toString()).setBorder(null, null, null, null, null, true, '#999999', SpreadsheetApp.BorderStyle.SOLID);


            for (i = 8; i <= ran_des; i += 1) {

                if (i % 2 == 1) {
                    main_sheet.getRange("B" + i.toString() + ":AJ" + i.toString()).setBorder(null, null, true, null, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID);
                }
                else {
                    main_sheet.getRange("B" + i.toString() + ":AJ" + i.toString()).setBorder(null, null, true, null, null, null, '#b7b7b7', SpreadsheetApp.BorderStyle.SOLID);
                }

            }

            var private_sum_range = main_sheet.getRange('AJ8:AJ11')
            var copy_name_range = main_sheet.getRange('AI8:AI11')



            // var day_sum_range = main_sheet.getRange('A8:A10')
            // day_sum_range.autoFill(main_sheet.getRange('A8:A'+(ran_des-3).toString()), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES); // A8번호
            //대신하여 2씩 추가 수행


            // A8에서부터 가장 마지막 숫자까지 2칸 간격으로 순번을 부여(1씩 증가하므로 일반적인 순번임). 그리고 아랫칸을 병합시킴.
            var people_count = 1
            for (i = 8; i <= ran_des - 3; i++) {
                if (i % 2 == 0) {
                    main_sheet.getRange('A' + i.toString()).setValue(people_count);
                    people_count += 1;
                    main_sheet.setRowHeight(i, 21);
                    main_sheet.getRange('B' + i.toString() + ":C" + i.toString()).setFontColor('#000000');
                    main_sheet.getRange('D' + i.toString() + ":AH" + i.toString()).setFontWeight('bold');

                }
                else {
                    main_sheet.getRange('A' + i.toString()).setValue(' ');
                    main_sheet.getRange('B' + i.toString() + ':C' + i.toString()).mergeAcross();
                    main_sheet.setRowHeight(i, 33); // 새롭게 추가. 210814
                    main_sheet.getRange('D' + i.toString() + ":AH" + i.toString()).setFontWeight(null);

                    main_sheet.getRange('B' + i.toString()).setFontColor('#38761d');



                }
            }
            // B열 가장 처음 사람부터 C열 성명/도호 수련단계 모두를 테두리를 검정색으로 칠함.
            main_sheet.getRange('B8:C' + ran_des.toString()).setBorder(true, true, true, true, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID);
            // 합계란 성명/도호와 합계 테두리 모두 검정색으로 칠함.
            // main_sheet.getRange('AI8:AJ' + ran_des.toString()).setBorder(true, true, true, true, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID);


            //원본인데, 수정할거임. 2칸마디로.
            // 그래도 전체를 모두 드래그로 복사해줌.(출석 합계를 위해)
            private_sum_range.autoFill(main_sheet.getRange('AJ8:AJ' + (ran_des - 3).toString()), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
            //아래

            for (i = 11; i <= ran_des - 3; i += 2) {
                main_sheet.getRange('AJ9').copyTo(main_sheet.getRange('AJ' + i.toString()), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
                console.log(i, '복붙완료 ㅋ')
            }



            copy_name_range.autoFill(main_sheet.getRange('AI8:AI' + (ran_des - 3).toString()), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);





            console.log('하단의 배너의 테두리를 검정색으로 변경합니다')
            main_sheet.getRange('B' + (ran_des - 2).toString() + ':AH' + (ran_des - 1).toString()).setBorder(true, true, true, true, null, null, '#000000', SpreadsheetApp.BorderStyle.SOLID);


            for (let j = 4; j <= 34; j++) {
                var indice = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH"]
                var current_cell = main_sheet.getRange(ran_des, j)
                current_cell.setFormula('=countif(' + indice[j - 4] + '8:' + indice[j - 4] + ((ran_des - 3).toString()) + ',"O")')
            }

        }
        var main_sheet_lastRow = main_sheet.getLastRow();
        console.log(main_sheet_lastRow, "재정의된 내부 변수 main_sheet_lastRow를 표시합니다.")

        for (i = 0; i < main_sheet_lastRow; i++) {
            if (main_sheet.getRange(main_sheet_lastRow - i, 2).getValue() === "출석인원") {

                var start = main_sheet_lastRow - i + 1;

                if (main_sheet_lastRow < start) {
                    break
                }

                var howManyToDelete = main_sheet_lastRow - start + 1;
                console.log(start)
                console.log(howManyToDelete)
                main_sheet.deleteRows(start, howManyToDelete);

                break
            }
        }
        var bg_color = { 10: "#f6f4e9", 11: "#f6f4e9", 12: "#f6ebe9", 1: "#f6ebe9", 2: "#f6ebe9", 3: "#e9f6eb", 4: "#e9f6eb", 5: "#e9f6eb", 6: "#e9f5f6", 7: "#e9f5f6", 8: "#e9f5f6", 9: "#f6f4e9" }
        var day_range = main_sheet.getRange(6, 4, 1, 31);
        // 이번달 주말칸 화이트 -> 그레이로 변경
        var cellRange = day_range.getValues();
        console.log(cellRange)

        for (i = 0; i < cellRange[0].length; i++) {
            if (!cellRange[0][i]) {
                //      console. log(i+5)
                main_sheet.getRange(8, i + 4, settings_sheet.getRange("B3").getValue()).setBackground(bg_color[Number(month)])
            }
        }


    }
}
