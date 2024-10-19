let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" },
    { text: "The purpose of our lives is to be happy.", category: "Life" }
];

// Save quotes and categories to local storage
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
    const filteredQuotes = getFilteredQuotes();
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        displayQuote(randomQuote);
        
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote)); // Save to session storage
    }
}

// Add a new quote and update categories if necessary
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        displayQuote(newQuote);
        
        // Update categories dynamically
        populateCategories();
    } else {
        alert("Please enter both a quote and category.");
    }

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory); // Save filter to local storage
    showRandomQuote(); // Show a random quote based on the current filter
}

// Get filtered quotes based on the selected category
function getFilteredQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    if (selectedCategory === 'all') {
        return quotes; // Return all quotes if 'all' is selected
    } else {
        return quotes.filter(quote => quote.category === selectedCategory); // Filter quotes
    }
}

// Populate categories in the dropdown dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories
    
    // Clear existing options and repopulate
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore the last selected category from local storage
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory) {
        categoryFilter.value = storedCategory;
    }
}

// Load quotes and filter settings from local storage on page load
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes = storedQuotes;
    
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
        displayQuote(lastViewedQuote); // Display the last viewed quote from session storage
    }

    populateCategories(); // Populate categories
}

// Event listener to show a random quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Load stored quotes and categories when the page loads
document.addEventListener('DOMContentLoaded', loadQuotes);
