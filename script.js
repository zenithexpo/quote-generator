const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = []; 

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    loading();
    // Pick a random Quote fromapiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    if (!quote.author){
        authorText.textContent = "Anonymous";
    } else{
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // Set quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        // catch error here
    }

}


// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


// Event listner
newQuoteBtn.addEventListener('click',newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On load
getQuotes();
