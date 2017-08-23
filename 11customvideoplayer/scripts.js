/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const full = player.querySelector('.player__full');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';  
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);  
}

function updateRange() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function videoFull() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
  else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
  else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  }
  else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else {
    console.log("Fullscreen API is not supported");
  } 
}

/* Hook up the event listners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('click', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));

progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown === true);
progress.addEventListener('mouseup', () => mousedown === false);

full.addEventListener('click', videoFull);