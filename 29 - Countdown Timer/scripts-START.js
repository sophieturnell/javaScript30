let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]') // SELECTS EVERYTHING WITH A DATA-TIME ATTRIBUTE


function timer(seconds) {
  // CLEAR ANY EXISTING TIMERS - from prevously clicked buttons
  clearInterval(countdown)

  // FIND TIMES & DISPLAY
  const now = Date.now() // TIME STARTED (in milliseconds)
  const then = now + seconds * 1000 // TIME TO FINISH
  displayTimeLeft(seconds) //Shows total seconds immediately (before interval timer starts)
  displayEndTime(then) // Shows end time
  
  // COUNTDOWN & DISPLAY INTERVALS
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000) // find seconds remaining
    // need date.now are need the current now time, not the one that ran above. / 1000 as milliseconds
    if (secondsLeft < 0) { // STOP IF 0 SECONDS REMAINING
      clearInterval(countdown)
      return // if no return, will count past 0.
    }
    displayTimeLeft(secondsLeft)
  }, 1000) // Every second
}


// ENABLE START OF COUNTDOWN TIME TO SHOW
function displayTimeLeft(seconds) {
  // CALCULATE IN MINS & SECS
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  // DISPLAY ADDING 0 WHEN SECS ARE A SINGLE FIGURE
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''} ${remainderSeconds}`
  document.title = display // CHANGES TITLE!
  timerDisplay.textContent = display
}


// DEADLINE TIME
function displayEndTime(timestamp) { //timestamp = when you want to finish
  const end = new Date(timestamp) // Takes in timestamp and creates a new date object
  const hours = end.getHours()
  const adjustedHours = hours > 12 ? hours - 12 : hours
  const minutes = end.getMinutes()
  // ADD END TIME & CHANGE TO 12 HR CLOCK
  endTime.textContent = `Be back at ${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes}`
}


// USING BUTTONS TO START TIMER
function startTimerButton() {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}


// USING INPUT BOX TO START TIMER
function startTimerInput(e) {
  e.preventDefault() // submit will auto reload the page without e.preventDefault()
  const mins = this.minutes.value // (minutes is the value of the name attribute in the input)
  timer(mins * 60) // send minutes as seconds to the timer. TIMER TAKES SECONDS.
  this.reset() // CLEARS THE VALUE FROM THE INPUT BOX
}

buttons.forEach(button => button.addEventListener('click', startTimerButton))
document.customForm.addEventListener('submit', startTimerInput)