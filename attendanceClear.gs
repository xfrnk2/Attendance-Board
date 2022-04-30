function attendanceClear() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet ();
  const settings_sheet = sheet.getSheetByName ( '설정' );
  const main_sheet = sheet.getSheetByName ( '출석부' );
  var max_num = settings_sheet.getRange("B3").getValue()
  max_num = max_num * 2
  main_sheet.getRange('D8:AH'+(max_num+7).toString()).clearContent();
console.log(max_num+7)
}
