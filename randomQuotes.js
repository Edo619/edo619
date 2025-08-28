const scrollText = document.getElementById('random-quote');

scrollText.addEventListener('animationiteration', () => {
  // Change text on each loop
  fetch("quotes.json")
  .then(response => response.json())
  .then(quotes => {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(`${randomQuote.quote} — ${randomQuote.movie}`);
    scrollText.textContent = randomQuote.quote;
  });
  
});