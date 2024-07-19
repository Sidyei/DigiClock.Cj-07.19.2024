var setIntClock;
var setIntStopwatch;
var setIntTimer;
var alarm = new Audio("alarm.mp3");

$("#refresh-button").css("display", "none");

$(".btn").on("click", function() {
  var buttonClicked = $(this).attr("id");

  if(buttonClicked === "clock-button") {
    $("#clock-button").addClass("borderClicked");
    setIntClock = setInterval(myClock, 1000);
  } else {
    $("#clock-button").removeClass("borderClicked");
    clearInterval(setIntClock);
    $("#hours").empty();
    $("#minutes").empty();
    $("#seconds").empty();
  }

  if (buttonClicked === "stopwatch-button") {
    $("#stopwatch-button").addClass("borderClicked");
    $("#refresh-button").addClass("refresher");
    $("#refresh-button").css("display", "block");
    myStopwatch(setIntStopwatch);

  } else if(buttonClicked === "refresh-button") {
    clearInterval(setIntStopwatch);
    myStopwatch(setIntStopwatch);
    $("#hours").empty();
    $("#minutes").empty();
    $("#seconds").empty();
  }
   else {
    clearInterval(setIntStopwatch);
    $("#stopwatch-button").removeClass("borderClicked"); 
    $("#refresh-button").removeClass("refresher");
    $("#hours").empty();
    $("#minutes").empty();
    $("#seconds").empty();
    $("#refresh-button").css("display", "none");
  }

  if(buttonClicked === "timer-button") {
    $("#timer-button").addClass("borderClicked");
    setTimeout(myTimer,500);
  } else {
    clearInterval(setIntTimer);
    $("#timer-button").removeClass("borderClicked");
    $("#hours").empty();
    $("#minutes").empty();
    $("#seconds").empty();
    setTimeout(() => {
      alarm.stop();
    }, 100);
  }

});


function myClock() {
  var setHour = new Date().getHours();
  var setMinutes = new Date().getMinutes();
  var setSeconds = new Date().getSeconds();

    $("#hours").html(("0"+ setHour).slice(-2));
    $("#minutes").html(("0"+ setMinutes).slice(-2));
    $("#seconds").html(("0"+ setSeconds).slice(-2));
}

function myStopwatch() {
  var s = 60;
  var m = 60;
  var h = 24; 

  var countS = 1;
  var countM = 0;
  var countH = 0;

  setIntStopwatch = setInterval(() => {
    
      if (countS < s) {
        $("#seconds").html(("0"+ countS).slice(-2));
        countS++; 
      } if (countS == s) {
        countM++; 
        $("#minutes").html(("0"+ countM).slice(-2));
        countS = 0;
      } if (countM == m) {
        countH++;
        $("#hours").html(("0"+ countH).slice(-2));
        countM = 0;
      } if (countH == h) {
        countS = 0;
        countM = 0;
        countH = 0;
      } 
  }, 1000);
}

function myTimer() {
  var getSecondsInp =  prompt("[0 - 59] Enter time of Seconds");
  while(!/^[0-9]+$/.test(getSecondsInp)) {
    alert("You did not enter a number.");
    location.reload();
  } 
  if(getSecondsInp >= 0 && getSecondsInp <=59) {
    getSecondsInp;
    } else {
      alert("You did not enter within the range.");
      $("#timer-button").removeClass("borderClicked");
      return;
    }
  $("#seconds").text(("0" + getSecondsInp).slice(-2));

  var getMinutesInp = prompt("[0 - 59] Enter time of Minutes");
  while(!/^[0-9]+$/.test(getMinutesInp)) {
    alert("You did not enter a number.");
  }  if(getMinutesInp >= 0 && getMinutesInp <=59) {
    getMinutesInp;
    } else {
      alert("You did not enter within the range.");
      $("#timer-button").removeClass("borderClicked");
      return;     
    }
  $("#minutes").text(("0" + getMinutesInp).slice(-2));

  var getHoursInp = prompt("[0 - 23] Enter time of Hours");
  while(!/^[0-9]+$/.test(getHoursInp)) {
    alert("You did not enter a number.");
  }  if(getHoursInp >= 0 && getHoursInp <=23) {
     getHoursInp;
    } else {
      alert("You did not enter within the range.");
      $("#timer-button").removeClass("borderClicked");
      return;
    }
  $("#hours").text(("0" + getHoursInp).slice(-2));

  

  setIntTimer = setInterval(() => {
    if(getSecondsInp > 0) {
      getSecondsInp--;
      $("#seconds").text(("0" + getSecondsInp).slice(-2));
    } else {
      alarm.play();
    }
    if (getSecondsInp === 0 && getMinutesInp != 0) {
      getSecondsInp = 60;
      getMinutesInp--;
      $("#minutes").text(("0" + getMinutesInp).slice(-2));
      } if (getMinutesInp === 0 && getHoursInp != 0) {
        getMinutesInp = 60;
       getHoursInp--;
       $("#hours").text(("0" + getHoursInp).slice(-2));
     } 
  }, 1000);

}