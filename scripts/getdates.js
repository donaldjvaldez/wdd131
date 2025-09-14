
const yearSpan = document.querySelector("#currentyear");
const today = new Date();
yearSpan.textContent = today.getFullYear();


const lastModifiedSpan = document.querySelector("#lastModified");
lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;