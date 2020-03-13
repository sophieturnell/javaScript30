![](https://javascript30.com/images/JS3-social-share.png)

# JavaScript30
A 30 day JavaScript challenge with no jQuery, no pre-processors and no frameworks.  


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



## Day 2 - CSS & JS Clock
Takes the current time from JavaScript and updates the clock face hands as the time changes.

![](https://imgur.com/nfJdkqq.jpeg)

- Good practice rotating elements and using JavaScript dates rather than Moments.

- Introduced me to using the **`transition-timing-function:Cubic-bezier;`** demo in Chrome dev tools.



## Day 3 - Playing with CSS Variables and JS
CSS Variables allow you to update the entire app using one input point. This example includes image blur and colouring and resizing the width of the image border. 

![](https://imgur.com/jdWbd3N.jpeg)

- Introduced me to using CSS variables. Helpful as when using SASS, the preprocessor variable values become fixed values, whereas CSS allows you to change the value of variables throughout the lifecycle of your program.
- Practiced using `data-...` attributes and learnt that you can call all `data-...` attributes using `this.datset`.

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
     // Select all inputs on page
    const inputs = document.querySelectorAll('.controls input') //returns a node list (not an array) 

    function handleUpdate() {
      const suffix = this.dataset.sizing || '' //or nothing if there is no suffix e.g. px
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix) //updates the element with new style
    }

    // Creates event listeners for each input
    inputs.forEach(input => input.addEventListener('change', handleUpdate))
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate))
    ```
 
**NOTE**: In calling `.querySelector()` or `.querySelectorAll()` we recieve a data structure that looks like an `array` but is actually a `node list`. 
The `listNode` object that we obtain (can be viewed in the console under proto) has a reduced API.  

To convert it to an array:
 
```javascript
const inputs = document.querySelectorAll('.controls input')
const inputsArr1 = Array.from(inputs)
//OR
const inputsArr2 = [...inputs]
```




