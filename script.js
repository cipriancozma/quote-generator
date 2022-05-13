const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

function loadingInProgress() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

function completeLoading() {
    quoteContainer.hidden = false
    loader.hidden = true
}

function newQoute() {
    loadingInProgress()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    if(!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author
    }

    if(quote.text.length > 100) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")

    }

    quoteText.textContent = quote.text
    completeLoading()
}

newQuoteBtn.addEventListener("click", newQoute)

async function getQuotes() {
    loadingInProgress()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQoute();
    } catch(err) {
        console.error(err)
    }
}

getQuotes()
