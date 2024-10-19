
const mockApiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API for simulating server

// Fetch quotes from the "server"
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(mockApiUrl);
        const serverQuotes = await response.json();

        // Simulate converting fetched data into quote format (for example purposes)
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

// Sync data with server and handle conflicts
async function syncWithServer() {
    const serverQuotes = await fetchQuotesFromServer();

    // Simple conflict resolution: Server data takes precedence
    const combinedQuotes = mergeQuotes(serverQuotes, quotes);

    quotes = combinedQuotes;
    saveQuotes();
    populateCategories();
    showRandomQuote();
}

// Merge server quotes with local quotes
function mergeQuotes(serverQuotes, localQuotes) {
    const quoteTexts = localQuotes.map(quote => quote.text); // Local quote texts

    // Add server quotes that don't exist in local quotes
    const mergedQuotes = [...localQuotes];
    serverQuotes.forEach(serverQuote => {
        if (!quoteTexts.includes(serverQuote.text)) {
            mergedQuotes.push(serverQuote);
            notifyUser(`New quote added from server: "${serverQuote.text}"`);
        }
    });

    return mergedQuotes;
}

// Notify user about updates or conflicts
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

// Add a new quote and post it to the "server"
async function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        displayQuote(newQuote);

        // Post new quote to the "server"
        await postQuoteToServer(newQuote);
        populateCategories();
    } else {
        alert("Please enter both a quote and category.");
    }

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
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
        notifyUser(`Quote successfully synced to server: "${data.title}"`);
    } catch (error) {
        console.error("Error posting to server:", error);
        notifyUser("Failed to sync quote with server.");
    }
}

// Periodically fetch and sync quotes from server every 30 seconds
setInterval(syncWithServer, 30000);

// Initialize and load quotes on page load
document.addEventListener('DOMContentLoaded', loadQuotes);
