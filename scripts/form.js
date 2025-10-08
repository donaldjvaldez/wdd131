const yearSpan = document.querySelector("#currentyear");
const today = new Date();
yearSpan.textContent = today.getFullYear();


const lastModifiedSpan = document.querySelector("#lastModified");
lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;

// Product array for dynamic select options
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

function populateProductOptions() {
    const select = document.getElementById('product');
    select.innerHTML = ''; // clear existing options
    // optional placeholder
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select a product';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;      // use id for the value
        option.textContent = product.name; // use name for display
        select.appendChild(option);
    });
}
// Populate product select options dynamically
// function populateProductOptions() {
//     const select = document.getElementById('product');
//     products.forEach(product => {
//         const option = document.createElement('option');
//         option.value = product.name; // value attribute is product name as per instructions
//         option.textContent = product.name;
//         select.appendChild(option);
//     });
// }

document.addEventListener('DOMContentLoaded', () => {
    populateProductOptions();
});