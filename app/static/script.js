var h1 = document.getElementsByTagName('h2')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    time = document.getElementById('time'),
    seconds = 0, minutes = 0, hours = 0,
    t = undefined;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    let hh = (hours ? (hours > 9 ? hours : "0" + hours) : "00");
    let mm = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00");
    let ss = (seconds > 9 ? seconds : "0" + seconds);

    h1.textContent = hh  + ":" + mm + ":" + ss;

}

function timer() {
    if (t == undefined){
        t = setInterval(add, 1000);
    }   
}


/* Start button */
start.onclick = timer;


/* Get the time list from db and load it to the select tag element*/
function loadTimeList(){
    fetch('/api/timelist')
  .then(response => response.json())
  .then(data => {
    let timesobj = document.getElementById('times');
    while (timesobj.firstChild) {
        timesobj.removeChild(timesobj.firstChild);
    }

    return data;
  })
  .then(data => {
    let times = data.timelist;
    let timesobj = document.getElementById('times');
    timesobj.size = times.length + 1;
    for(let time of times){
        let option = document.createElement('option');
        option.textContent = time.elapsed_time;
        timesobj.append(option);

      }
  });
}

function saveTime(){
    let formData = new FormData();
    formData.append('time', time.value);

    fetch("/api/savetime",
        {
            body: formData,
            method: "post"
        }).then(() => loadTimeList());
}


/* Stop button */
stop.onclick = function() {
    time.value = h1.textContent;
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    clearTimeout(t);
    t = undefined;
    saveTime();
}