import { useState, useEffect } from "react"

export function QuoteIndex() {
  const [quotes, setQuotes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15;

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage
  const currentItems = quotes.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    const totalPages = Math.ceil(quotes.length / itemsPerPage);
    console.log('totalPages:', totalPages);

    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <p>Qoute Index</p>
      <ul>
        {currentItems.map(item => (
          <li key={item.source}>
            <p><b>Source:{item.source}</b></p>
            <p>{item.quote}</p>
            <hr />
          </li>
        ))}
      </ul>
      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  )
}