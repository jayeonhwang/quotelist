import { useState, useEffect } from "react"

export function QuoteIndex() {
  const [quotes, setQuotes] = useState([])

  const getQuote = async () => {
    try {
      const response = await fetch("https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/quotes.json");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);


  return (
    <div>
      <p>Qoute Index</p>
      {quotes.map(quote => (
        <div key={quote.source}>
          <p><b>Source:{quote.source}</b></p>
          <p>{quote.quote}</p>

        </div>
      ))}
    </div>
  )
}