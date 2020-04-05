![](https://javascript30.com/images/JS3-social-share.png)

# JavaScript30
A 30 day JavaScript challenge with no jQuery, no pre-processors and no frameworks.  

## Contents
[Day 1 - JavaScript Drum Kit](#day-1---javascript-drum-kit)  
[Day 2 - CSS & JS Clock](#day-2---css-&-js-clock)  
[Day 3 - Playing with CSS Variables & JS](#day-3---playing-with-css-variables-&-js)  
[Day 4 - Array Cardio Day 1](#day-4---array-cardio-day-1)  
[Day 5 - Flex Panels Image Gallery](#day-5---flex-panels-image-gallery)  
[Day 6 - Ajax Type Ahead](#day-6---ajax-type-ahead)
[Day 7 - Array Cardio Day 2](#day-7---array-cardio-day-2)
[Day 8 - Fun with HTML5 Canvas](#day-8---fun-with-html5-canvas)
[Day 9 - 14 Must Know Dev Tools Tricks](#day-9---14-must-know-dev-tools-tricks)
[Day 10 - Hold Shift to Check Multiple Checkboxes](#day-10---hold-shift-to-check-multiple-checkboxes)
[Day 11 - Custom HTML5 Video Player](#day-11---custom-html5-video-player)
[Day 12 - Key Sequence Detection (KONAMI CODE)](#day-12---key-sequence-detection-(KONAMI-CODE))
[Day 13 - Slide in on Scroll](#day-13---slide-in-on-scroll)



## Deployment
Use the "clone or download" button and open the relevant "Starter" HTML file in your browser.


## Technologies & Methodologies Used
- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- Flexbox Layout Module


## Diary Notes

## Day 1 - JavaScript Drum Kit
I used the Document Object Model (DOM) event listeners to play audio file clips when each drum is hit. When the keys are pressed the buttons transition to grow larger and glow gold.

![](https://imgur.com/J2it9MT.jpeg)

Introduced the below:
- **`data-...` attributes** embed bespoke attributes on HTML elements. The stored (custom) data can then be used in the page's JavaScript to create a more engaging user experience (without any AJAX calls or server-side database queries).

- **`transitionend` events**  use in built `transitionend` (small 'e') and occur when a CSS transition has completed.

- **http://keycode.info/** for the number of each key.  

- **`<kbd>`** defines keyboard input.

---


## Day 2 - CSS & JS Clock
Takes the current time from JavaScript and updates the clock face hands as the time changes.

![](https://imgur.com/nfJdkqq.jpeg)

- Good practice rotating elements and using JavaScript dates rather than Moments.

- Introduced me to using the **`transition-timing-function:Cubic-bezier;`** demo in Chrome dev tools.

---


## Day 3 - Playing with CSS Variables & JS
CSS Variables allow you to update the entire app using one input point. This example includes image blur and colouring and resizing the width of the image border. 

![](https://imgur.com/jdWbd3N.jpeg)

- Introduced me to using CSS variables. Helpful as when using SASS, the preprocessor variable values become fixed values, whereas CSS allows you to change the value of variables throughout the lifecycle of your program.

- Practiced using `data-...` attributes and learnt that you can call all `data-...` attributes using **`this.datset`**.

1. Assign variables and default values to the root:

    ```css
    :root { /* Highest level - define default values for variables here */
      --base: #ffc600;
      --spacing: 10px;
      --blur: 10px;
    }
    ```

2. Add variables to styles:

    ```css
    img {
      padding: var(--spacing);
      background: var(--base);
      filter: blur(var(--blur));
    }
    ```
 
3. Access variables in JavaScript:

    ```javascript
     // SELECT ALL INPUTS ON PAGE
    const inputs = document.querySelectorAll('.controls input') //returns a node list (not an array) 

    function handleUpdate() {
      const suffix = this.dataset.sizing || '' //or nothing if there is no suffix e.g. px
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix) //updates the element with new style
    }

    // CREATES EVENT LISTENERS FOR EACH INPUT
    inputs.forEach(input => input.addEventListener('change', handleUpdate))
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate))
    ```
 
**NOTE**: In calling `.querySelector()` or `.querySelectorAll()` we receive a data structure that looks like an _Array_ but is actually a _Node List_. 
The _"listNode"_ object that we obtain (can be viewed in the console under _proto_) has a reduced API.  

To convert it to an array:
 
```javascript
const inputs = document.querySelectorAll('.controls input')
const inputsArr1 = Array.from(inputs)

//OR

const inputsArr2 = [...inputs]
```

---


## Day 4 - Array Cardio Day 1

An exercise focusing on array methods including **sort, filter, map, reduce, includes, split and Array.from**.


Console view:
![](https://imgur.com/AVAn33q.jpeg)


- I was introduced to **`console.table()`** that shows a table of the data returned.

- I added an age column to make it easier to check if my methods had been successful.

	```javascript
	inventors.forEach(obj => obj.age = obj.passed - obj.year)
	
	//OR
	
	inventors.forEach(obj => obj["age"] = obj.passed - obj.year)
	
	//OR
	
	inventors = inventor.map(p => ({ ...p, lifetime: p.passed - p.year })
	```

- I calculated a different answer for aggregate age in question 4. When I accumulate the ages mine seems correct. Am I misinterpreting the question?

- Questions 6 - 8 were more challenging.  

I found question 6 particularly helpful for familiarising myself with running code in the console. For this question I accessed the console at https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris. I used the Chrome Dev Tools to find the div/class containing the list of names and selected it below.



Q.6 _Create a list of Boulevards in Paris that contain 'de' anywhere in the name  
  https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris_

  1 - Inspect page and select dom elements. Boulevards are saved to the class `mw-category` so select this.

  ```javascript
  const category = document.querySelector('.mw-category')
  ```

  2 - Searches category list for a list of links (anchor tags).

  ```javascript
  const links = document.querySelectorAll('a')
  ```

  3 - Convert from Node List into an Array so you can map over each link and display the name (2 options below). Note that both happen from within the category.

  ```javascript
  const links = Array.from(category.querySelectorAll('a'))
    // OR - spread every item into the array (below)
  const links = [...category.querySelectorAll('a')]
  ```

  4 - Map through all of the links returning the link text for each element, then filter the Array to only display names containing "de".

  ```javascript
  const de = links
                .map(link => link.textContent)
                .filter(streetName => streetName.includes('de'))
  ```


  Refactored: 

  ```javascript
  const categoryLinks = Array.from(document.querySelectorAll('.mw-category a')) // Creates an array of anchor tags in the class in one step
    const de = categoryLinks
        .map(link => link.textContent)
        .filter(boulevardName => boulevardName.includes('de'))
  ```


I ran the below code by typing it directly into the browser console.

![](https://imgur.com/zMIot6S.jpeg)

---

## Day 5 - Flex Panels Image Gallery

An interactive image gallery using classess and transitions to update elements.

![](https://imgur.com/x4VuoPc.jpeg)

Here I used 2 events listeners:  
1. `click` to toggle the `.open` class, increasing the panel size and font size.
2. `transitionend` which runs once `.open` CSS transition has run if the event property includes `flex(-grow)`. We specifiy this as the key property we are waiting for before adding the text is the enlargement of the image panel. `transitionend` toggles `.open-active` and translates the text along the y axis into the page.

```javascript
    function toggleActive(e) {
      // console.log(e.propertyName) //shows "open" class properties
      if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active')
      }
    }
```
Ordinarily you can use `(e.propertyName === 'flex-grow')` for the if condition, but `.includes` is more explicit and helps with browser compatibility here.

Notes:
- **flex-grow**, **flex-shrink** and **flex-basis** e.g. `flex: 1 0 auto;`
- **CSS Selectors** e.g.`.panel > *:first-child` selects the first child element in the panel class. https://www.w3schools.com/cssref/css_selectors.asp
- **classLists** - toggling classes on and off https://www.w3schools.com/jsref/prop_element_classlist.asp
- **e.propertyName** - returns the CSS properties of an event.

---

## Day 6 - Ajax Type Ahead

A simple search bar using **Regular Expressions** to filter and return matching states and cities. 

![](https://imgur.com/pufmTP9.jpeg)

- Used fetch to return data from the endpoint.
- Used a Regular Expressions to match the word inputted to the data fetched.  Added variables to RegExp so that you can match whatever is input, rather than a set place. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
- `change` only fires when you submit so listen for `keyup` event.
- Googled function for adding commas to the population number. Check how it works.

---

## Day 7 - Array Cardio Day 2

Covers **`some()`, `every()`, `find()`, `findIndex()`, `splice()`, and `slice()`,** including revision of Dates and `getFullYear()`.

![](https://imgur.com/PriPLat.jpeg)

- console.log({isAdult}) -  shows name of the variable and the value so - `isadult: true`, rather than just `true` in the console.
- Deleting an item from an array using splice and slice:

```javascript
comments.splice(findCommentIndex, 1) 
```

Splice ammends original array.  
findCommentIndex is the start point, 1 is the number of elements to remove from the start point, (a third value would represent what is to be inserted).

```javascript
const newComments = [
  ...comments.slice(0, findCommentIndex),
  ...comments.slice(findCommentIndex + 1)
]
```

Slice creates a new array - here called `newComments`.  
`0` is the starting point and the array is cut off before `findCommentIndex` for the first part of the array.  
`findCommentIndex + 1` is the start point for the rest of the array, no cut off value is given.  
This extracts the `findCommentIndex` from the array.  
The Spread Operator, `...`, extracts the nested elements to display them in the `newComments` array.  

- Look at how negative starting points work in splice and slice.

---

## Day 8 - Fun with HTML5 Canvas

Creates a paint-esk canvas that draws rainbow coloured lines in oscilating pen sizes.

![](https://imgur.com/vGJ7ibg.jpeg)

- A good introduction to canvas and context. All context attributes were new to me e.g. `linejoin`, `linecap`.
- Don't draw on the canvas directly, draw on the context which can be 2d or 3d (used for video games).
- I stuggled to get the Destructuring an Array syntax to work for some reason. Commented out on line 41.
- `mouseout` - mouse moves out of the screen.
- Select hue range from mothereffing hsl https://mothereffinghsl.com/
- Look at blend modes `ctx.globalCompositeOperation = 'multiply'` - the effect when you layer your drawing.

---

## Day 9 - 14 Must Know Dev Tools Tricks

Checking out console methods including **interpolating and styling `console.log`**, and using **console. `warn`, `error`, `info`, `assert`, `dir`, `clear`, `groupCollapsed`, `groupEnd`, `count`, `time` and `table`**.
All bar `console.log` and `console.table` were new to me so this was really insightful.

![](https://imgur.com/WQ77DWB.jpeg)

- To find where javascript of an element is in your code - select the element, then below option to takes you to the line of code causing that attribute.

![](https://imgur.com/ogrppHV.jpeg)

---

## Day 10 - Hold Shift to Check Multiple Checkboxes 

A checklist allowing you to select all items between 2 selected list items.

![](https://imgur.com/11AU3no.jpeg)

- When the first box is checked it is put into a variable.
- `e.shiftKey` checks if shift key has been pressed and `this.checked` that the lastChecked box is ticked.
- If this is the case I loop through all checkboxes looking for the initial box ticked, then tick all boxes unitl I reach the most recently ticked box.
- `inBetween` is set to true when inbetween last 2 list items and currentlly not ticked or `!inBetween` when ticked to start and we want to deselect.
- Work out how to prevent unticking a box, then selecting a box with shift, checking all boxes inbetween.

---

## Day 11 - Custom HTML5 Video Player

Building video interface. My first time using video `paused`, `currentTime`, `duration`, `timeupdate` similar to `progress`. Revised `e.offsetX`and used flag variables.

![](https://imgur.com/lx1Llfl.jpeg)

Key learnings:
- `paused` is a property on video (there is not a playing property).
- Revision of `data-...` called by `this.dataset` from lesson on day 3.
- Creating flag variables:

```javascript
// SCRUB - CLICK TO POSITION TO PLAY FROM
function scrub(e) {
  console.log(e)
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration 
  // (point clicked/bar width - to give %) * length of video
  video.currentTime = scrubTime // updates the time of video showing
}

// CREATE A FLAG VARIABLE
// Set it to false, then when you click it becomes true
let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)) // ALLOWS CLICK & DRAG OF PROGRESS BAR
// checks mousedown variable and if true runs scrub (works like an inline if statment). If mousedown is false, line will return false.
// requires e - data from event to be passed in so we know the location of the mousemove.
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
```

- Added Full Screen toggle button.
- Other ideas to extend here: https://freshman.tech/custom-html5-video/ 

---

## Day 12 - Key Sequence Detection (KONAMI CODE)

The secret handshake of the internet!
https://www.howtogeek.com/659611/what-is-the-konami-code-and-how-do-you-use-it/
App displays unicorns and rainbows when secretCode is input using https://www.cornify.com/

![](https://imgur.com/9tbOAVW.jpeg)

- Helped understand negative splice arguments in array methods.

---

## Day 13 - Slide in on Scroll



## Day 14 - JS Reference VS Copy

Focus on the difference between reference and copy with primitive tyoes, arrays and objects. These are especially important when it comes to nested data.

![](https://imgur.com/UnPW0z0.jpeg)

- Refreshed: `slice()`, `concat()`, spread operator and `Array.from()`.
- New : `Object.assign()` and using deep cloning to access anything deeper than one level. https://lodash.com/docs/#cloneDeep
- Spend some time looking at https://lodash.com/ 
