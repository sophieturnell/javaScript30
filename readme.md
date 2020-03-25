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

![](https://imgur.com/pufmTP9.jpeg)

- Used fetch to return data from the endpoint
- reg ex - regular expressions. Adding variables to regex.

---

## Day 7 - Array Cardio Day 2

- console.log({isAdult}) -  shows name of the variable and the value so - `isadult: true`, rather than just `true` in the console
- revise splice

---

## Day 8 - Fun with HTML5 Canvas

- Don't draw on the canvas directly, draw on the context which can be 2d or 3d (used for video games)
- all context attributes new
- array to array wouldn't work for some reason...
- mouseout = mouse out of screen
- mother effing hsl
- ctx.globalCompositeOperation = 'multiply' //effect when you layer your drawing - google 

---

## Day 9 - 14 Must Know Dev Tools Tricks


- To find where javascript of an element is in your code - select the element, then below option to take you to the line of code causing that attribute.
- image 1
- All bar console.log and console.table were new to me so really useful.
