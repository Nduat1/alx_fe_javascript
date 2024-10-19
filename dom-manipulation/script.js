const mockApiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Simulated API for syncing

// Fetch quotes from the "server"
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(mockApiUrl);
        const serverQuotes = await response.json();

        // Simulate converting fetched data into quote format
        const newServerQuotes = serverQuotes.map(post => ({
            text: post.title,
            category: "Server"
        }));

        return newServerQuotes;
    } catch (error) {
        console.error("Error fetching from server:", error);
        return [];
    }
}

// Post the new quote to the "server"
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(mockApiUrl, {
            method: 'POST',
            body: JSON.stringify({
                title: quote.text,
                body: quote.category,
                userId: 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        notifyUser(`Quote synced with server: "${data.title}"`);
    } catch (error) {
        console.error("Error posting to server:", error);
        notifyUser("Failed to sync quote with server.");
    }
}

// Sync quotes by fetching new ones and resolving conflicts
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();

    // Resolve conflicts by merging server and local quotes
    const updatedQuotes = mergeQuotes(serverQuotes, quotes);

    quotes = updatedQuotes;
    saveQuotes(); // Persist the updated quotes locally
    populateCategories(); // Refresh categories if any new ones were added
    showRandomQuote(); // Optionally, display a new quote
}

// Merge server quotes with local quotes, resolving conflicts (server data takes precedence)
function mergeQuotes(serverQuotes, localQuotes) {
    const localQuoteTexts = localQuotes.map(quote => quote.text); // Track local quote texts

    const mergedQuotes = [...localQuotes];
    serverQuotes.forEach(serverQuote => {
        if (!localQuoteTexts.includes(serverQuote.text)) {
            mergedQuotes.push(serverQuote);
            notifyUser(`New quote added from server: "${serverQuote.text}"`);
        }
    });

    return mergedQuotes;
}

// Notify users of conflicts or updates
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.classList.add('notification');
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add a new quote and sync it with the server
async function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        displayQuote(newQuote); // Display the newly added quote

        await postQuoteToServer(newQuote); // Sync with server after adding the quote
        populateCategories(); // Refresh categories
    } else {
        alert("Please enter both a quote and category.");
    }

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}

// Load existing quotes from local storage and sync with the server on page load
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    syncQuotes(); // Sync with the server when the page loads
});

// Periodically sync quotes every 30 seconds
setInterval(syncQuotes, 30000);
