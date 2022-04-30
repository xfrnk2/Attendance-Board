function doGet_moto(e) {
  var output = HtmlService.createHtmlOutputFromFile('webapp');
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  
  return output.setSandboxMode(HtmlService.SandboxMode.IFRAME);
}


function doGet(e) { 
  var output = HtmlService.createHtmlOutputFromFile('webapp');
  // output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  var z = output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  
  return z.setSandboxMode(HtmlService.SandboxMode.IFRAME);
};



function AddRecord(date, name){
  var url = ""
  var ss = SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("기록");
  webAppSheet.appendRow([new date(), date, name]);



}

