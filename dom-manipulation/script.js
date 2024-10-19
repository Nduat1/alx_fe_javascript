// Array to hold quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `<p>"${quote.text}"</p><p><em>Category: ${quote.category}</em></p>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and a category!");
        return;
    }

    // Add the new quote to the array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert("Quote added successfully!");
}

// Function to create and add the form dynamically
function createAddQuoteForm() {
    // Create a form element
    const formContainer = document.getElementById('quoteFormContainer');

    // Create input for quote text
    const inputQuoteText = document.createElement('input');
    inputQuoteText.setAttribute('id', 'newQuoteText');
    inputQuoteText.setAttribute('type', 'text');
    inputQuoteText.setAttribute('placeholder', 'Enter a new quote');
    
    // Create input for quote category
    const inputQuoteCategory = document.createElement('input');
    inputQuoteCategory.setAttribute('id', 'newQuoteCategory');
    inputQuoteCategory.setAttribute('type', 'text');
    inputQuoteCategory.setAttribute('placeholder', 'Enter quote category');
    
    // Create a button to add the new quote
    const addButton = document.createElement('button');
    addButton.setAttribute('id', 'addQuoteBtn');
    addButton.textContent = 'Add Quote';

    // Append input fields and button to form container
    formContainer.appendChild(inputQuoteText);
    formContainer.appendChild(inputQuoteCategory);
    formContainer.appendChild(addButton);

    // Add event listener to the button to trigger quote addition
    addButton.addEventListener('click', addQuote);
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Create the Add Quote Form when the page loads
document.addEventListener('DOMContentLoaded', createAddQuoteForm);
