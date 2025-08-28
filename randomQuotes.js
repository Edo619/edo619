const scrollText = document.getElementById('random-quote');

scrollText.addEventListener('animationiteration', () => {
  // Change text on each loop
  fetch("quotes.json")
  .then(response => response.json())
  .then(quotes => {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    scrollText.textContent = randomQuote.quote;
  });
  
});