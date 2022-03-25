console.log("connected!")
init();

function init() {
    var currDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currDay);

    makeTimeBlocks();

    setPastFuture();
}

function makeTimeBlocks () {
    for (i = 9; i <= 17; i++) {

        // TODO simplify
        var hour;
        if (i >= 13) {
            hour = i - 12;
        } else {
            hour = i;
        }
        if (i < 12) {
            hour += "AM";
        } else {
            hour += "PM";
        }

        var timeBlockEl = $("<div>");
        timeBlockEl.addClass("row");
        timeBlockEl.addClass("time-block");
        var hourEl = $("<label>");
        hourEl.addClass("hour");
        hourEl.text(hour);
        var textEl = $("<textarea>");
        textEl.addClass("description");
        var buttonEl = $("<button>");
        buttonEl.addClass("saveBtn");

        timeBlockEl.append(hourEl);
        timeBlockEl.append(textEl);
        timeBlockEl.append(buttonEl);

        $(".container").append(timeBlockEl);
    }
}

/* <div class="row time-block">
        <label class="hour">9AM</label>
        <textarea class="description"></textarea>
        <button class="saveBtn"></button>
</div> */

function setPastFuture() {
    var currHour = moment().format("H");

    var timeBlocks = $(".container").children();

    var timeBlockHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    for (i = 0; i < timeBlocks.length; i++) {
        if (timeBlockHours[i] == currHour) {
            timeBlocks.eq(i).children().eq(1).addClass("present");
        } else if (timeBlockHours[i] < currHour) {
            timeBlocks.eq(i).children().eq(1).addClass("past");
        } else {
            timeBlocks.eq(i).children().eq(1).addClass("future");
        }
    }
}