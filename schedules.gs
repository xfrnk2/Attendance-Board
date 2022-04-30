function getCalendar_sendMail() {

var sheets = SpreadsheetApp.getActiveSpreadsheet();
var schedule_sheet = sheets.getSheetByName ( '캘린더' );

var weekdays = ['(일)', '(월)', '(화)', '(수)','(목)','(금)','(토)'];
var rangeOfShownDate = 32;
var limitOfShownItems = 7;

var now = new Date();
var targetDay = new Date();
targetDay.setDate(now.getDate() + rangeOfShownDate); // in 32 days
// var events = CalendarApp.getDefaultCalendar().getEvents(now, targetDay);
var events = CalendarApp.getCalendarById('[YourGoogleCalendarId]').getEvents(now, targetDay);

// Exit script if there is no schedule.
if(events.length == 0) return "표시할 일정이 없습니다.";

// Mail contents
var mailbody = "";
var counts = 0;
//for(var cei = 0; cei < events.length; cei++){
for(var cei = 0; cei < events.length; cei++){
var ceTitle = events[cei].getTitle();
var ceStart = events[cei].getStartTime();
var ceEnd = events[cei].getEndTime();
var ceCompare = new Date();
ceCompare.setDate(ceStart.getDate() + 1);
var ceWeekday = ceStart.getDay();

var ceEvent = "";
var the_date = Utilities.formatDate(ceStart, 'Asia/Seoul', `MM/dd ${weekdays[ceWeekday]} HH:mm`);

console.log(the_date);
 
if(events[cei].isAllDayEvent() == true){

if(ceCompare < ceEnd){
 
ceEvent = ceEvent 
 + the_date + " ▷ " + ceTitle;
}else{
ceEvent = ceEvent 
 + the_date + " ▷ " + ceTitle;
}

}else{
if(ceStart.getDay() == ceEnd.getDay()){
ceEvent = ceEvent 
  + the_date + " ▷ " + ceTitle;
}else{
ceEvent = ceEvent 
  + the_date + " ▷ " + ceTitle;
}

}
if (cei === events.length - 1){
  mailbody = mailbody + ceEvent
}
else{
  mailbody = mailbody + ceEvent + "<br>";
}
counts += 1;
if (limitOfShownItems <= counts){ // show 7 items
  break
}
}


return mailbody;
}

  