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
I Used DOM event listeners to play audio file clips when each drum is hit. When the key are pressed the buttons transition to grow and glow gold.

![](https://imgur.com/J2it9MT.jpeg)

### Notes, Reminders & Takeaways
**"data-..." attributes** embed bespoke data attributes on HTML elements. The stored (custom) data can then be used in the page's JavaScript to create a more engaging user experience (without any Ajax calls or server-side database queries).

**transition end events**  use inbuilt "transitionend" (small 'e') and occur when a CSS transition has completed.

**http://keycode.info/** for the number of each key.
**<kbd>** defines keyboard input



## Day 2 - CSS & JS Clock
Takes the current time from JavaScript and updates the clock face hands as the time changes.

![](https://imgur.com/nfJdkqq.jpeg)

- Good practice rotating elements and using JavaScript dates rather than Moments.
- Introduced me to using the "transition-timing-function:Cubic-bezier;" demo in Chrome dev tools. This could be very handy for animations.