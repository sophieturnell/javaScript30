// Get elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]') //data-skip useful later
const ranges = player.querySelectorAll('.player__slider')
const fullScreen = player.querySelector('#full')

// Build functions

// PLAY OR PAUSE VIDEO
function togglePlay() {
  video[video.paused ? 'play' : 'pause']()
  // OR
  // const method = video.paused ? 'play' : 'pause'
  // video[method]()
  // OR
  // if (video.paused) {
  //   video.play()
  // } else {
  //   video.pause()
  // }
}

// SWITCHES PLAY/PAUSE BUTTON SYMBOLS
function updateButton() { 
  // console.log('button pressed')
  toggle.textContent = this.paused ? '►' : '❚❚' //this is bound to video by event listener
}

// SKIP FORWARD 25secs, OR BACK 10secs
function skip() {
  // console.log(this.dataset.skip)
  video.currentTime += parseFloat(this.dataset.skip) //convert string to number
  // console.log(video.currentTime)
}

// VOLUME & PLAYBACK RATE SLIDERS
function handleRangeUpdate() {
  video[this.name] = this.value //changes target slider name to new slider value
  // console.log(this.name)
  // console.log(this.value)
}

// PROGRESS BAR
function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%` // update flex-basis of progress bar (similar to updating width)
}

// SCRUB - CLICK TO POSITION TO PLAY FROM
function scrub(e) {
  console.log(e)
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration 
  // (point clicked/bar width - to give %) * length of video
  video.currentTime = scrubTime // updates the time of video showing
}

// FULLSCREEN
function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    player.requestFullscreen()
  }
}

// Hook up event listeners==================================================================
video.addEventListener('click', togglePlay) // play/pause from clicking video
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)// auto updates progress bar as plays
toggle.addEventListener('click', togglePlay)
// Use for each if more than one item
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate))

// CREATE A FLAG VARIABLE
// Set it to false, then when you click it becomes true
let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)) // ALLOWS CLICK & DRAG OF PROGRESS BAR
// checks mousedown variable and if true runs scrub (works like an inline if statment). If mousedown is false, line will return false.
// requires e - data from event to be passed in so we know the location of the mousemove.
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

fullScreen.addEventListener('click', toggleFullScreen)
