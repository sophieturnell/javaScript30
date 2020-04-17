const video = document.querySelector('.player') //streamed video
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip') // contains photos
const snap = document.querySelector('.snap') // photo audio


// ADD VIDEO TO VIDEO ELEMENT
function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false }) //retrieves video stream returning a promise
    //convert stream to url so video player can read it & play
    .then(localMediaStream => {
      console.log(localMediaStream)
      video.srcObject = localMediaStream //newer syntax than instructions
      video.play()
    })
    //incase unable to access webcam
    .catch(err => console.error('Please allow access to the webcam to allow site to work', err))
}

// TAKE FRAMES FROM VIDEO AND PAINT TO CANVAS
function paintToCanvas() {
  // MAKE CANVAS & VIDEO SIZE THE SAME
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height
  // SET TIMER
  return setInterval(() => { //"return" allows access to interval should you ever want to stop it painting
    //PAINT IMAGE/VIDEO PASSED TO CANVAS (image, x, y, width, height)
    ctx.drawImage(video, 0, 0, width, height) 
    // EXTRACT PIXEL DATA FROM CANVAS
    let pixels = ctx.getImageData(0, 0, width, height)

    // ADD RED EFFECT
    // pixels = redEffect(pixels)

    // ADD SPLIT RGBA EFFECT
    pixels = rgbaSplit(pixels)
    ctx.globalAlpha = 0.1 // adds transparency of 10%

    // ADD GREENSCREEN EFFECT
    // pixels = greenScreen(pixels)

    // ADD NEW PIXELS BACK TO CANVAS
    ctx.putImageData(pixels, 0, 0)
    // debugger
  }, 16) //runs function eveery 16 milliseconds
}

function takePhoto() {
  // ADD AUDIO
  snap.currentTime = 0
  snap.play()
  // TAKE DATA FROM CANVAS
  const data = canvas.toDataURL('image/jpeg') //takes image data from canvas
  console.log(data) // returns Base64
  const link = document.createElement('a') // create anchor link
  link.href = data // add image data to link
  link.setAttribute('download', 'HOTTIE') // adds download file name "HOTTIE"
  // link.textContent = 'Download Image' //text for element
  link.innerHTML = `<img src=${data} alt="HOTTIE" /> ` //using innerHTML, rather than textContent allows you to see the image also
  strip.insertBefore(link, strip.firstChild) // adds the link as first child in strip area
}

// PHOTO FILTERS - extract pixels from canvas, change pixels, then re-add pixels to canvas
function redEffect(pixels) {
  // Special kind of array so can't use .map
  // Pixels is not an array, "pixels.data" is the array
  for (let i = 0; i < pixels.data.length; i += 4) { //as 4 elements to each pixel, rgba
    // (doesn't matter if go over 255)
    pixels.data[i + 0] = pixels.data[i + 0] + 100 // Red
    pixels.data[i + 1] = pixels.data[i + 1] - 50 // Green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // Blue
    pixels[i + 3] // alpha
  }
  return pixels
}

function rgbaSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) { 
    // take pixels before/after and set it to be the current pixel colour
    // moving the r/g/b to thee side
    pixels.data[i - 150] = pixels.data[i + 0] // Red
    pixels.data[i + 100] = pixels.data[i + 1] // Green
    pixels.data[i - 550] = pixels.data[i + 2] // Blue
    pixels[i + 3] // alpha
  }
  return pixels
}

// TAKES ALL VALUES BETWEEN 2 COLOURS & REMOVES THEM
function greenScreen(pixels) {
  const levels = {} // holds min & max green (usually find special range of greens)

  document.querySelectorAll('.rgb input').forEach((input) => { // selects all rgb sliders
    levels[input.name] = input.value
    // e.g. rmin = selected slider value
  })
  // console.log({ levels })

  // find each element of the rgba in the array
  for (let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i + 0]
    const green = pixels.data[i + 1]
    const blue = pixels.data[i + 2]
    // const alpha = pixels.data[i + 3]

    // if the pixels are in the defined greenScreen "levels" range remove them
    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // then remove it by making the alpha value 0 (making that pixel transparent)
      pixels.data[i + 3] = 0
      console.log({ pixels })
    }
  }
  return pixels
}

getVideo()

// TO SAVE PAINTING TO CANVAS EACH TIME
video.addEventListener('canplay', paintToCanvas) //when video is playing, run function to show in canvas