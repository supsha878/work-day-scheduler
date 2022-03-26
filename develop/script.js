// declare & initialize global variables
var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var dayEvents = ["", "", "", "", "", "", "", "", ""];

init();

function init() {
    var currDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currDay);

    makeTimeBlocks();
    setPastFuture();
    getEvents();
}

function getEvents() {
    var storageEvents = JSON.parse(localStorage.getItem("events"));
    if (storageEvents) {
        dayEvents = storageEvents;
    }
    var timeBlocks = $(".container").children();
    for (i = 0; i < dayEvents.length; i++) {
        timeBlocks.eq(i).children().eq(1).val(dayEvents[i]);
    }
}

function makeTimeBlocks() {
    for (i = 0; i < workHours.length; i++) {
        
        var timeBlockEl = $("<div>");
        timeBlockEl.addClass("row");
        timeBlockEl.addClass("time-block");

        var hourEl = $("<label>");
        var hourText;
        if (workHours[i] > 12) {
            hourText = workHours[i] - 12;
        } else {
            hourText = workHours[i];
        }
        if (workHours[i] >= 12) {
            hourText += "PM";
        } else {
            hourText += "AM";
        }
        hourEl.addClass("hour");
        hourEl.text(hourText);

        var textEl = $("<textarea>");
        textEl.addClass("description");

        var buttonEl = $("<button>");
        buttonEl.addClass("saveBtn");
        buttonEl.attr("hour", workHours[i]);

        timeBlockEl.append(hourEl);
        timeBlockEl.append(textEl);
        timeBlockEl.append(buttonEl);

        $(".container").append(timeBlockEl);

    }
}

function setPastFuture() {
    var currHour = moment().format("H");
    var timeBlocks = $(".container").children();

    for (i = 0; i < timeBlocks.length; i++) {
        if (currHour == workHours[i]) {
            timeBlocks.eq(i).children().eq(1).addClass("present");
        } else if (currHour > workHours[i]) {
            timeBlocks.eq(i).children().eq(1).addClass("past");
        } else {
            timeBlocks.eq(i).children().eq(1).addClass("future");
        }
    }
}

$(".saveBtn").on("click", function(event) {
    var index = $(this).attr('hour') - 9;
    dayEvents[index] = $(this).parent().children().eq(1).val();
    localStorage.setItem("events", JSON.stringify(dayEvents));
});


// /* <div class="row time-block">
//         <label class="hour">9AM</label>
//         <textarea class="description"></textarea>
//         <button class="saveBtn"></button>
// </div> */