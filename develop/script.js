// declare & initialize global variables
var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var dayEvents = ["", "", "", "", "", "", "", "", ""];

// initialize page
init();

function init() {
    // append current date to page
    var currDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currDay);

    makeTimeBlocks();
    setPastFuture();
    getEvents();
}

// create time blocks using HTML elements and append to .container div
function makeTimeBlocks() {
    for (i = 0; i < workHours.length; i++) {
        
        // create time block row
        var timeBlockEl = $("<div>");
        timeBlockEl.addClass("row");
        timeBlockEl.addClass("time-block");

        // create hour label
        var hourEl = $("<label>");
        hourEl.addClass("hour");
        hourEl.text(moment(workHours[i], "H").format("hA"));

        // create event textarea
        var textEl = $("<textarea>");

        // create save button with save icon
        var buttonEl = $("<button>");
        buttonEl.addClass("saveBtn");
        buttonEl.attr("hour", workHours[i]);
        var imageEl = $("<img>")
        imageEl.attr("src", "./assets/images/save-icon.png");
        imageEl.attr("alt", "save icon");
        buttonEl.append(imageEl);

        // append hour, event, and save button to time block row
        timeBlockEl.append(hourEl);
        timeBlockEl.append(textEl);
        timeBlockEl.append(buttonEl);

        // append time block row to container div
        $(".container").append(timeBlockEl);

    }
}

// retreive events array from local storage and append to page
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

// set past, present, or future classes on time blocks
function setPastFuture() {
    // retreive current hour
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

// save event typed in textarea to local storage
$(".saveBtn").on("click", function(event) {
    var index = $(this).attr('hour') - workHours.length;
    dayEvents[index] = $(this).parent().children().eq(1).val();
    localStorage.setItem("events", JSON.stringify(dayEvents));
});
