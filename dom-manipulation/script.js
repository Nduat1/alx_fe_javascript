// Array to store quotes
let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "The purpose of our lives is to be happy.", category: "Life" }
];

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a quote in the DOM
function displayQuote(quote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = quote.text + " - " + quote.category;
}

// Show a random quote
function showRandomQuote() {
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        displayQuote(randomQuote);

        // Save last viewed quote in session storage
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
    }
}

// Add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory
        };
        quotes.push(newQuote);
        saveQuotes(); // Save updated quotes to local storage
        displayQuote(newQuote); // Display the new quote
    } else {
        alert("Please enter both a quote and category.");
    }

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes = storedQuotes; // Update the global quotes array
    if (quotes.length > 0) {
        quotes.forEach(quote => displayQuote(quote)); // Display quotes in DOM
    }
}

// Load the last viewed quote from session storage
function loadLastViewedQuote() {
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
        displayQuote(lastViewedQuote);
    }
}

// Export quotes as JSON
function exportQuotes() {
    const quotesJson = JSON.stringify(quotes);
    const blob = new Blob([quotesJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();

    URL.revokeObjectURL(url); // Clean up the URL object
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes); // Add imported quotes to the array
        saveQuotes(); // Save updated quotes to local storage
        importedQuotes.forEach(quote => displayQuote(quote)); // Display new quotes
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener to show a random quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Load stored quotes and the last viewed quote when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes(); // Load from local storage
    loadLastViewedQuote(); // Load the last viewed quote from session storage
});
