const scrollText = document.getElementById('random-quote');

scrollText.addEventListener('animationiteration', () => {
  // Change text on each loop
  const quotes = [
    "Made by Edo619 - 2025",
    "Welcome to my page",
    "Random footer message"
  ];
  const randomLine = quotes[Math.floor(Math.random() * quotes.length)];
  scrollText.textContent = randomLine;
  fetch("quotes.json")
  .then(response => response.json())
  .then(quotes => {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    console.log(`${randomQuote.quote} — ${randomQuote.movie}`);
  });
});