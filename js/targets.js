var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var target = document.getElementById("target1");
var timerOn = false;


var targetClicked = 0;
var misClicks = 0; 

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;  
    console.log(target.id) 
}, false);


startBtn.addEventListener("click", function(){
    resetScreen();
    timerOn = true;
    var time = 30;
    var deadline = Date.parse(new Date()) + (time*1000)
    initializeClock('clockdiv', deadline);
    stopBtn.style.display = "block";
    startBtn.style.display = "none";
    getRandomTarget()
    console.log(misClicks);
});



stopBtn.addEventListener("click", function(){
    misClicks--;
    resetScreen();
});

document.addEventListener("click", function(){
    misClicks++;
});


    
target.addEventListener("click", function(){
    targetClicked++;
    misClicks--;
    getRandomTarget();
});



function getRandomTarget(){
    var maxTargetSize = 120;
    var minTargetSize = 40;
    var margin = 100;

    var windowH = window.innerHeight;
    var windowW = window.innerWidth;
    
    target.style.left = Math.floor(Math.random() * (windowW-margin-maxTargetSize) + margin);
    target.style.top = Math.floor(Math.random() * (windowH-margin-maxTargetSize) + margin);
    var randomSize = Math.floor(Math.random() * (maxTargetSize - minTargetSize) + minTargetSize);
    target.style.width = randomSize;
    target.style.height = randomSize;
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    target.style.backgroundColor = "#" + randomColor;

}

function resetScreen(){
    document.getElementById("results").style.display = "none";
    timerOn = false;
    target.style.width = 0;
    target.style.width = 0;
    stopBtn.style.display = "none";
    startBtn.style.display = "block";
    targetClicked = 0;
    misClicks = 0;
}

function getTimeRemaining(endtime){
    const total = endtime - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
}

function getResults(){
    misClicks--;
    console.log(targetClicked);
    console.log(misClicks);

    document.getElementById("results").style.display = "block";
    var accuracyTxt = document.getElementById("accuracy");
    var targetsTxt = document.getElementById("targetsClicked");
    var missed = document.getElementById("targetsMissed");
    
    var accuracy = Math.floor(((targetClicked-misClicks)/targetClicked) * 100);
    accuracyTxt.innerHTML = "Accuracy: " + accuracy + "%";
    targetsTxt.innerHTML = "Targets Hit: " + targetClicked;
    missed.innerHTML = "Targets Missed: " + misClicks;

}

function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const timeinterval = setInterval(() => {
      const t = getTimeRemaining(endtime);
      clock.innerHTML =   t.minutes + ':' + t.seconds;
      if(timerOn){//start clicked
        if (t.total <= 0) {
            clearInterval(timeinterval);
            clock.innerHTML = "Times Up";
            //show results
            getResults();

            timerOn = false;
            target.style.width = 0;
            target.style.width = 0;
            stopBtn.style.display = "none";
            startBtn.style.display = "block";
            
        }
      }else{//stop clicked
        clearInterval(timeinterval);
        clock.innerHTML = "00:00";
      }

    },1000);
  }

