// Array to hold quotes and categories
const quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    // Add more initial quotes as needed
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Update the DOM with the new quote
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><strong>Category:</strong> ${quote.category}</p>`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
    // Validate input
    if (newQuoteText === "" || newQuoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    // Add the new quote to the array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
    // Clear the input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  
    alert("Quote added successfully!");
  }
  
  // Event listener for 'Show New Quote' button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  