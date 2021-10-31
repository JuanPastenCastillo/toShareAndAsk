const media = document.querySelector(".audioOne")
let volumeDOM = document.querySelector(".volume")
let volumeRangeDOM = document.querySelector(".volumeRange")

const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');
const showUserTimeDOM = document.querySelector(".tooltiptext")

media.removeAttribute('controls');
controls.style.visibility = 'visible';

volumeRangeDOM.addEventListener("input", () => {
 media.volume = volumeRangeDOM.value
 volumeDOM.setAttribute("data-icon", "g")
})

volumeRangeDOM.addEventListener("mouseleave", () => {
 addHiddenRemoveShow(volumeRangeDOM)
})

volumeDOM.addEventListener("mouseover", () => {
 addShowRemoveHidden(volumeRangeDOM)
})

volumeDOM.addEventListener("mouseout", () => {
  addHiddenRemoveShow(volumeRangeDOM)
 })

window.addEventListener("load", () => {
 volumeRangeDOM.value = volumeRangeDOM.max;
})

play.addEventListener('click', playPauseMedia);

function addShowRemoveHidden(elementToChange) {
 elementToChange.classList.add("show")
 elementToChange.classList.remove("hidden")
}

function addHiddenRemoveShow(elementToChange) {
 elementToChange.classList.add("hidden")
 elementToChange.classList.remove("show")
}

function stopRwdAndFwd() {
 clearInterval(intervalRwd);
 clearInterval(intervalFwd);
 rwd.classList.remove('active');
 fwd.classList.remove('active');

}

let lastValue;
function muteAndToggle() {
 if (volumeDOM.dataset.icon === "g") {
  volumeDOM.setAttribute("data-icon", "Q")
  lastValue = volumeRangeDOM.value
  volumeRangeDOM.value = 0
  media.volume = 0;
 } else {
  volumeDOM.setAttribute("data-icon", "g")
  volumeRangeDOM.value = lastValue;
  media.volume = volumeRangeDOM.value;
 }
}

volumeDOM.addEventListener("click", muteAndToggle)

function playPauseMedia() {
 stopRwdAndFwd()
 addHiddenRemoveShow(showUserTimeDOM)
 showUserTimeDOM.classList.toggle("show")
 if (media.paused) {
  play.setAttribute('data-icon', 'u');
  media.play();
 } else {
  play.setAttribute('data-icon', 'P');
  media.pause();
 }
}

stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);

function stopMedia() {
 media.pause();
 media.currentTime = 0;
 play.setAttribute('data-icon', 'P');
 stopRwdAndFwd()
 addHiddenRemoveShow(showUserTimeDOM)
}

rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

let intervalFwd;
let intervalRwd;

function mediaBackward() {
 clearInterval(intervalFwd);
 fwd.classList.remove('active');

 if (rwd.classList.contains('active')) {
  rwd.classList.remove('active');
  clearInterval(intervalRwd);
  media.play();
 } else {
  rwd.classList.add('active');
  media.pause();
  intervalRwd = setInterval(windBackward, 200);
 }
}

function mediaForward() {
 clearInterval(intervalRwd);
 rwd.classList.remove('active');

 if (fwd.classList.contains('active')) {
  fwd.classList.remove('active');
  clearInterval(intervalFwd);
  media.play();
 } else {
  fwd.classList.add('active');
  media.pause();
  intervalFwd = setInterval(windForward, 200);
 }
}

function windBackward() {
 addHiddenRemoveShow(showUserTimeDOM)
 if (media.currentTime <= 3) {
  stopMedia();
 } else {
  media.currentTime -= 3;
 }
}

function windForward() {
 addHiddenRemoveShow(showUserTimeDOM)
 if (media.currentTime >= media.duration - 3) {
  stopMedia();
 } else {
  media.currentTime += 3;
 }
}

media.addEventListener('timeupdate', setTime);
// media2.addEventListener('timeupdate', setTime);

function timeCheck(variableToUse) {
 let hours = Math.floor((variableToUse / 60) / 60)
 let minutes = Math.floor((variableToUse / 60) - hours * 60);
 let seconds = Math.floor((variableToUse - Math.floor(variableToUse / 60) * 60));

 let hourValue;
 let minuteValue;
 let secondValue;

 if (hours < 10) {
  hourValue = `0${hours}`
 } else {
  hourValue = hours
 }

 if (minutes < 10) {
  minuteValue = '0' + minutes;
 } else {
  minuteValue = minutes;
 }

 if (seconds < 10) {
  secondValue = '0' + seconds;
 } else {
  secondValue = seconds;
 }

 return `${hourValue}:${minuteValue}:${secondValue}`;
}

function setTime() {
 let barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
 timerBar.style.width = barLength + 'px';
 timer.textContent = timeCheck(media.currentTime)
}

timerWrapper.addEventListener("click", (e) => {
 stopRwdAndFwd()
 addHiddenRemoveShow(showUserTimeDOM)
 media.currentTime = (e.layerX * media.duration) / timerWrapper.clientWidth
 media.play()
 play.setAttribute('data-icon', 'u');
})

timerWrapper.addEventListener("mouseout", () => {
 addHiddenRemoveShow(showUserTimeDOM)
})

let showTheUserTime = (e) => {
 addShowRemoveHidden(showUserTimeDOM)
 let timeWatching = (e.layerX * media.duration) / timerWrapper.clientWidth;
 showUserTimeDOM.textContent = timeCheck(timeWatching)
}

timerWrapper.addEventListener("mousemove", showTheUserTime)


var birds = document.getElementsByTagName('li');

for (var i = 0;i < birds.length;i++) {
 if (birds[i].matches(':hover')) {
  console.log('The ' + birds[i].textContent + ' is endangered!');
 }
}

