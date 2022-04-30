function monthlyUpdate() {
  
  PDFmacro();
  Utilities.sleep(15000);  
  sendEmails();
  Utilities.sleep(15000);  
  changeMonth();
  Utilities.sleep(15000);  
  deleteAllResponses();
}
