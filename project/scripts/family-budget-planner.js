const yearSpan = document.querySelector("#currentyear");
const today = new Date();
yearSpan.textContent = today.getFullYear();


const lastModifiedSpan = document.querySelector("#lastModified");
lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

// Add a click event listender to the hamburger button and use a callback function that toggles the list element's list of classes.
hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});